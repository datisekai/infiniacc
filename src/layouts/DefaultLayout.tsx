import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const DefaultLayout = () => {
  return (
    <>
      <div className="flex">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="flex-1 min-h-screen flex flex-col">
          <Header />
          <div className="bg-dark flex-1 px-2 md:px-4 pt-4 pb-10 relative z-1">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
