import React from 'react'
import BorderGradient from './BorderGradient'
import { MultiSelect as MultiSelectReact } from "react-multi-select-component";

type Props = {
    options?: { label: string, value: string }[],
    value?: { label: string, value: string }[],
    onChange?: (value: { label: string, value: string }[]) => void,
    placeholder?: string
}
const MultiSelect: React.FC<Props> = ({ onChange, options = [], value = [], placeholder = "Vui lòng chọn" }) => {
    return (
        <BorderGradient focus={true} borderRadius={24} hover={true}>
            <MultiSelectReact
                disableSearch={true}
                options={options as any}
                value={value as any}
                onChange={onChange}
                labelledBy={placeholder}

            />
        </BorderGradient>
    )
}

export default MultiSelect