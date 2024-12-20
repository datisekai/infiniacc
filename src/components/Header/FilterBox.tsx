import { useState } from "react";
import { MdFilterAlt } from "react-icons/md";
import Drawer from "react-modern-drawer";
import BorderGradient from "../BorderGradient";
import Checkbox from "../Checkbox";
import Dropdown from "../Dropdown";
import XaydaIcon from "../../assets/planet/xayda.webp";
import TraiDatIcon from "../../assets/planet/trai-dat.webp";
import NamekIcon from "../../assets/planet/namek.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";

const planes = [
  {
    value: "xayda",
    label: "Xayda",
    icon: XaydaIcon,
  },
  {
    value: "trai-dat",
    label: "Trái đất",
    icon: TraiDatIcon,
  },
  {
    value: "namek",
    label: "Namek",
    icon: NamekIcon,
  },
];

const FilterBox = () => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [filter, setFilter] = useState<any>({ planet: [] });

  const handleToggleDrawerFilter = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  const handleToggle = (value: string) => {
    if (filter.planet?.includes(value)) {
      setFilter({
        ...filter,
        planet: filter.planet.filter((i: string) => i !== value),
      });
    } else {
      setFilter({
        ...filter,
        planet: [...filter.planet, value],
      });
    }
  };

  return (
    <div>
      <BorderGradient onClick={handleToggleDrawerFilter} hover={true}>
        <div className="flex items-center gap-1 px-4 py-2">
          <span>Lọc nick</span>
          <MdFilterAlt className="text-xl" />
        </div>
      </BorderGradient>
      <Drawer
        open={isOpenFilter}
        onClose={handleToggleDrawerFilter}
        direction="right"
      >
        <div className="h-full bg-dark1 py-4 px-4">
          <div className="flex items-center justify-between pb-4 border-b border-divide">
            <div className="text-lg text-gradient-primary">Bộ lọc tìm kiếm</div>
            <button className="underline text-sm hover:text-primary transition-all">
              Xoá tất cả
            </button>
          </div>
          <div className="mt-4">
            <Dropdown title="Hành tinh">
              <div className="mt-4 space-y-2">
                {planes.map((item, index) => {
                  return (
                    <div
                      key={item.value}
                      className="flex items-center gap-4 hover:cursor-pointer hover:text-primary "
                      onClick={() => handleToggle(item.value)}
                    >
                      <Checkbox
                        checked={filter?.planet?.includes(item.value)}
                      />
                      <div className="items-center flex gap-1">
                        <LazyLoadImage
                          src={item.icon}
                          effect="blur"
                          className="w-7"
                        />
                        <span>{item.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Dropdown>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default FilterBox;
