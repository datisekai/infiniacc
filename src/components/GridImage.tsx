import React, { useMemo } from "react";
import { ImageGrid } from "react-fb-image-video-grid";
import { LazyLoadImage } from "react-lazy-load-image-component";

type Props = {
    images?: string[]
    showModal?: boolean
}
const GridImage: React.FC<Props> = ({ images = [], showModal = false }) => {

    const count = useMemo(() => {
        return images.length;
    }, [images.length])
    const pic = (c: any) => {
        return (
            <img
                style={{ objectFit: "cover" }}
                src={c}
                alt={c}
                key={Math.random()}
            />
        );
    };

    return (
        <>
            {count >= 2 ? (
                <ImageGrid showModal={showModal}>
                    {images
                        .filter((arg, i) => (i + 1 <= count ? true : false))
                        .map((a, i) => pic(a))}
                </ImageGrid>
            ) : (
                <ImageGrid>{pic(images[0])}</ImageGrid>
            )}
        </>
    );
};

export default React.memo(GridImage);
