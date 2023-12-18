/* eslint-disable react/prop-types */
// import React from 'react'

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { FaRegCommentAlt, FaArrowUp } from "react-icons/fa";

function Post({ post, color }) {
  const navigate = useNavigate();
  if (!post) return <>No more posts</>;
  return (
    <div
      onClick={() => navigate(`/posts/${post.id}`)}
      className={`flex flex-col relative gap-4 h-[328px] overflow-hidden p-4 cursor-pointer rounded-md shadow-md hover:-translate-y-1 duration-100`}
      style={{ backgroundColor: color }}
    >
      <div className="flex gap-4">
        <img className="w-12 h-12 rounded-full" src={post.user.avatarUrl} />
        <div>
          <strong>{post.user.name}</strong>
          <p className="text-xs font-thin">
            {moment(post.createdAt.toDate()).fromNow()}
          </p>
        </div>
      </div>
      <strong>{post.title}</strong>
      <div>
        {post.content.length > 200
          ? post.content.substring(0, 200) + "..."
          : post.content}
      </div>
      <div className="flex w-1/3 justify-around text-xs font-thin absolute left-2 bottom-2">
        <div className="flex justify-center items-center gap-2">
          <span>{post.comment ? post.comment : 0}</span> <FaRegCommentAlt />
        </div>
        <div className="flex justify-center items-center gap-2">
          <span>{post.like ? post.like : 0}</span> <FaArrowUp />
        </div>
      </div>
    </div>
  );
}

export default Post;
