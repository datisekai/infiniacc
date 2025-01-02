import { IoIosSend } from "react-icons/io";
import BorderGradient from "../components/BorderGradient";
import DragonBallCard from "../components/Cards/DragonBallCard";
import MaxWidthLayout from "../layouts/MaxWidthLayout";
import { MdLocalPhone } from "react-icons/md";
import { FaFacebookMessenger } from "react-icons/fa6";
import { useEffect, useMemo } from "react";
import { useCommonStore } from "../stores/commonStore";
import useChangeRoute from "../hooks/useChangeRoute";
import { pathNames } from "../constants/pathname";
import { useAuthStore } from "../stores/authStore";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { apiConfig, sendServerRequest } from "../apis";
import Spinner from "../components/Spinner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getImageServer, translateQuery } from "../utils";
import toast from "react-hot-toast";

const Wall = () => {
  const { query } = useCommonStore();
  const { user } = useAuthStore();
  const { changeView } = useChangeRoute();
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["post-me", user?.id, query],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      sendServerRequest({
        ...apiConfig.getPost,
        body: {
          page: pageParam,
          limit: 10,
          userId: user.id,
          ...translateQuery(query),
        },
      }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.page * lastPage.limit < lastPage.total)
        return lastPage.page + 1;
    },
  });

  const { mutate } = useMutation({
    mutationFn: (id: string) => {
      return sendServerRequest({
        ...apiConfig.deletePost,
        endpoint: apiConfig.deletePost.endpoint.replace(":id", id || ""),
      });
    },
    onSuccess(id, variables) {
      toast.success("Xoá bài đăng thành công.");
      queryClient.setQueryData(["posts", query], (oldData: any) => {
        if (!oldData) return oldData;

        const newPages = oldData.pages.map((page: any) => ({
          ...page,
          data: page.data.filter((item: any) => item.id != variables),
        }));

        return { ...oldData, pages: newPages };
      });
    },
    onError(error) {
      console.log(error);
      toast.error("Có lỗi xảy ra, hãy thử lại sau.");
    },
  });

  const posts = useMemo(() => {
    return data?.pages?.reduce((pre, cur) => {
      return [...pre, ...cur?.data];
    }, []);
  }, [data]);
  return (
    <MaxWidthLayout>
      <div className="flex flex-col gap-4 animate-fade-down">
        <BorderGradient
          active={true}
          hoverBorderColor="linear-gradient(63.2deg, rgba(0, 0, 0, 0) 6.15%, rgba(102, 99, 41, 0.7) 50.46%, rgb(164, 169, 62) 68.92%, rgba(120, 111, 51, 0.1) 80%)"
        >
          <div className="flex items-center gap-4 justify-center">
            <div>
              <LazyLoadImage
                src={getImageServer(user.avatar)}
                className="rounded-full"
              />
            </div>
            <div className="px-2 py-4 text-center">
              <h2 className="text-gradient-secondary text-2xl mb-2">
                Giới thiệu
              </h2>
              <div
                className="text-gradient-primary"
                dangerouslySetInnerHTML={{ __html: user?.note || "---" }}
              ></div>
              <div className="flex justify-center items-center gap-2">
                <MdLocalPhone />
                <span>
                  Điện thoại:{" "}
                  <span className="text-gradient-primary">
                    {user?.contact?.phone || "---"}
                  </span>
                </span>
              </div>
              <div className="flex justify-center items-center gap-2">
                <IoIosSend />
                <span>
                  Số Zalo:{" "}
                  <span className="text-gradient-primary">
                    {user?.contact?.zalo || "---"}
                  </span>
                </span>
              </div>
              <div className="flex justify-center items-center gap-2">
                {" "}
                <FaFacebookMessenger />{" "}
                <span>
                  Link Messenger:{" "}
                  <span className="text-gradient-primary">
                    {user?.contact?.messenger ? (
                      <a href={user?.contact?.messenger} target="_blank">
                        Nhắn tin
                      </a>
                    ) : (
                      "---"
                    )}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </BorderGradient>
        <InfiniteScroll
          dataLength={posts?.length || 0} //This is important field to render the next data
          next={() => {
            console.log("call");
            fetchNextPage();
          }}
          hasMore={hasNextPage}
          loader={
            <div className="flex items-center justify-center mt-4">
              <Spinner />
            </div>
          }
          scrollableTarget="scrollableDiv"
          className="space-y-4"
        >
          {posts?.map((item: any) => (
            <DragonBallCard
              key={item.id}
              {...item}
              active={true}
              contact={item?.user?.contact}
              handleDelete={(id) => mutate(id)}
            />
          ))}
          {posts?.length == 0 && (
            <div className="flex flex-col justify-center items-center gap-2">
              {" "}
              <p className="text-center mt-10 text-lg">
                Chưa có bài viết nào.{" "}
              </p>
              <button
                className="warning-btn"
                onClick={() => changeView(pathNames.createAccount)}
              >
                Đăng nick ngay
              </button>
            </div>
          )}
        </InfiniteScroll>
      </div>
    </MaxWidthLayout>
  );
};

export default Wall;
