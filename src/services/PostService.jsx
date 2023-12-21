import { paginate, create, all, getData, findById, update } from "./BaseService";
import { firestore } from "../config/firebase";
import { getNumberOfCommentsByPostId } from "./CommentService";

export async function getPosts(currentPage) {
  let query = all("posts");
  query = await paginate(query, currentPage);
  const data = getData(query);
  return data;
}

export async function getNumberOfPosts() {
  const numberOfPosts = await all("posts")
    .get()
    .then((snap) => {
      return snap.size;
    });

  console.log("Count all post function triggered! Total number of posts: " + numberOfPosts)
  return numberOfPosts;
}

export async function getPostById(id) {
  let data = await findById("posts", id);
  if (data.subjectRef !== undefined) {
    const subjectSnapshot = await data.subjectRef.get();
    const subjectData = subjectSnapshot.data();
    if (subjectData.topicRef !== undefined) {
      const topicSnapshot = await subjectData.topicRef.get();
      const topicData = topicSnapshot.data();
      data = { ...data, topic: topicData.name ? topicData.name : "" };
    }
    data = { ...data, subject: subjectData.name ? subjectData.name : "" };
  }
  if (data.userRef !== undefined) {
    const userSnapshot = await data.userRef.get();
    console.log(data.userRef.id)
    const userData = userSnapshot.data();
    data = { ...data, user: userData };
  }
  const numberOfComment = await getNumberOfCommentsByPostId(id)
  data = { ...data, comment: numberOfComment }
  return data;
}

export async function getPostsByTopicId(topicId) {
  // Get the topic reference
  const topicRef = firestore.doc(`topics/${topicId}`);

  // Create a query to filter posts by topic reference
  const query = await all("posts").where("topicRef", "==", topicRef);

  const data = getData(query);
  return data;
}

export async function getPostsBySubjectId(subjectId) {
  const subjectRef = firestore.doc(`subjects/${subjectId}`);
  const query = await all("posts").where("subjectRef", "==", subjectRef)
  const data = getData(query);
  return data;
}

export async function createPost({ title, content, image, subjectId, topicId, userId }) {
  const subjectRef = firestore.doc(`subjects/${subjectId}`)
  const topicRef = firestore.doc(`topics/${topicId}`)
  const userRef = firestore.doc(`users/${userId}`)
  const postData = {
    title: title,
    content: content, 
    image: image ? image : "A random image url",
    subjectRef: subjectRef,
    topicRef: topicRef,
    userRef: userRef,
    like: Math.floor(Math.random() * 101),
  }
  create("posts", postData);
}

export async function updatePost({ id, title, content, image, subjectId, topicId }) {
  const subjectRef = firestore.doc(`subjects/${subjectId}`)
  const topicRef = firestore.doc(`topics/${topicId}`)
  const postUpdateData = {
    title: title,
    content: content, 
    image: image ? image : "A random image url",
    subjectRef: subjectRef,
    topicRef: topicRef,
  }
  update("posts", id, postUpdateData);
}

export async function getPostsWithInfo(currentPage) {
  const postsData = await getPosts(currentPage);
  return await Promise.all(
    postsData.map(async (post) => {
      let postWithInfo = { ...post };
      if (post.userRef !== undefined) {
        const userSnapshot = await post.userRef.get();
        const userData = userSnapshot.data();
        postWithInfo = { ...postWithInfo, user: userData };
      }
      const numberOfComment = await getNumberOfCommentsByPostId(post.id)
      postWithInfo = {...postWithInfo, comment: numberOfComment}
      return postWithInfo;
    })
  );
}
