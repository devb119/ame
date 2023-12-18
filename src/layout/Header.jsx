// Header.js
import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { OrangeButton } from "../common";

const Header = () => {
  return (
    <div className="flex justify-between px-4 py-2 h-[10vh] shadow-lg items-center relative z-10">
      <Link to="/">
        <img src="/logo.png" alt="Logo" className="mb-2 md:mb-0" />
      </Link>
      <div className="flex gap-4">
        <OrangeButton icon={<IoAddCircleOutline />} title={"Thêm bài viết"} />
        <img
          src="avatar.jpeg"
          alt="Avatar"
          className="rounded-full w-10 md:w-14 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
