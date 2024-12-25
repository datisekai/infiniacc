import React from 'react';
import BorderGradient from './BorderGradient';
import { Controller } from 'react-hook-form';

type Props = {
    readOnly?: boolean;
    type?: 'text' | 'number' | 'password';
    control?: any
    errors?: any
    name: string
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = ({ readOnly, type = 'text', control, errors, name }) => {
    return (
        <div>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <BorderGradient focus={true} borderRadius={24} hover={true}>
                        <input
                            type={type}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            ref={ref}
                            readOnly={readOnly}
                            className="outline-none w-full rounded-3xl bg-transparent px-4 py-2"
                        />
                    </BorderGradient>
                )}
            />
            {errors?.[name]?.message && <p className='text-red-500 text-sm'>{errors?.[name]?.message}</p>}
        </div>

    );
};

export default Input;
