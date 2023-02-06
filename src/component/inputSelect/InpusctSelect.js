import AsyncSelect from "react-select";
import { LabeFormlStyled } from "../Style/Title";

const InputSelect = ({
  tag,
  name,
  data,
  set,
  value,
  size,
  className,
  error,
  isDisabled,
}) => {
  const handleSelectChange = (item) => {
    set(item);
  };

  return (
    <>
      <div style={{ width: `${size}%` }}>
        <LabeFormlStyled error={error} htmlFor={name}>
          {tag}
        </LabeFormlStyled>

        <AsyncSelect
          id={name}
          name={name}
          value={value}
          isClearable={true}
          options={data}
          onChange={(item) => handleSelectChange(item)}
          size={size}
          className={className}
          placeholder="Seleccionar"
          error={error}
          isDisabled={isDisabled}
        />
      </div>
    </>
  );
};
export default InputSelect;
