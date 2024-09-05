import { ChangeEvent } from "react"

interface Input {
  label: string
  type?: string
  placeholder: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void // have to give e a type like this `e: ChangeEvent<HTMLInputElement>` - or TS will complain
}

const InputBox = ({ label, type, placeholder, onChange }: Input) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="capitalize font-semibold ml-2" htmlFor={label}>{label}</label>
      <input
        type={type ? type : "text"}
        placeholder={placeholder}
        id={label}
        name={label}
        className="input input-bordered input-accent w-72"
        onChange={onChange}
      />
    </div>
  )
}

export default InputBox
