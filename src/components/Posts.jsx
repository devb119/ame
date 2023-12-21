// Posts.js
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { getPostsWithInfo } from "../services/PostService";
import Post from "./Post";
import { Loading } from "../common";
import { useStateValue } from "../context/StateProvider";

const Posts = () => {
  const location = useLocation();
  const navigateTo = useNavigate();
  const [loading, setLoading] = useState(true);
  const [{numberOfPosts}] = useStateValue()


  const colors = [
    "#FCFAEE",
    "#FDFFF0",
    "#F1FCF0",
    "#EDF5F8",
    "#F3F5FF",
    "#F6EEF9",
  ];

  const currentPageParam =
    new URLSearchParams(location.search).get("page") || 1;
  const currentPage = parseInt(currentPageParam);

  const handleChange = (event, pageValue) => {
    navigateTo(`/posts?page=${Number(pageValue)}`);
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [currentPage]);

  async function fetchData() {
    getPostsWithInfo(currentPage)
      .then((data) => {
        data = data.sort((a, b) => {
          if (b.createdAt.seconds !== a.createdAt.seconds)
            return b.createdAt.seconds - a.createdAt.seconds;
          else return b.createdAt.nanoseconds - a.createdAt.nanoseconds;
        });
        setPosts(data);
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      {!loading ? (
        <div className="max-w-6xl mx-auto my-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-6">
            {posts
              ? posts.map((post, index) => (
                  <Post post={post} color={colors[index]} key={post.id} />
                ))
              : "Loading"}
          </div>
          <div className="flex flex-wrap p-4 items-center justify-center md:justify-end">
            <Pagination
              count={parseInt(numberOfPosts/6) + 1}
              color="primary"
              page={currentPage}
              onChange={handleChange}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Posts;
