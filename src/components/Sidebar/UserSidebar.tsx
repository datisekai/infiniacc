import React from "react";
import BorderGradient from "../BorderGradient";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getImageServer, getRandomAvatar } from "../../utils";
import { IoLogOut } from "react-icons/io5";
import Coin from "../Coin";
import useChangeRoute from "../../hooks/useChangeRoute";
import { pathNames } from "../../constants/pathname";
import { useAuthStore } from "../../stores/authStore";
import { GiGoldShell } from "react-icons/gi";

const UserSidebar = () => {
  const { changeView } = useChangeRoute();
  const { user } = useAuthStore();

  const { logout } = useAuthStore();
  const handleLogout = () => {
    logout();
    changeView(pathNames.login);
  };
  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BorderGradient
            borderColor="linear-gradient(63.2deg, rgba(0, 0, 0, 0) 6.15%, rgba(102, 99, 41, 0.7) 50.46%, rgb(164, 169, 62) 68.92%, rgba(120, 111, 51, 0.1) 80%)"
            borderRadius={50}
          >
            <div className="p-1">
              <LazyLoadImage
                src={
                  user.avatar
                    ? getImageServer(user.avatar)
                    : getRandomAvatar(user.name)
                }
                className="w-10 rounded-full"
              />
            </div>
          </BorderGradient>
          <div className="text-gradient-secondary inline">{user?.name}</div>
        </div>
        <BorderGradient
          onClick={handleLogout}
          hover={true}
          borderColor="#7d3e3e"
        >
          <div className="p-1">
            <IoLogOut className="text-red-500 text-2xl" />
          </div>
        </BorderGradient>
      </div>

      <div className="mt-4 space-y-2">
        <BorderGradient borderColor="linear-gradient(63.2deg, rgba(0, 0, 0, 0) 6.15%, rgba(102, 99, 41, 0.7) 50.46%, rgb(164, 169, 62) 68.92%, rgba(120, 111, 51, 0.1) 80%)">
          <div className="flex items-center gap-2 px-4 py-2">
            <Coin className="w-6" />
            <div>0 VND</div>
          </div>
        </BorderGradient>
        <BorderGradient borderColor="linear-gradient(63.2deg, rgba(0, 0, 0, 0) 6.15%, rgba(102, 99, 41, 0.7) 50.46%, rgb(164, 169, 62) 68.92%, rgba(120, 111, 51, 0.1) 80%)">
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="w-6">
              <GiGoldShell className="text-xl" />
            </div>
            <div>0 lượt đăng</div>
          </div>
        </BorderGradient>
      </div>
    </div>
  );
};

export default UserSidebar;
