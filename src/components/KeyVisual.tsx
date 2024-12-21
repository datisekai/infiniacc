import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const KeyVisual = () => {
  return (
    <div className="w-[100px] md:w-[150px]">
      <LazyLoadImage effect="blur" src="/logo.webp"></LazyLoadImage>
    </div>
  );
};

export default React.memo(KeyVisual);
