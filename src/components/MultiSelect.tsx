import React from 'react'
import BorderGradient from './BorderGradient'
import { MultiSelect as MultiSelectReact } from "react-multi-select-component";
import { Controller } from 'react-hook-form';

type Props = {
    options?: { label: string, value: string }[],
    value?: { label: string, value: string }[],
    onChange?: (value: { label: string, value: string }[]) => void,
    placeholder?: string,
    control?: any
    errors?: any
    name: string
}
const MultiSelect: React.FC<Props> = ({ options = [], control, name, errors, placeholder = "Vui lòng chọn" }) => {
    return (
        <div>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <BorderGradient focus={true} borderRadius={24} hover={true}>
                        <MultiSelectReact
                            disableSearch={true}
                            options={options as any}
                            value={value as any}
                            onChange={onChange}
                            labelledBy={placeholder}

                        />
                    </BorderGradient>
                )}
            />
            {errors?.[name]?.message && <p className='text-red-500 text-sm'>{errors?.[name]?.message}</p>}
        </div>

    )
}

export default MultiSelect