// import React from "react";

// eslint-disable-next-line react/prop-types
function Creator({ avatarURL, name, createdAt }) {
  return (
    <div className="flex flex-row gap-4">
      <img src={avatarURL} className="rounded-full w-8 h-8"></img>
      <div>
        <p className="font-semibold text-sm text-neutral-400">{name}</p>
        <p className="text-[10px] font-medium text-neutral-500">{createdAt}</p>
      </div>
    </div>
  );
}

export default Creator;
