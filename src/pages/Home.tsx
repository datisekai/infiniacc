import React from "react";
import HomeCard from "../components/Cards/HomeCard";
import BorderGradient from "../components/BorderGradient";

const Home = () => {
  return (
    <div className=" max-w-[800px] mx-auto">
      <div className="space-y-2  animate-fade-down">
        <HomeCard active={true} />
        <HomeCard />
        <HomeCard />
        <HomeCard active={true} />
        <HomeCard active={true} />
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard active={true} />
        <HomeCard />
        <HomeCard active={true} />
        <HomeCard />
        <HomeCard />
      </div>
    </div>
  );
};

export default Home;
