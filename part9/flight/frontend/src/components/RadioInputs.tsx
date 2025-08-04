import type { InputEventChange } from '../types';

interface RadioInputsProps {
  name: string;
  options: string[];
  handleChange: (event: InputEventChange) => void;
}

const RadioInputs = (props: RadioInputsProps) => {
  const { name, options, handleChange } = props;
  return (
    <div>
      {name}
      {options.map((option) => (
        <label htmlFor={option} key={option}>
          <input
            type="radio"
            id={option}
            name={name}
            value={option}
            onChange={handleChange}
          />
          {option.charAt(0).toLocaleUpperCase() + option.slice(1)}
        </label>
      ))}
    </div>
  );
};

export default RadioInputs;
