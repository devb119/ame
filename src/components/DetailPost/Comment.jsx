/* eslint-disable react/prop-types */
import { useState } from "react";
import Creator from "./Creator";
import { FiChevronsUp, FiChevronsDown } from "react-icons/fi";
import LikeDislike from "./LikeDislike";
import SubComment from "./SubComment";
import CommentForm from "./CommentForm";

const Comment = ({ comment, postingComment, setPostingComment }) => {
  const [hideReplies, setHideReplies] = useState(true);
  const [newReply, setNewReply] = useState(false);

  const handleToggleReplies = () => setHideReplies(!hideReplies);
  const handleToggleReplyForm = () => setNewReply(!newReply);
  return (
    <div className="mb-6">
      <div className="w-full bg-white py-4 px-8 shadow-lg mb-2 border-l-4 border-add">
        <div className="mb-4">
          <Creator
            avatarURL={comment.user.avatarUrl}
            name={comment.user.name}
            createdAt={comment.createdAt}
          />
        </div>
        <p className="text-sm text-justify border-b border-gray-200 pb-4 mb-3">
          {comment.content.trim()}
        </p>
        <div className="flex justify-between items-center">
          <LikeDislike like={comment.like} dislike={comment.dislike} />
          <div className="flex gap-4 text-sm text-blue-500">
            {comment.subComments.length > 0 ? (
              <div
                className="flex gap-1 items-center cursor-pointer"
                onClick={handleToggleReplies}
              >
                {hideReplies ? (
                  <>
                    <span className="text-lg">
                      <FiChevronsDown />
                    </span>
                    <p>Hiện câu trả lời ({comment.subComments.length})</p>{" "}
                  </>
                ) : (
                  <>
                    <span className="text-lg">
                      <FiChevronsUp />
                    </span>
                    <p>Ẩn câu trả lời ({comment.subComments.length})</p>
                  </>
                )}
              </div>
            ) : null}

            <p className="cursor-pointer" onClick={handleToggleReplyForm}>
              Trả lời
            </p>
          </div>
        </div>
      </div>
      {newReply ? (
        <div className="ml-auto mb-2 w-11/12">
          <CommentForm
            commentId={comment.id}
            postId={comment.postRef.id}
            postingComment={postingComment}
            setPostingComment={setPostingComment}
          />
        </div>
      ) : null}
      {hideReplies
        ? null
        : comment.subComments.map((sub) => (
            <SubComment
              sub={sub}
              key={sub.id}
              commentUserName={comment.user.name}
            />
          ))}
    </div>
  );
};

export default Comment;
