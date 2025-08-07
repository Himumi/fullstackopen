import { Input, InputBaseComponentProps } from "@mui/material";
interface InputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  inputProps?: InputBaseComponentProps;
}

const EntryInput = (props: InputProps) => {
  const containerStyles = {
    margin: "20px 0",
  };
  const inputStyles = {
    width: "100%",
  };
  return (
    <div style={containerStyles}>
      <label>{props.label}</label>
      <div>
        <Input
          value={props.value}
          onChange={props.onChange}
          style={inputStyles}
          type={props.type}
          inputProps={props.inputProps}
        />
      </div>
    </div>
  );
};

export default EntryInput;
