// import React from 'react'

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../services/PostService";
import Creator from "./Creator";
import EditAndDeleteMenu from "./EditAndDeleteMenu";
import { BiComment } from "react-icons/bi";
import { BiUpArrowAlt } from "react-icons/bi";
import ProfileCard from "./ProfileCard";

function DetailPost() {
  const id = useParams().id;
  const [post, setPost] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const hide = true;
  useEffect(() => {
    getPostById(id)
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .finally(() => setLoading(false));
  }, [id]);
  return (
    <>
      {!loading ? (
        <div className="grid grid-cols-4 p-8 justify-between ">
          <div className="justify-center flex mx-8 col-span-3 ">
            <div className="bg-white p-8 flex flex-col gap-4 rounded-md">
              <div className="flex justify-between">
                <Creator
                  avatarURL={post.user.avatarUrl}
                  name={post.user.name}
                  createdAt={post.createdAt.seconds}
                ></Creator>
                <EditAndDeleteMenu></EditAndDeleteMenu>
              </div>
              <h2 className="text-md text-neutral-950 font-semibold">
                {post.title}
              </h2>
              <p className="text-sm text-justify "> {post.content}</p>

              <div className="flex justify-between">
                <div className="flex gap-4">
                  <div className="text-neutral-400 text-xs flex gap-1 items-center">
                    <BiComment size={16} />
                    {post.like}
                  </div>
                  <div className="text-neutral-400 text-xs flex items-center">
                    <BiUpArrowAlt size={20} />
                    {post.like}
                  </div>
                </div>

                {hide && (
                  <button className="text-sm text-white bg-blue-500 px-2 py-1 pr-3 rounded-sm flex">
                    <BiUpArrowAlt size={20} />
                    Upvote
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="justify-center col-span-1">
            <ProfileCard
              imgURL={post.user.avatarUrl}
              user={post.user}
            ></ProfileCard>
          </div>
        </div>
      ) : (
        <>loading...</>
      )}
    </>
  );
}

export default DetailPost;