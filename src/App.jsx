import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "./layout";
import { DetailPost, Topics, Posts, NewPost } from "./components";
import { getNumberOfPosts } from "./services/PostService";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
import { useEffect } from "react";
import { getLikedOrDislikedCommentsByUserId, getLikedPostsByUserId } from "./services/LikeService";

function App() {
  const [, dispatch] = useStateValue()

  const handleInitialContext = async () => {
    const numberOfPosts = await getNumberOfPosts()
    dispatch({
      type: actionType.SET_NUMBER,
      payload: numberOfPosts
    })
    const likedPosts = await getLikedPostsByUserId('7begC0zuZY0c8Qd2GIRm')
    dispatch({
      type: actionType.SET_LIKED_POSTS,
      payload: likedPosts
    })
    const likedOrDislikedComments = await getLikedOrDislikedCommentsByUserId('7begC0zuZY0c8Qd2GIRm')
    dispatch({
      type: actionType.SET_LIKED_OR_DISLIKED_COMMENTS,
      payload: likedOrDislikedComments
    })
  }

  useEffect(() => {
    handleInitialContext();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/topics" element={<Topics />} />
        <Route path="/newpost" element={<NewPost mode ="new"/>} />
        <Route path="/editPost/:id" element={<NewPost mode="edit" />} />

        <Route path="/posts/:id" element={<DetailPost />} />
        <Route path="/posts" element={<Posts />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
