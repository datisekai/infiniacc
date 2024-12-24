import React, { useEffect } from "react";
import BackgroundLoginImg from "../assets/login/bg-login.webp";
import KeyVisual from "../components/KeyVisual";
import BorderGradient from "../components/BorderGradient";
import useChangeRoute from "../hooks/useChangeRoute";
import { pathNames } from "../constants/pathname";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Icon1 from "../assets/login/icon1.webp";
import Icon2 from "../assets/login/icon2.webp";
import { useAuthStore } from "../stores/authStore";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

const Login = () => {
  const { changeView, backPreviousView } = useChangeRoute();
  const { login, token } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);

  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const result = await login({ accessToken: tokenResponse.access_token });
      if (result) {
        toast.success("Đăng nhập thành công");
      } else {
        toast.error("Đăng nhập thất bại");
      }
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
      toast.error("Đăng nhập thất bại");
    },
  });

  useEffect(() => {
    if (token) {
      changeView(pathNames.home);
    }
  }, [token]);

  const handleLogin = () => {
    setIsLoading(true);
    loginGoogle();
  };
  return (
    <div className="bg-dark1 relative">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-10">
          <Spinner />
        </div>
      )}
      <div className="w-full min-h-screen flex items-center justify-center px-4">
        <BorderGradient active={true}>
          <div className="p-8">
            <div className="flex justify-center">
              <KeyVisual />
            </div>
            <div className="text-gradient-primary font-bold text-center text-2xl">
              Chào mừng bạn đến với Infiniacc
            </div>
            <div className="text-center">
              Đăng nhập để trải nghiệm được nhiều tính năng hấp dẫn.
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLogin}
                className="warning-btn w-full"
                disabled={isLoading}
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

      <div className="absolute hidden md:block md:top-[50%] translate-y-[-50%] md:right-[5%] md:w-[200px] ">
        <LazyLoadImage src={Icon1} />
      </div>
    </div>
  );
};

export default Login;
