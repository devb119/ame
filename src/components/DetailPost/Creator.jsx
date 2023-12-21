// import React from "react";

// eslint-disable-next-line react/prop-types

import moment from "moment";

function Creator({ avatarURL, name, createdAt }) {
  return (
    <div className="flex flex-row gap-4">
      <img src={avatarURL} className="rounded-full w-8 h-8"></img>
      <div>
        <p className="font-semibold text-sm">{name}</p>
        <p className="text-[10px] font-medium text-neutral-500">
          {moment(createdAt.toDate()).fromNow()}
        </p>
      </div>
    </div>
  );
}

export default Creator;
