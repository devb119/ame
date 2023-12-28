/* eslint-disable react/prop-types */
import LikeDislike from "./LikeDislike";
import Creator from "./Creator";

const SubComment = ({ sub, commentUserName }) => {
  return (
    <div className="ml-auto mb-2 w-11/12 py-4 px-8 shadow-lg bg-white border-l-8 border-commendBorder">
      <div className="mb-2">
        <Creator
          openUserDialog={true}
          avatarUrl={sub.user.avatarUrl}
          name={sub.user.name}
          createdAt={sub.createdAt}
          userId={sub.user.id}
        />
      </div>
      <p className="text-sm text-justify border-b border-gray-200 pb-4 mb-3">
        {/* <span className="font-bold">Replying {commentUserName}: </span> */}
        {sub.content.trim()}
      </p>
      <div className="flex justify-between items-center text-gray-400 text-sm">
        <p>
          replying <span className="font-bold">{commentUserName}</span>
        </p>
        <LikeDislike like={sub.like} dislike={sub.dislike} />
      </div>
    </div>
  );
};

export default SubComment;
