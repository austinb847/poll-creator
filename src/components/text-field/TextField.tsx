interface TextFieldProps {
  label?: string;
  placeholder: string;
  onChange?: (value: string) => void;
  value?: string;
}

function TextField(props: TextFieldProps) {
  const { label, placeholder, onChange, value } = props;

  return (
    <>
      {label && <label className="font-medium">{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        className="w-full border-b border-offwhite focus:outline-none mt-4"
        onChange={(e) => onChange && onChange(e.target.value)}
        value={value}
      />
    </>
  );
}

export default TextField;

