import type { SelectEventChange } from '../types';

interface SelectProps {
  name: string;
  options: string[];
  handleChange: (event: SelectEventChange) => void;
}

const Select = (props: SelectProps) => {
  const { name, options, handleChange } = props;
  return (
    <div>
      {name}
      <select name={name} id={`${name}-select`} onChange={handleChange}>
        <option value="">--Select {name}--</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option.charAt(0).toLocaleUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
      ;
    </div>
  );
};

export default Select;
