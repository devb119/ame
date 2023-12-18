/* eslint-disable react/prop-types */
import LikeDislike from "./LikeDislike";

const SubComment = ({ sub, commentUserName }) => {
  return (
    <div className="ml-auto mb-2 w-11/12 py-4 px-8 shadow-lg bg-white border-l-8 border-commendBorder">
      <p className="text-sm text-justify border-b border-gray-200 pb-4 mb-3">
        <span className="font-bold">{commentUserName}: </span>
        {sub.content}
      </p>
      <div className="flex justify-between items-center text-gray-400 text-sm">
        <p>
          by <span className="font-bold">{sub.user.name}</span>
        </p>
        <LikeDislike like={sub.like} dislike={sub.dislike} />
      </div>
    </div>
  );
};

export default SubComment;
