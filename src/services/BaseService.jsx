import { firestore } from "../config/firebase";

export async function getData(query) {
  try {
    const data = await query.get();
    if (data.empty) {
      console.log("No more posts available.");
      return [];
    }
    // data.docs.forEach((e) => {
    //   console.log(e.ref.path);
    // });
    return data.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export function all(collectionName) {
  try {
    const postsRef = firestore.collection(collectionName);
    let query = postsRef.orderBy("createdAt", "desc");
    return query;
  } catch (error) {
    console.error("Something wrong happened", error);
    throw error;
  }
}

// export async function countRecords(collectionQuery) {
//   try {
//     const snapshot = await collectionQuery.count().get()
//     console.log(snapshot)
//     return snapshot.data().count
//   } catch(error) {
//     console.error("Something wrong happened", error)
//   }
// }

export async function paginate(query, currentPage = 1) {
  const pageSize = 6;
  try {
    const postsRef = query.limit(pageSize * currentPage);
    let paginateQuery = postsRef.limit(pageSize);

    currentPage = currentPage < 1 ? 1 : currentPage;

    if (currentPage > 1) {
      const lastVisiblePost = await postsRef
        .limit((currentPage - 1) * pageSize)
        .get();

      if (!lastVisiblePost.empty) {
        paginateQuery = paginateQuery.startAfter(
          lastVisiblePost.docs[lastVisiblePost.docs.length - 1]
        );
      }
    }
    return paginateQuery;
  } catch (error) {
    console.error("Something wrong happened", error);
    throw error;
  }
}

export async function create(insertData, collectionName) {
  try {
    const docRef = await firestore.collection(collectionName).add({
      ...insertData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("Document written with ID: ", docRef.id);

    return {
      success: true,
      postId: docRef.id,
    };
  } catch (error) {
    console.error("Error adding document: ", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function findById(collectionName, documentId) {
  try {
    const documentRef = firestore.collection(collectionName).doc(documentId);
    const documentSnapshot = await documentRef.get();

    if (documentSnapshot.exists) {
      // Document found, return the data
      return documentSnapshot.data();
    } else {
      // Document not found
      console.log(
        `Document with ID ${documentId} not found in collection ${collectionName}.`
      );
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
}
