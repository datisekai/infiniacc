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
  const { header, setHeaderBack } = useCommonStore();
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
  } = data;

  const { changeView } = useChangeRoute();
  return (
    <MaxWidthLayout>
      <div className="pt-2 overflow-hidden ">
        <div className="flex items-center">
          <LazyLoadImage
            effect="blur"
            src={avatar ? getImageServer(avatar) : getRandomAvatar(name)}
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
                options={[
                  {
                    label: "Báo cáo",
                    onClick: () => {},
                  },
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
                ]}
              />
            </div>
          </div>
        </div>
        <div className=" text-sm mt-2">
          <div>Giá: {formatCash(price)}</div>
          <div>Server: {meta?.server || ""}</div>
          <div>Hành tinh: {meta?.hanh_tinh || ""}</div>
          <div>Sét kích hoạt: {meta?.set_kich_hoat || ""}</div>
          <div>Đệ tử: {meta?.de_tu || ""}</div>
          <div>Bông tai: {meta?.bong_tai || ""}</div>
          <div>Mốc quay thượng đế: {meta?.moc_quay || ""}</div>
          <div dangerouslySetInnerHTML={{ __html: note || "" }}></div>
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
                    <div className="flex-1 flex items-center hover:opacity-70 transition-all  justify-center gap-1 text-sm text-center hover:cursor-pointer py-2">
                      <IoIosSend />
                      <span>Zalo</span>
                    </div>
                  )}
                  {contact?.phone && (
                    <div className=" flex-1 flex items-center hover:opacity-70 transition-all  justify-center gap-1 text-sm text-center hover:cursor-pointer py-2">
                      <MdLocalPhone />
                      <span>Điện thoại</span>
                    </div>
                  )}
                  {contact?.messenger && (
                    <div className=" flex-1 flex items-center hover:opacity-70 transition-all  justify-center gap-1 text-sm text-center hover:cursor-pointer py-2">
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
