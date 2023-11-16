import React from "react";
import "../../loader.styles.css";
import loadingGif from "../../assets/loading.gif";
const Loader = () => {
  return (
    <div className="text-loader font-monoton flex flex-col gap-1 items-center">
      <span>
        <img
          width={100}
          src={loadingGif}
          alt="loading..."
          className="opacity-[0.25]"
        />
      </span>
      <div className="text-container">
        <span className="letter">P</span>
        <span className="letter">A</span>
        <span className="letter">R</span>
        <span className="letter">T</span>
        <span className="letter">Y</span>
        {/* <span className="letter">M</span>
        <span className="letter">E</span> */}
      </div>
    </div>
  );
};

export default Loader;
