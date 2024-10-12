import React from "react";

export const Banner: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center items-center bg-white md:h-40 h-16 w-full px-2">
        <img
          src="/home/diwali.png"
          alt="Banner Image"
          className="h-full object-cover"
        />
      </div>
    </div>
  );
};
