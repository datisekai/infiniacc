import React from 'react'
import BorderGradient from './BorderGradient'

type Props = {
    value?: string;
    onChange?: (value: string) => void,
    disabled?: boolean,
    type?: 'text' | 'number' | 'password'
}
const Input: React.FC<Props> = ({ onChange, value = '', disabled, type = 'text' }) => {
    return (
        <BorderGradient focus={true} borderRadius={24} hover={true}>
            <input type={type} disabled={disabled} onChange={(e) => onChange && onChange(e.target.value)} value={value} className='outline-none w-full rounded-3xl bg-transparent px-4 py-2' />
        </BorderGradient >
    )
}

export default Input