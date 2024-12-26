import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { apiConfig, sendServerRequest } from "../apis";
import BorderGradient from "../components/BorderGradient";
import DragonBallCard from "../components/Cards/DragonBallCard";
import MaxWidthLayout from "../layouts/MaxWidthLayout";
import Spinner from "../components/Spinner";
import { useCommonStore } from "../stores/commonStore";
import { translateQuery } from "../utils";

const Home = () => {
  const { query } = useCommonStore();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["posts", query],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      sendServerRequest({
        ...apiConfig.getPost,
        body: {
          page: pageParam,
          limit: 10,
          ...translateQuery(query),
        },
      }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.page * lastPage.limit < lastPage.total)
        return lastPage.page + 1;
    },
  });

  const posts = useMemo(() => {
    return data?.pages?.reduce((pre, cur) => {
      return [...pre, ...cur?.data];
    }, []);
  }, [data]);
  return (
    <MaxWidthLayout>
      <div className="space-y-2  animate-fade-down">
        <BorderGradient
          active={true}
          hoverBorderColor="linear-gradient(63.2deg, rgba(0, 0, 0, 0) 6.15%, rgba(102, 99, 41, 0.7) 50.46%, rgb(164, 169, 62) 68.92%, rgba(120, 111, 51, 0.1) 80%)"
        >
          <div className="px-4 py-4 text-center">
            <h2 className="text-gradient-secondary text-2xl mb-2">
              Chào mừng bạn đến với{" "}
              <span className="text-gradient-primary">Infiniacc</span>
            </h2>
            <p>Đây là nơi trao đổi & tìm kiếm nick dễ dàng</p>
            <p className="text-gray-400 text-sm">
              Phát triển bởi{" "}
              <a
                href="https://www.facebook.com/datlt.dev/"
                target="_blank"
                className="italic underline"
              >
                Datisekai
              </a>{" "}
              &{" "}
              <a
                href="https://www.facebook.com/profile.php?id=100011379491596"
                target="_blank"
                className="italic underline"
              >
                Duc Anh Nguyen
              </a>
            </p>
          </div>
        </BorderGradient>
        <InfiniteScroll
          dataLength={posts?.length || 0} //This is important field to render the next data
          next={fetchNextPage}
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
            />
          ))}
          {posts?.length == 0 && (
            <p className="text-center mt-10 text-lg">Chưa có bài viết nào.</p>
          )}
        </InfiniteScroll>
      </div>
    </MaxWidthLayout>
  );
};

export default Home;
