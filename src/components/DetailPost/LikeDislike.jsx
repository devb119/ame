import { BiLike, BiDislike } from "react-icons/bi";

// eslint-disable-next-line react/prop-types
const LikeDislike = ({ like, dislike }) => {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-1 items-center text-gray-400">
        <span className="cursor-pointer text-lg">
          <BiLike />
        </span>
        <p className="text-sm">{like}</p>
      </div>
      <div className="flex gap-1 items-center text-gray-400">
        <span className="cursor-pointer text-lg">
          <BiDislike />
        </span>
        <p className="text-sm">{dislike}</p>
      </div>
    </div>
  );
};

export default LikeDislike;
