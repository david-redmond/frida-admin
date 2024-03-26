import * as React from "react";
import { IFormInputProps } from "./interfaces";
import '../forms.css';

export default (props: IFormInputProps) => {
  return (
    <div className={'form-input-wrapper'}>
      <label htmlFor={props.name}>{props.title}</label>
      <input
        name={props.name}
        id={props.id}
        type={!!props.type ? props.type : "text"}
        placeholder={props.placeholder}
        onInput={props.handleChange}
      />
    </div>
  );
};
