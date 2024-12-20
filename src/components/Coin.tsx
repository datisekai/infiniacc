import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CoinIcon from "../assets/coin.webp";

type Props = {
  className?: string;
};
const Coin: React.FC<Props> = ({ className = "" }) => {
  return (
    <LazyLoadImage src={CoinIcon} className={`rounded-full ${className}`} />
  );
};

export default Coin;
