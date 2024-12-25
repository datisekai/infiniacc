import React from 'react'
import BorderGradient from './BorderGradient'
import { Controller } from 'react-hook-form';

type Props = {
    readOnly?: boolean;
    control?: any
    errors?: any
    name: string
    rows?: number
} & React.InputHTMLAttributes<HTMLInputElement>;
const Textarea: React.FC<Props> = ({ name, rows = 4, readOnly, control, errors }) => {
    return (
        <div>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <BorderGradient focus={true} borderRadius={24} hover={true}>
                        <textarea onBlur={onBlur} ref={ref} readOnly={readOnly} rows={rows} onChange={(e) => onChange && onChange(e.target.value)} value={value} className='outline-none w-full rounded-3xl bg-transparent px-4 py-4' />
                    </BorderGradient >
                )}
            />
            {errors?.[name]?.message && <p className='text-red-500 text-sm'>{errors?.[name]?.message}</p>}
        </div>

    )
}

export default Textarea