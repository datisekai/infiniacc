import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getRandomAvatar } from "../../utils";
import BorderGradient from "../BorderGradient";
import { SiZalo } from "react-icons/si";
import { MdLocalPhone } from "react-icons/md";
import { MdReport } from "react-icons/md";
import { IoIosSend } from "react-icons/io";

type Props = {
  active?: boolean;
};
const HomeCard: React.FC<Props> = ({ active = false }) => {
  return (
    <BorderGradient active={active} borderWidth={2}>
      <div className="pt-2 overflow-hidden ">
        <div className="flex items-center px-2">
          <LazyLoadImage
            effect="blur"
            src={getRandomAvatar("")}
            className="w-14 rounded-full"
          />
          <div>
            <div>Những câu chuyện sau first date</div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Datisekai</span>
              <div className="px-2">|</div>
              <span>5 phút</span>
            </div>
          </div>
        </div>
        <div className="px-2 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
          quibusdam labore soluta optio ullam nesciunt repellendus, quis libero
          ipsum. Perspiciatis voluptatibus fugit mollitia cupiditate temporibus
          reprehenderit aliquid quas, labore ut.
        </div>
        <div className="mt-2 ">
          <LazyLoadImage
            className="rounded block w-full h-full object-cover"
            effect="blur"
            src="https://www.chromethemer.com/google-backgrounds/dragon-ball/download/dragon-ball-google-chrome-background-0024.jpg"
          />
        </div>
        <div className="flex border-t border-divide items-center  overflow-hidden">
          <div className="flex-1 flex items-center hover:opacity-70 transition-all  justify-center gap-1 text-sm text-center hover:cursor-pointer py-2">
            <IoIosSend />
            <span>Zalo</span>
          </div>
          <div className=" flex-1 flex items-center hover:opacity-70 transition-all  justify-center gap-1 text-sm text-center hover:cursor-pointer py-2">
            <MdLocalPhone />
            <span>Điện thoại</span>
          </div>
          <div className="flex-1 flex items-center hover:opacity-70 transition-all justify-center gap-1 text-sm text-center hover:cursor-pointer py-2">
            <MdReport />
            <span>Báo cáo</span>
          </div>
        </div>
      </div>
    </BorderGradient>
  );
};

export default HomeCard;
