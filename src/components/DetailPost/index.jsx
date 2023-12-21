// import React from 'react'

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../services/PostService";
import { getCommentsByPostId } from "../../services/CommentService";
import Creator from "./Creator";
import EditAndDeleteMenu from "../EditAndDeleteMenu";
import { BiComment } from "react-icons/bi";
import { BiUpArrowAlt } from "react-icons/bi";
import ProfileCard from "./ProfileCard";
import { Loading } from "../../common";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import SortDropdown from "./SortDropdown";
import { useStateValue } from "./../../context/StateProvider";

function DetailPost() {
  const id = useParams().id;
  const [post, setPost] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [postingComment, setPostingComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [sortType, setSortType] = useState("time");

  const hide = true;
  useEffect(() => {
    getPostById(id)
      .then((data) => {
        console.log(data)
        setPost(data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    setLoadingComments(true);
    getCommentsByPostId(id)
      .then((data) => setComments(data))
      .finally(() => setLoadingComments(false));
  }, [id, postingComment]);


  const [{userId}, _] = useStateValue();

  const sort = (type) => {
    setSortType(type);
    type === "time"
      ? setComments(
          comments.sort((a, b) => {
            if (b.createdAt.seconds !== a.createdAt.seconds)
              return b.createdAt.seconds - a.createdAt.seconds;
            else return b.createdAt.nanoseconds - a.createdAt.nanoseconds;
          })
        )
      : setComments(comments.sort((a, b) => b.like - a.like));
  };

  console.log( post)
  return (
    <>
      {!loading ? (
        <>
          <div className="grid grid-cols-4 p-8 justify-between ">
            <div className="justify-center flex mx-8 col-span-3 ">
              <div className="bg-white p-8 flex flex-col gap-4 rounded-md w-full justify-between shadow-md">
                <div>
                  <div className="flex justify-between">
                    <Creator
                      avatarURL={post.user.avatarUrl}
                      name={post.user.name}
                      createdAt={post.createdAt}
                    />
                    {userId === post.userRef.id && <EditAndDeleteMenu userId={post.user.id} postId={id} />}
                  </div>
                  <h2 className="text-md text-neutral-950 font-semibold">
                    {post.title}
                  </h2>
                  <p className="text-sm text-justify "> {post.content}</p>
                </div>

                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <div className="text-neutral-400 text-xs flex gap-1 items-center">
                      <BiComment size={16} />
                      {post.comment ? post.comment : 0}
                    </div>
                    <div className="text-neutral-400 text-xs flex items-center">
                      <BiUpArrowAlt size={20} />
                      {post.like ? post.like : 0}
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
              <ProfileCard imgURL={post.user.avatarUrl} user={post.user} />
            </div>

            {/**************************************** COMMENT SECTION ****************************************/}
            <div className="m-8 rounded-md col-span-3">
              <div className="flex mb-8">
                <div className="w-5/12 h-full">
                  <span className="pt-8 mr-4">Sắp xếp theo</span>
                  <SortDropdown sortType={sortType} changeSort={sort} />
                </div>
                <p className="font-bold text-xl text-gray-500 text-center">
                  Bình luận
                </p>
              </div>
              <CommentForm
                postId={id}
                postingComment={postingComment}
                setPostingComment={setPostingComment}
              />
              {loadingComments ? (
                <Loading />
              ) : (
                comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    postingComment={postingComment}
                    setPostingComment={setPostingComment}
                  />
                ))
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
}

export default DetailPost;
