import React, { useMemo } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  formatCash,
  getImageServer,
  getRandomAvatar,
  time_ago,
} from "../../utils";
import BorderGradient from "../BorderGradient";
import Menu from "../Menu";
import useChangeRoute from "../../hooks/useChangeRoute";
import { pathNames } from "../../constants/pathname";
import GridImage from "../GridImage";
import { useAuthStore } from "../../stores/authStore";

type Props = {
  active?: boolean;
  price?: number;
  note?: string;
  meta?: any;
  // hanh_tinh?: string;
  // set_kich_hoat?: string;
  // de_tu?: string; //mabu, broly, normal
  // bong_tai?: string; //level_1, level_2, level_3
  // moc_quay?: string; //0k_5k, 5k_10k, 10k
  contact?: any;
  images?: string[];
  user?: any;
  id?: string;
  createdAt?: string;
};
const HomeCard: React.FC<Props> = ({
  active = false,
  meta = {},
  note = "Liên hệ ngay bằng cách ấn các nút bên dưới",
  price = 0,
  contact = {},
  images,
  user,
  id,
  createdAt,
}) => {
  const { changeView } = useChangeRoute();

  const { user: currentUser } = useAuthStore();

  const handleGoDetail = () => {
    changeView(pathNames.detailPost.replace(":id", id || ""));
  };

  const options = useMemo(() => {
    if (user.id === currentUser.id) {
      return [
        {
          label: "Chỉnh sửa",
          onClick: () => {
            changeView(pathNames.editAccount);
          },
        },
        {
          label: "Xoá",
          onClick: () => {},
        },
      ];
    }
    return [
      {
        label: "Báo cáo",
        onClick: () => {},
      },
    ];
  }, [user, currentUser]);
  return (
    <BorderGradient active={active} borderWidth={2}>
      <div className="pt-2 overflow-hidden ">
        <div className="flex items-center px-2 gap-2">
          <LazyLoadImage
            effect="blur"
            src={
              user?.avatar
                ? getImageServer(user?.avatar)
                : getRandomAvatar(user?.name)
            }
            className="w-14 rounded-full"
          />
          <div className="flex items-center justify-between w-full">
            <div>
              <div>Thành Đạt</div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                {/* <span>Bài viết ưu tiên</span> */}
                {/* <div className="px-1">|</div> */}
                <span>{time_ago(createdAt)}</span>
              </div>
            </div>
            <div>
              <Menu
                button={
                  <div className="p-1 flex items-center">
                    <BsThreeDots />
                  </div>
                }
                options={options}
              />
            </div>
          </div>
        </div>
        <div className="px-4 text-sm mt-2" onClick={handleGoDetail}>
          <div>Giá: {formatCash(price)}</div>
          <div>Server: {meta?.server || "--"}</div>
          <div>Hành tinh: {meta?.hanh_tinh || "--"}</div>
          <div>Sét kích hoạt: {meta?.set_kich_hoat || "--"}</div>
          <div>Đệ tử: {meta?.de_tu || "--"}</div>
          <div>Bông tai: {meta?.bong_tai || "--"}</div>
          <div>Mốc quay thượng đế: {meta?.moc_quay || "--"}</div>
          <div dangerouslySetInnerHTML={{ __html: note || "--" }}></div>
        </div>
        <div className="mt-2 " onClick={handleGoDetail}>
          <GridImage images={images || []} />
        </div>
        <div className="flex border-t border-divide items-center  overflow-hidden">
          {contact?.zalo && (
            <div
              onClick={() => {
                window.open(`https://zalo.me/${contact?.zalo}`, "_blank");
              }}
              className="flex-1 flex items-center hover:opacity-70 transition-all  justify-center gap-1 text-sm text-center hover:cursor-pointer py-2"
            >
              <IoIosSend />
              <span>Zalo</span>
            </div>
          )}
          {contact?.phone && (
            <div
              onClick={() => {
                window.open(`tel:${contact?.phone}`, "_blank");
              }}
              className=" flex-1 flex items-center hover:opacity-70 transition-all  justify-center gap-1 text-sm text-center hover:cursor-pointer py-2"
            >
              <MdLocalPhone />
              <span>Điện thoại</span>
            </div>
          )}
          {contact?.messenger && (
            <div
              onClick={() => {
                window.open(contact.messenger, "_blank");
              }}
              className=" flex-1 flex items-center hover:opacity-70 transition-all  justify-center gap-1 text-sm text-center hover:cursor-pointer py-2"
            >
              <FaFacebookMessenger />
              <span>Messenger</span>
            </div>
          )}
        </div>
      </div>
    </BorderGradient>
  );
};

export default HomeCard;
