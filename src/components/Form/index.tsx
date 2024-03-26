import * as React from "react";
import FormInput from './Input';
import { IFormProps } from "./interfaces";
import './forms.css';

export default (props: IFormProps) => {
  return (
    <div className={"form"}>
      <p className={"form-title"}>{props.formTitle}</p>
      <div className={"form-body"}>
        {props.inputs.map(item => <FormInput {...item}/>)}
        <button onClick={props.handleSubmit}>Submit</button>
      </div>
    </div>);
}
