import React from "react";
import BorderGradient from "./BorderGradient";
import { Controller } from "react-hook-form";

type Props = {
  options?: { label: string; value: string }[];
  value?: string;
  onChange?: (e: any) => void;
  placeholder?: string;
  control?: any;
  errors?: any;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
const Select: React.FC<Props> = ({
  options,
  placeholder = "Vui lòng chọn",
  errors,
  control,
  name,
  value,
  onChange,
}) => {
  return (
    <>
      {control ? (
        <div>
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <BorderGradient focus={true} borderRadius={24} hover={true}>
                <div className=" px-4 ">
                  <select
                    value={value}
                    onChange={onChange}
                    className="outline-none w-full rounded-3xl bg-transparent py-2"
                  >
                    <option value={""}>{placeholder}</option>
                    {options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </BorderGradient>
            )}
          />
          {errors?.[name]?.message && (
            <p className="text-red-500 text-sm">{errors?.[name]?.message}</p>
          )}
        </div>
      ) : (
        <BorderGradient focus={true} borderRadius={24} hover={true}>
          <div className=" px-4 ">
            <select
              value={value}
              onChange={onChange}
              className="outline-none w-full rounded-3xl bg-transparent py-2"
            >
              <option value={""}>{placeholder}</option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </BorderGradient>
      )}
    </>
  );
};

export default Select;
