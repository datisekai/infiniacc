import React from 'react'
import { Menu as MenuReact, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';
import BorderGradient from './BorderGradient';


type Props = {
    button?: React.ReactNode,
    options?: { label: string, onClick: () => void }[]
}
const Menu: React.FC<Props> = ({ button, options }) => {
    return (
        <MenuReact menuButton={<MenuButton>{button}</MenuButton>} transition>
            {options?.map((option, index) => <MenuItem key={index} onClick={option.onClick}>{option.label}</MenuItem>)}
        </MenuReact>
    )
}

export default Menu