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
import { translateBongTai, translateDeTu, translateMocQuay } from "./const";
import { useMutation } from "@tanstack/react-query";
import { apiConfig, sendServerRequest } from "../../apis";
import useConfirm from "../../hooks/useConfirm";
import toast from "react-hot-toast";

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
  handleDelete?: (id: string) => void;
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
  handleDelete,
}) => {
  const { changeView } = useChangeRoute();
  const { confirm } = useConfirm();

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
            changeView(pathNames.editAccount.replace(":id", id || ""));
          },
        },
        {
          label: "Xoá",
          onClick: () => {
            confirm({
              onAccept() {
                console.log("called");
                return handleDelete && handleDelete(id || "");
              },
            });
          },
        },
      ];
    }
    return [
      // {
      //   label: "Báo cáo",
      //   onClick: () => { },
      // },
    ];
  }, [user, currentUser, handleDelete]);
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
              <div>{user?.username || user?.name}</div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                {/* <span>Bài viết ưu tiên</span> */}
                {/* <div className="px-1">|</div> */}
                <span>{time_ago(createdAt)}</span>
              </div>
            </div>
            <div>
              {options && options.length > 0 && (
                <Menu
                  button={
                    <div className="p-1 flex items-center">
                      <BsThreeDots />
                    </div>
                  }
                  options={options}
                />
              )}
            </div>
          </div>
        </div>
        <div className="px-4 text-sm mt-2" onClick={handleGoDetail}>
          <div>
            Giá:{" "}
            <span className="uppercase text-gradient-secondary font-semibold">
              {formatCash(price)}
            </span>
          </div>
          <div>
            Server:{" "}
            <span className="uppercase text-gradient-secondary font-semibold">
              {meta?.server || "--"}
            </span>
          </div>
          <div>
            Hành tinh:{" "}
            <span className="uppercase text-gradient-secondary font-bold">
              {meta?.hanh_tinh || "--"}
            </span>
          </div>
          <div>
            Sét kích hoạt:{" "}
            <span className="uppercase text-gradient-secondary font-semibold">
              {meta?.set_kich_hoat || "--"}
            </span>
          </div>
          <div>
            Đệ tử:{" "}
            <span className="uppercase text-gradient-secondary font-semibold">
              {translateDeTu(meta?.de_tu)}
            </span>
          </div>
          <div>
            Bông tai:{" "}
            <span className="uppercase text-gradient-secondary font-semibold">
              {translateBongTai(meta?.bong_tai)}
            </span>
          </div>
          <div>
            Mốc quay thượng đế:{" "}
            <span className="uppercase text-gradient-secondary font-semibold">
              {translateMocQuay(meta?.moc_quay)}
            </span>
          </div>
          {note && (
            <div dangerouslySetInnerHTML={{ __html: note || "--" }}></div>
          )}
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
