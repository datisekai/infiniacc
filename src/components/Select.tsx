import React from 'react'
import BorderGradient from './BorderGradient'

type Props = {
    options?: { label: string, value: string }[],
    value?: string,
    onChange?: (value: string) => void,
    placeholder?: string
}
const Select: React.FC<Props> = ({ onChange, options, value, placeholder = "Vui lòng chọn" }) => {
    return (
        <BorderGradient focus={true} borderRadius={24} hover={true}>
            <div className=' px-4 '>
                <select value={value} onChange={(e) => onChange && onChange(e.target.value)} className='outline-none w-full rounded-3xl bg-transparent py-2'>
                    <option value={""}>{placeholder}</option>
                    {options?.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
        </BorderGradient>
    )
}

export default Select