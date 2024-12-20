import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

type Props = {
  open?: boolean;
  title?: React.ReactNode;
  children: React.ReactNode;
};
const Dropdown: React.FC<Props> = ({ open = false, title = "", children }) => {
  const [isOpen, setIsOpen] = useState(open);
  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="hover:text-primary hover:cursor-pointer flex items-center justify-between"
      >
        <div className="font-bold uppercase">{title}</div>
        <div>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</div>
      </div>
      {isOpen && <div className="animate-flip-down">{children}</div>}
    </div>
  );
};

export default React.memo(Dropdown);
