import React, { useEffect } from "react";
import { useCommonStore } from "../stores/commonStore";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  formatCash,
  getImageServer,
  getRandomAvatar,
  time_ago,
} from "../utils";
import Menu from "../components/Menu";
import useChangeRoute from "../hooks/useChangeRoute";
import { pathNames } from "../constants/pathname";
import { BsThreeDots } from "react-icons/bs";
import GridImage from "../components/GridImage";
import { IoIosSend } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import { FaFacebookMessenger } from "react-icons/fa6";
import { exampleImages } from "../constants";
import MaxWidthLayout from "../layouts/MaxWidthLayout";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiConfig, sendServerRequest } from "../apis";
import { get } from "react-hook-form";
import {
  translateBongTai,
  translateDeTu,
  translateMocQuay,
} from "../components/Cards/const";

const example: any = {
  active: false,
  meta: {
    server: "3",
    hanh_tinh: "Xayda",
    set_kich_hoat: "Songoku",
    de_tu: "Mabu",
    bong_tai: "Cấp 1",
    moc_quay: "10k",
  },
  note: "Liên hệ ngay bằng cách ấn các nút bên dưới",
  price: 0,
  contact: { phone: "123", zalo: "123", messenger: "123" },
  images: exampleImages,
};
const DetailPost = () => {
  const { header, setHeaderBack, setPost } = useCommonStore();
  useEffect(() => {
    setHeaderBack(true);
  }, []);

  const { id } = useParams();

  const { data = { user: {} } } = useQuery({
    queryKey: ["post", id],
    queryFn: () =>
      sendServerRequest({
        ...apiConfig.getDetailPost,
        endpoint: apiConfig.getDetailPost.endpoint.replace(":id", id || ""),
      }),
  });

  const {
    active,
    meta,
    user: { contact, avatar, name },
    note,
    price,
    images,
    createdAt,
    user,
  } = data;

  useEffect(() => {
    if (data) {
      setPost(data);
    }
  }, [data?.id]);

  const { changeView } = useChangeRoute();
  return (
    <MaxWidthLayout>
      <div className="pt-2 overflow-hidden ">
        <div className="flex items-center gap-2">
          <LazyLoadImage
            effect="blur"
            src={avatar ? getImageServer(avatar) : getRandomAvatar(name)}
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
              <Menu
                button={
                  <div className="p-1 flex items-center">
                    <BsThreeDots />
                  </div>
                }
                options={[
                  {
                    label: "Báo cáo",
                    onClick: () => {},
                  },
                  {
                    label: "Chỉnh sửa",
                    onClick: () => {
                      changeView(
                        pathNames.editAccount.replace(":id", id || "")
                      );
                    },
                  },
                  {
                    label: "Xoá",
                    onClick: () => {},
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div className=" text-sm mt-2">
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
            <span className="uppercase text-gradient-secondary font-semibold">
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
        <div className="mt-2 ">
          {images?.map((item: string, index: number) => {
            return (
              <div key={index}>
                <LazyLoadImage
                  src={getImageServer(item)}
                  key={index}
                  effect="blur"
                />
                <div className="flex border-t border-divide items-center  overflow-hidden">
                  {contact?.zalo && (
                    <div
                      onClick={() => {
                        window.open(
                          `https://zalo.me/${contact?.zalo}`,
                          "_blank"
                        );
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
            );
          })}
        </div>
      </div>
    </MaxWidthLayout>
  );
};

export default DetailPost;
