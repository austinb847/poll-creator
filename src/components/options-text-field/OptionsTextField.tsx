import TextField from "../text-field/TextField";
import { useState, useCallback } from "react";

interface OptionsTextFieldProps {
  label?: string;
  placeholder: string;
  onPlusButtonClick: (item: string) => void;
}

function OptionsTextField(props: OptionsTextFieldProps) {
  const { label, placeholder, onPlusButtonClick } = props;
  const [value, setValue] = useState<string>("");

  const handleTextFieldChange = (value: string) => {
    setValue(value);
  };

  const handlePlusButtonClick = useCallback(() => {
    if (value.trim() === "") return;
    onPlusButtonClick(value);
    setValue("");
  }, [onPlusButtonClick, value, setValue]);

  return (
    <div className="flex items-end gap-2">
      <div className="flex-1">
        <TextField label={label} placeholder={placeholder} onChange={handleTextFieldChange} value={value} />
      </div>
      <button
        type="button"
        className="flex items-center justify-center w-9 h-9 ml-2 rounded-full bg-teal text-white hover:bg-teal-dark text-3xl focus:outline-none"
        onClick={handlePlusButtonClick}
      >
        +
      </button>
    </div>
  );
}

export default OptionsTextField;

