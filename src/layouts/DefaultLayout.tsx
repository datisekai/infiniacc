import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useCommonStore } from "../stores/commonStore";
import HeaderBack from "../components/HeaderBack";

const DefaultLayout = () => {
  const { header } = useCommonStore()
  return (
    <>
      <div className="flex">
        <div className="hidden md:block fixed left-0 w-[250px] top-0 bottom-0 z-10">
          <Sidebar />
        </div>

        <div className="flex-1 min-h-screen flex flex-col">
          {header.headerBack ? <HeaderBack /> : <Header />}
          <div className="bg-dark flex-1 px-2 md:px-4 pt-4 pb-20 relative z-1 md:ml-[250px]" style={{ marginTop: header.headerBack ? 54 : 74 }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
