import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "./layout";
import { DetailPost, Topics, Posts, NewPost } from "./components";
import { getNumberOfPosts } from "./services/PostService";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
import { useEffect } from "react";

function App() {
  const [, dispatch] = useStateValue()

  const handleSetNumberOfPosts = async () => {
    const numberOfPosts = await getNumberOfPosts()
    dispatch({
      type: actionType.SET_NUMBER,
      payload: numberOfPosts
    })
  }

  useEffect(() => {
    handleSetNumberOfPosts();
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
