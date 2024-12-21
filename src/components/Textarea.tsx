import React from 'react'
import BorderGradient from './BorderGradient'

type Props = {
    value?: string;
    onChange?: (value: string) => void,
    disabled?: boolean,
    rows?: number
}
const Textarea: React.FC<Props> = ({ onChange, value = '', disabled, rows = 4 }) => {
    return (
        <BorderGradient focus={true} borderRadius={24} hover={true}>
            <textarea disabled={disabled} rows={rows} onChange={(e) => onChange && onChange(e.target.value)} value={value} className='outline-none w-full rounded-3xl bg-transparent px-4 py-4' />
        </BorderGradient >
    )
}

export default Textarea