import React, { useMemo } from 'react'
import BorderGradient from './BorderGradient'
import Multiselect from 'multiselect-react-dropdown';
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
    const selectOptions = useMemo(() => {
        return options.map(item => ({ id: item.value, label: item.label }))
    }, [options])
    return (
        <div>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <BorderGradient focus={true} borderRadius={24} hover={true}>
                        <Multiselect onSelect={onChange} onRemove={onChange} selectedValues={value} options={options} placeholder={placeholder} displayValue='label' />
                    </BorderGradient>
                )}
            />
            {errors?.[name]?.message && <p className='text-red-500 text-sm'>{errors?.[name]?.message}</p>}
        </div>

    )
}

export default React.memo(MultiSelect)