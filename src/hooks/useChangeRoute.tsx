import React from "react";
import { useNavigate } from "react-router-dom";
import { pathNames } from "../constants/pathname";
import { useCommonStore } from "../stores/commonStore";

const useChangeRoute = () => {
  const navigate = useNavigate();
  const { setQuery } = useCommonStore();

  const changeView = (path: string) => {
    if (path.includes("http://") || path.includes("https://")) {
      return window.open(path, "_blank");
    }

    setQuery({});

    return navigate(path);
  };

  const backPreviousView = () => {
    if (window.history.length > 1) {
      return navigate(-1);
    }
    return navigate(pathNames.home);
  };

  return {
    changeView,
    backPreviousView,
  };
};

export default useChangeRoute;
