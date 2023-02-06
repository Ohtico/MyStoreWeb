import { InputForm, LabelStyled } from "./InputForm";

export const LabelGroup = ({
  name,
  tag,
  size,
  value,
  onChange,
  disabled,
  type,
  placeholder,
  maxLength,
  required,
  children,
  onBlur,
  max,
  error,
}) => {
  return (
    <div style={{ width: `${size}%` }}>
      <LabelStyled error={error}>{tag}</LabelStyled>
      <InputForm
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        name={name}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        max={max && max}
        error={error}
      />
      {children}
    </div>
  );
};
