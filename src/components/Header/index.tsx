import { pathNames } from "../../constants/pathname";
import useChangeRoute from "../../hooks/useChangeRoute";
import FilterBox from "./FilterBox";
import SidebarDrawer from "./SidebarDrawer";

const Header = () => {
  const { changeView } = useChangeRoute();
  return (
    <div className="bg-dark1 z-10 w-full sticky top-0 left-[200px] right-0 py-4 px-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="md:hidden">
            <SidebarDrawer />
          </div>
          <button
            onClick={() => changeView(pathNames.login)}
            className="warning-btn md:min-w-[150px] text-lg"
          >
            Đăng nhập
          </button>
        </div>

        <FilterBox />
      </div>
    </div>
  );
};

export default Header;
