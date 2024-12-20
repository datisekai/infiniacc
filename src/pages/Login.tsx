import React from "react";
import BackgroundLoginImg from "../assets/login/bg-login.webp";
import KeyVisual from "../components/KeyVisual";
import BorderGradient from "../components/BorderGradient";
import useChangeRoute from "../hooks/useChangeRoute";
import { pathNames } from "../constants/pathname";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Icon1 from "../assets/login/icon1.webp";
import Icon2 from "../assets/login/icon2.webp";

const Login = () => {
  const { changeView, backPreviousView } = useChangeRoute();
  return (
    <div className="bg-dark1">
      <div className="w-full min-h-screen flex items-center justify-center px-4">
        <BorderGradient active={true}>
          <div className="p-8">
            <div className="flex justify-center">
              <KeyVisual />
            </div>
            <div className="font-bold text-center text-2xl">
              Chào mừng bạn đến với Infiniacc
            </div>
            <div className="text-center">
              Đăng nhập để trải nghiệm được nhiều tính năng hấp dẫn.
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => changeView(pathNames.home)}
                className="warning-btn w-full"
              >
                Đăng nhập với Google
              </button>
            </div>
          </div>
        </BorderGradient>
      </div>
      <div className="absolute top-5 left-5">
        <BorderGradient hover={true} onClick={backPreviousView}>
          <div className="flex items-center gap-2 px-4 py-2">
            <span>Trở lại</span>
            <IoChevronBackCircleOutline className="text-primary text-lg" />
          </div>
        </BorderGradient>
      </div>
      <div className="absolute top-[15%] w-[130px] md:top-[50%] translate-y-[-50%] md:left-[10%] md:w-[250px] left-[50%] translate-x-[-50%]">
        <LazyLoadImage src={Icon2} />
      </div>
      <div className="md:hidden absolute bottom-[10%] w-[100px] left-[50%] translate-x-[-50%]">
        <LazyLoadImage src={Icon1} />
      </div>
      <div className="absolute hidden md:block md:top-[50%] translate-y-[-50%] md:right-[5%] md:w-[200px] ">
        <LazyLoadImage src={Icon1} />
      </div>
    </div>
  );
};

export default Login;
