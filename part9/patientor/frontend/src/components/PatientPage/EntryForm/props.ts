import { NewEntry } from "../../../types";

export interface FormProps {
  onSubmit: (entry: NewEntry) => void;
  options: string[];
}
