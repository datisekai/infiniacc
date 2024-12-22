declare module "react-fb-image-video-grid" {
  import React from "react";

  interface ImageGridProps {
    children?: React.ReactNode;
    showModal?: boolean;
  }

  export const ImageGrid: React.FC<ImageGridProps>;
}
