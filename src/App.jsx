import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "./layout";
import { DetailPost, Topics, Posts } from "./components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/topics" element={<Topics />} />
        <Route path="/posts/:id" element={<DetailPost />} />
        <Route path="/posts" element={<Posts />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
