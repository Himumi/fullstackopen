import { PropsWithChildren } from "react";

interface Props {
  onSubmit: (event: React.FormEvent) => void;
}
const FormContainer = (props: PropsWithChildren<Props>) => {
  const handleSubmit = props.onSubmit;

  const formStyles = {
    border: "1px dashed black",
    padding: 30,
  };

  return (
    <form style={formStyles} onSubmit={handleSubmit}>
      {props.children}
    </form>
  );
};

export default FormContainer;
