import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-300 border-y-transparent flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-3 border-gray-300 border-y-transparent  flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-y-transparent  flex items-center justify-center"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
