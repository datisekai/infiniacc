import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import KeyVisual from '../KeyVisual'
import { sidebarConfig } from '../../constants'
import BorderGradient from '../BorderGradient'


const Sidebar = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    return (
        <div className="bg-dark1 w-[250px] h-full shadow-lg py-4">
            <div className="flex justify-center pb-4 border-b border-divide">
                <Link to="/" className='animate-fade animate-once'> <KeyVisual /></Link>
            </div>
            <div className="mt-8 space-y-2 px-4">
                {sidebarConfig?.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <BorderGradient key={index} onClick={() => navigate(item.to)} hover={true} active={item.to === pathname}>
                            <div className="flex items-center px-4 gap-2 py-2">
                                <div className="flex items-center">
                                    <Icon className="text-primary w-10" />
                                </div>
                                <div>
                                    {item.label}
                                </div>
                            </div>
                        </BorderGradient>
                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar