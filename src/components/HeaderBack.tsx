import { IoChevronBack } from "react-icons/io5";
import useChangeRoute from "../hooks/useChangeRoute";

const HeaderBack = () => {
    const { backPreviousView } = useChangeRoute();
    return (
        <div className="bg-dark1 z-10  fixed top-0 md:left-[250px] left-0 right-0 py-4 px-4">
            <div onClick={backPreviousView} className="absolute left-4 hover:cursor-pointer">
                <IoChevronBack className="text-xl" />
            </div>
            <div className="text-center">Bài viết của Datisekai</div>
        </div>
    );
};

export default HeaderBack;
