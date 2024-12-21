import { IoIosSend } from "react-icons/io";
import BorderGradient from "../components/BorderGradient";
import DragonBallCard from "../components/Cards/DragonBallCard";
import MaxWidthLayout from "../layouts/MaxWidthLayout";
import { MdLocalPhone } from "react-icons/md";
import { FaFacebookMessenger } from "react-icons/fa6";
import { useEffect } from "react";
import { useCommonStore } from "../stores/commonStore";
import useChangeRoute from "../hooks/useChangeRoute";
import { pathNames } from "../constants/pathname";

const Wall = () => {
    const { setHeaderActions } = useCommonStore()
    const { changeView } = useChangeRoute()

    useEffect(() => {
        setHeaderActions([
            {
                title: "Đăng nick",
                variant: "success",
                onClick: () => changeView(pathNames.createAccount)
            }
        ])
    }, [])
    return (
        <MaxWidthLayout>
            <div className="flex flex-col gap-4 animate-fade-down">
                <BorderGradient active={true} hoverBorderColor="linear-gradient(63.2deg, rgba(0, 0, 0, 0) 6.15%, rgba(102, 99, 41, 0.7) 50.46%, rgb(164, 169, 62) 68.92%, rgba(120, 111, 51, 0.1) 80%)">
                    <div className="px-2 py-4 text-center">
                        <h2 className="text-gradient-secondary text-2xl mb-2">Giới thiệu</h2>
                        <div dangerouslySetInnerHTML={{ __html: "Admin group 123" }}></div>
                        <div className="flex justify-center items-center gap-2"><MdLocalPhone /><span>Số điện thoại: 123</span></div>
                        <div className="flex justify-center items-center gap-2"><IoIosSend /><span>Số Zalo: 123</span></div>
                        <div className="flex justify-center items-center gap-2"> <FaFacebookMessenger /> <span>Link Messenger: 123</span></div>
                    </div>
                </BorderGradient>
                <div className="space-y-2  ">
                    <DragonBallCard active={true} contact={{ phone: "123", zalo: "123", messenger: "123" }} />
                    <DragonBallCard contact={{ phone: "123", zalo: "123", messenger: "123" }} />
                    <DragonBallCard contact={{ phone: "123", zalo: "123", messenger: "123" }} />
                    <DragonBallCard contact={{ phone: "123", zalo: "123", messenger: "123" }} active={true} />
                    <DragonBallCard contact={{ phone: "123", zalo: "123", messenger: "123" }} active={true} />
                    <DragonBallCard contact={{ phone: "123", zalo: "123", messenger: "123" }} />
                    <DragonBallCard contact={{ phone: "123", zalo: "123", messenger: "123" }} />
                    <DragonBallCard contact={{ phone: "123", zalo: "123", messenger: "123" }} />
                    <DragonBallCard contact={{ phone: "123", zalo: "123", messenger: "123" }} active={true} />
                    <DragonBallCard contact={{ phone: "123", zalo: "123", messenger: "123" }} />
                    <DragonBallCard contact={{ phone: "123", zalo: "123", messenger: "123" }} active={true} />
                    <DragonBallCard contact={{ phone: "123", zalo: "123", messenger: "123" }} />
                    <DragonBallCard contact={{ phone: "123", zalo: "123", messenger: "123" }} />
                </div>
            </div>
        </MaxWidthLayout>
    );
};

export default Wall;
