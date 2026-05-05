import { text } from "@fortawesome/fontawesome-svg-core";
import { Label, TextInput } from "flowbite-react";

const InputBase = ({ label, value, handleChange, name, type, error }) => {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={name} value={label} />
      <TextInput
        onChange={handleChange}
        name={name}
        value={value}
        type={type ? type : text}
        sizing="md"
      />
      {}
    </div>
  );
};

export default InputBase;
