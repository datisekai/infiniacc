import { useEffect, useState } from "react";
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from "react-icons/hi";
import Drawer from "react-modern-drawer";
import BorderGradient from "../BorderGradient";
import Sidebar from "../Sidebar";
import { useLocation } from "react-router-dom";

const SidebarDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  const handleToggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <BorderGradient onClick={handleToggleDrawer}>
        <div className="p-1">
          {isOpen ? (
            <HiOutlineMenuAlt3 className="text-3xl" />
          ) : (
            <HiOutlineMenuAlt2 className="text-3xl" />
          )}
        </div>
      </BorderGradient>
      <Drawer
        open={isOpen}
        onClose={handleToggleDrawer}
        direction="left"
        className=""
      >
        <div className="h-full">
          <Sidebar />
        </div>
      </Drawer>
    </>
  );
};

export default SidebarDrawer;
