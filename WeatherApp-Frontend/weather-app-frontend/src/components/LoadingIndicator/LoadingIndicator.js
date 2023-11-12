import React from "react";
import { ImSpinner } from "react-icons/im";

const LoadingIndicator = () => {
  return (
    <div className="min-h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex-col justify-center items-center">
      <div className="flex justify-center items-center h-500">
        <ImSpinner className="text-5xl animate-spin text-white" />
      </div>
    </div>
  );
};

export default LoadingIndicator;
