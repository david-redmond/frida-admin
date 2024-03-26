import * as React from "react";
import "./page.css";
import { IPageProps } from "./interfaces";

export default (props: IPageProps) => {
  return (
    <div className={"page-main"}>
      <section className={"page-main-header"}>
        {props.title}
        {!!props.button && (
          <button onClick={props.button.handleClick}>
            {props.button.title}
          </button>
        )}
      </section>
      <div className={"page-main-body"}>{props.children}</div>
    </div>
  );
};
