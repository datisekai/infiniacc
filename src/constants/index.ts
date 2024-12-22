import { pathNames } from "./pathname";
import { GoHome } from "react-icons/go";
import { PiHandDepositFill } from "react-icons/pi";
import { FaUserSecret } from "react-icons/fa";
import { MdOutlinePriceCheck } from "react-icons/md";
import { AiFillGold } from "react-icons/ai";
import { GiTargetDummy } from "react-icons/gi";

export const BASE_URL = "";

export const sidebarConfig = [
  {
    label: "Trang chủ",
    icon: GoHome,
    to: pathNames.home,
  },
  {
    label: "Nick của tôi",
    icon: GiTargetDummy,
    to: pathNames.wall,
  },
  {
    label: "Tài khoản",
    icon: FaUserSecret,
    to: pathNames.profile,
  },
  {
    label: "Nạp tiền",
    icon: PiHandDepositFill,
    to: pathNames.deposit,
  },
  {
    label: "Bảng giá",
    icon: MdOutlinePriceCheck,
    to: pathNames.pricing,
  },
  {
    label: "Mua vàng",
    icon: AiFillGold,
    to: "https://www.shopbanvang.com/",
  },
];

export const exampleImages = [
  "/logo.webp",
  "/logo.webp",
  "/logo.webp",
  "/logo.webp",
  "/logo.webp",
  "/logo.webp",
  "/logo.webp",
];
