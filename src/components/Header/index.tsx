import { useState } from 'react';
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from "react-icons/hi";
import Drawer from 'react-modern-drawer';
import BorderGradient from '../BorderGradient';
import Sidebar from '../Sidebar';
import FilterBox from './FilterBox';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);


    const handleToggleDrawer = () => {
        setIsOpen(!isOpen);
    };



    return (
        <div className="bg-dark1 w-full sticky top-0 left-[200px] right-0 py-4 px-4">
            <div className='flex items-center justify-between'>
                <div className="flex gap-2 items-center">
                    <div className='md:hidden'>
                        <BorderGradient active={true} onClick={handleToggleDrawer}>
                            <div className='p-1'>
                                {isOpen ? <HiOutlineMenuAlt3 className='text-3xl' /> : <HiOutlineMenuAlt2 className='text-3xl' />}
                            </div>
                        </BorderGradient>
                    </div>
                    <button className="success-btn min-w-[150px] text-lg">Đăng nhập</button>


                </div>


                <FilterBox />
            </div>
            <Drawer
                open={isOpen}
                onClose={handleToggleDrawer}
                direction='left'
                className=''
            >
                <div className='h-full'>
                    <Sidebar />
                </div>
            </Drawer>


        </div>

    )
}

export default Header