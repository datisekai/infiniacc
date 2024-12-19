import React from 'react'
import BorderGradient from './BorderGradient'
import { FaCheck } from "react-icons/fa6";

type Props = {
    checked?: boolean
    onChange?: (checked?: boolean) => void
}
const Checkbox: React.FC<Props> = ({ checked, onChange }) => {
    return (
        <BorderGradient active={checked} onClick={() => onChange && onChange(!checked)} hover={true} borderRadius={8}>
            <div className='p-1 size-6 flex items-center justify-center'>
                {checked && <FaCheck className='text-lg animate-jump animate-once' />}
            </div>
        </BorderGradient >
    )
}

export default Checkbox