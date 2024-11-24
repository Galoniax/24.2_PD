import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center mt-[300px] h-screen bg-gray-100">
      <div className="w-[70px] h-[70px] border-4 border-t-[#F7A22F] border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
