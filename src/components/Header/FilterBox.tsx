import { useState } from "react";
import { MdFilterAlt } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Drawer from "react-modern-drawer";
import { useSearchParams } from "react-router-dom";
import NamekIcon from "../../assets/planet/namek.webp";
import TraiDatIcon from "../../assets/planet/trai-dat.webp";
import XaydaIcon from "../../assets/planet/xayda.webp";
import {
  bongtais,
  detus,
  mocquays,
  servers,
  skhs,
} from "../../pages/Account/const";
import { useCommonStore } from "../../stores/commonStore";
import { getPriceRangeValue, parsePriceRange } from "../../utils";
import BorderGradient from "../BorderGradient";
import Checkbox from "../Checkbox";
import Dropdown from "../Dropdown";
import Select from "../Select";
import { priceRanges } from "./const";

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
  const { query, setQuery } = useCommonStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleToggleDrawerFilter = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  const handleToggle = (value: string, name: string) => {
    let newQuery = { ...query };
    if (newQuery?.[name]?.includes(value)) {
      newQuery = {
        ...newQuery,
        [name]: newQuery[name].filter((i: string) => i !== value),
      };
    } else {
      newQuery = {
        ...newQuery,
        [name]: [...(newQuery?.[name] || []), value],
      };
    }
    setQuery(newQuery);
    setSearchParams(newQuery);
  };

  const handleChangePrice = (e: any) => {
    const value = e.target.value;
    const payload: any = { ...query, ...parsePriceRange(value) };
    setQuery(payload);
    setSearchParams(payload);
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
        <div className="h-full bg-dark1 py-4 ">
          <div className="flex items-center px-4 justify-between pb-4 border-b border-divide">
            <div className="text-lg text-gradient-primary">Bộ lọc tìm kiếm</div>
            <button
              className="underline text-sm hover:text-primary transition-all"
              onClick={() => {
                setQuery({});
                setSearchParams({});
              }}
            >
              Xoá tất cả
            </button>
          </div>
          <div className="mt-4 max-h-[calc(100vh-61px)] pb-40 overflow-y-auto">
            <div className="space-y-4 px-4">
              <Dropdown title="Khoảng giá">
                <div className="mt-4 space-y-2">
                  <Select
                    name="price-range"
                    onChange={handleChangePrice}
                    options={priceRanges}
                    value={getPriceRangeValue(
                      +(searchParams?.get("priceFrom") || 0),
                      +(searchParams.get("priceTo") || 0)
                    )}
                    placeholder="Chọn khoảng giá"
                  />
                </div>
              </Dropdown>
              <Dropdown title="Hành tinh">
                <div className="mt-4 space-y-2">
                  {planes.map((item, index) => {
                    return (
                      <div
                        key={item.value}
                        className="flex items-center gap-4 hover:cursor-pointer hover:text-primary "
                        onClick={() => handleToggle(item.value, "hanh_tinh")}
                      >
                        <Checkbox
                          checked={query?.hanh_tinh?.includes(item.value)}
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
              <Dropdown title="Server">
                <div className="mt-4 space-y-2">
                  {servers.map((item, index) => {
                    return (
                      <div
                        key={item.value}
                        className="flex items-center gap-4 hover:cursor-pointer hover:text-primary "
                        onClick={() => handleToggle(item.value, "server")}
                      >
                        <Checkbox
                          checked={query?.server?.includes(item.value)}
                        />
                        <div className="items-center flex gap-1">
                          {item.icon && (
                            <LazyLoadImage
                              src={item.icon}
                              effect="blur"
                              className="w-7"
                            />
                          )}
                          <span>{item.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Dropdown>
              <Dropdown title="Set kích hoạt">
                <div className="mt-4 space-y-2">
                  {skhs
                    .filter((item) => item.value)
                    .map((item, index) => {
                      return (
                        <div
                          key={item.value}
                          className="flex items-center gap-4 hover:cursor-pointer hover:text-primary "
                          onClick={() =>
                            handleToggle(item.value, "set_kich_hoat")
                          }
                        >
                          <Checkbox
                            checked={query?.set_kich_hoat?.includes(item.value)}
                          />
                          <div className="items-center flex gap-1">
                            {item.icon && (
                              <LazyLoadImage
                                src={item.icon}
                                effect="blur"
                                className="w-7"
                              />
                            )}
                            <span>{item.label}</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Dropdown>
              <Dropdown title="Đệ tử">
                <div className="mt-4 space-y-2">
                  {detus.map((item, index) => {
                    return (
                      <div
                        key={item.value}
                        className="flex items-center gap-4 hover:cursor-pointer hover:text-primary "
                        onClick={() => handleToggle(item.value, "de_tu")}
                      >
                        <Checkbox
                          checked={query?.de_tu?.includes(item.value)}
                        />
                        <div className="items-center flex gap-1">
                          {item.icon && (
                            <LazyLoadImage
                              src={item.icon}
                              effect="blur"
                              className="w-7"
                            />
                          )}
                          <span>{item.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Dropdown>
              <Dropdown title="Bông tai">
                <div className="mt-4 space-y-2">
                  {bongtais.map((item, index) => {
                    return (
                      <div
                        key={item.value}
                        className="flex items-center gap-4 hover:cursor-pointer hover:text-primary "
                        onClick={() => handleToggle(item.value, "bong_tai")}
                      >
                        <Checkbox
                          checked={query?.bong_tai?.includes(item.value)}
                        />
                        <div className="items-center flex gap-1">
                          {item.icon && (
                            <LazyLoadImage
                              src={item.icon}
                              effect="blur"
                              className="w-7"
                            />
                          )}
                          <span>{item.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Dropdown>
              <Dropdown title="Mốc quay thượng đế">
                <div className="mt-4 space-y-2">
                  {mocquays.map((item, index) => {
                    return (
                      <div
                        key={item.value}
                        className="flex items-center gap-4 hover:cursor-pointer hover:text-primary "
                        onClick={() => handleToggle(item.value, "moc_quay")}
                      >
                        <Checkbox
                          checked={query?.moc_quay?.includes(item.value)}
                        />
                        <div className="items-center flex gap-1">
                          {item.icon && (
                            <LazyLoadImage
                              src={item.icon}
                              effect="blur"
                              className="w-7"
                            />
                          )}
                          <span>{item.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default FilterBox;
