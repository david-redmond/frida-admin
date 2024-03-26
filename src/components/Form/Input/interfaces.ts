export interface IFormInputProps {
  id: string;
  name: string;
  title: string;
  placeholder: string;
  type?: "text" | "number" | "password";
  handleChange: (e?: any) => void;
  value: string | number
}

export interface INewProductFormState {
  title: string;
  price: string;
  description: string;
  duration: number;
  image: string;
}
