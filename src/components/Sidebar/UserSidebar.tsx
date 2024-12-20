import React from "react";
import BorderGradient from "../BorderGradient";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getRandomAvatar } from "../../utils";
import { IoLogOut } from "react-icons/io5";
import Coin from "../Coin";
import useChangeRoute from "../../hooks/useChangeRoute";
import { pathNames } from "../../constants/pathname";

const UserSidebar = () => {
  const { changeView } = useChangeRoute();
  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BorderGradient
            borderColor="linear-gradient(63.2deg, rgba(0, 0, 0, 0) 6.15%, rgba(102, 99, 41, 0.7) 50.46%, rgb(164, 169, 62) 68.92%, rgba(120, 111, 51, 0.1) 80%)"
            borderRadius={50}
          >
            <LazyLoadImage
              src={getRandomAvatar("Infiniacc")}
              className="w-14"
            />
          </BorderGradient>
          <div className="text-gradient-secondary inline">Infiniacc</div>
        </div>
        <BorderGradient
          onClick={() => changeView(pathNames.login)}
          hover={true}
          borderColor="#7d3e3e"
        >
          <div className="p-1">
            <IoLogOut className="text-red-500 text-2xl" />
          </div>
        </BorderGradient>
      </div>

      <div className="mt-4">
        <BorderGradient borderColor="linear-gradient(63.2deg, rgba(0, 0, 0, 0) 6.15%, rgba(102, 99, 41, 0.7) 50.46%, rgb(164, 169, 62) 68.92%, rgba(120, 111, 51, 0.1) 80%)">
          <div className="flex items-center gap-2 px-4 py-2">
            <Coin className="w-6" />
            <div>85,000 VND</div>
          </div>
        </BorderGradient>
      </div>
    </div>
  );
};

export default UserSidebar;
