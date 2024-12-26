import { pathNames } from "../../constants/pathname";
import useChangeRoute from "../../hooks/useChangeRoute";
import { useAuthStore } from "../../stores/authStore";
import { useCommonStore } from "../../stores/commonStore";
import FilterBox from "./FilterBox";
import SidebarDrawer from "./SidebarDrawer";

const Header = () => {
  const { changeView } = useChangeRoute();
  const { header } = useCommonStore();
  const { token } = useAuthStore();
  return (
    <div className="bg-dark1 z-10  fixed top-0 md:left-[250px] left-0 right-0 py-4 px-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="md:hidden">
            <SidebarDrawer />
          </div>
          {!token && (
            <button
              onClick={() => changeView(pathNames.login)}
              className="warning-btn md:min-w-[150px] text-lg"
            >
              Đăng nhập
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <FilterBox />
          {/* {token && header?.actions?.map((item, index) => {
            return <button key={index} onClick={item.onClick} className={`${item.variant}-btn`}>{item.title}</button>
          })} */}
          {token && (
            <button
              onClick={() => changeView(pathNames.createAccount)}
              className="success-btn"
            >
              Đăng nick
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
