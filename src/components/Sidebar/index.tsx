import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import KeyVisual from "../KeyVisual";
import { sidebarConfig } from "../../constants";
import BorderGradient from "../BorderGradient";
import UserSidebar from "./UserSidebar";
import useChangeRoute from "../../hooks/useChangeRoute";
import { pathNames } from "../../constants/pathname";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { changeView } = useChangeRoute();
  return (
    <div className="bg-dark1 w-[250px] h-full shadow-lg py-4">
      <div className="flex justify-center pb-4 border-b border-divide">
        <div
          onClick={() => changeView(pathNames.home)}
          className="animate-fade animate-once hover:cursor-pointer hover:scale-105 transition-all"
        >
          {" "}
          <KeyVisual />
        </div>
      </div>
      <div className="py-4 border-b border-divide">
        <UserSidebar />
      </div>
      <div className="mt-8 space-y-2 px-4">
        {sidebarConfig?.map((item, index) => {
          const Icon = item.icon;
          return (
            <BorderGradient
              key={index}
              onClick={() => changeView(item.to)}
              hover={true}
              active={item.to === pathname}
            >
              <div className="flex items-center px-4 gap-2 py-2">
                <div className="flex items-center">
                  <Icon className="text-primary w-10" />
                </div>
                <div>{item.label}</div>
              </div>
            </BorderGradient>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
