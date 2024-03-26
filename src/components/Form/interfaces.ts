import { IFormInputProps } from "./Input/interfaces";

export interface IFormProps {
  formTitle: string;
  inputs: IFormInputProps[];
  handleSubmit: () => void;
}
