import { ChangeEvent } from "react";

interface Input {
  label: string;
  placeholder?: string;
  type?: "email" | "password";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const InputBox = ({ label, placeholder, type, onChange }: Input) => {
  return (
    <>
      <label
        htmlFor={label}
        className="leading-7 text-sm text-gray-600 capitalize"
      >
        {label}
      </label>
      <input
        onChange={onChange}
        type={type ? type : "text"}
        id={label}
        name={label}
        placeholder={placeholder}
        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
    </>
  );
};

export default InputBox;
