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
import { useInfiniteQuery } from "@tanstack/react-query";
import { apiConfig, sendServerRequest } from "../apis";
import Spinner from "../components/Spinner";

const Wall = () => {
    const { setHeaderActions } = useCommonStore()
    const { changeView } = useChangeRoute()
    const { user } = useAuthStore()

    useEffect(() => {
        setHeaderActions([
            {
                title: "Đăng nick",
                variant: "success",
                onClick: () => changeView(pathNames.createAccount)
            }
        ])
    }, [])

    const {
        data,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['post-me', user?.id],
        initialPageParam: 1,
        queryFn: ({ pageParam = 1 }) => sendServerRequest({
            ...apiConfig.getPost, body: {
                page: pageParam,
                limit: 10,
                userId: user.id
            }
        }),
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.page * lastPage.limit < lastPage.total) return lastPage.page + 1
        },
    })

    const posts = useMemo(() => {
        return data?.pages?.reduce((pre, cur) => {
            return [...pre, ...cur?.data]
        }, [])
    }, [data])
    return (
        <MaxWidthLayout>
            <div className="flex flex-col gap-4 animate-fade-down">
                <BorderGradient active={true} hoverBorderColor="linear-gradient(63.2deg, rgba(0, 0, 0, 0) 6.15%, rgba(102, 99, 41, 0.7) 50.46%, rgb(164, 169, 62) 68.92%, rgba(120, 111, 51, 0.1) 80%)">
                    <div className="px-2 py-4 text-center">
                        <h2 className="text-gradient-secondary text-2xl mb-2">Giới thiệu</h2>
                        <div dangerouslySetInnerHTML={{ __html: "Admin group 123" }}></div>
                        <div className="flex justify-center items-center gap-2"><MdLocalPhone /><span>Số điện thoại: {user?.contact?.phone || "---"}</span></div>
                        <div className="flex justify-center items-center gap-2"><IoIosSend /><span>Số Zalo: {user?.contact?.zalo || '---'}</span></div>
                        <div className="flex justify-center items-center gap-2"> <FaFacebookMessenger /> <span>Link Messenger: {user?.contact?.messenger ? <a href={user?.contact?.messenger} target="_blank">Nhắn tin</a> : '---'}</span></div>
                    </div>
                </BorderGradient>
                <InfiniteScroll
                    dataLength={posts?.length || 0} //This is important field to render the next data
                    next={() => {
                        console.log('call');
                        fetchNextPage()
                    }}
                    hasMore={hasNextPage}
                    loader={<div className="flex items-center justify-center mt-4"><Spinner /></div>}
                    scrollableTarget="scrollableDiv"
                    className="space-y-4"
                >
                    {posts?.map((item: any) => <DragonBallCard key={item.id} {...item} active={true} contact={item?.user?.contact} />)}
                </InfiniteScroll>

            </div>
        </MaxWidthLayout>
    );
};

export default Wall;
