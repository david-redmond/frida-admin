import React from "react";
import { connect } from "react-redux";
import { RootState } from "../store/interfaces";
import {
  CheckCircleOutline,
  ErrorOutline,
  InfoOutlined,
} from "@mui/icons-material";
import { toggleToastMessage } from "../store/actions";
import { IShowToastStates, IToggleToastMessage } from "../store/interfaces";

function mapStateToProps(state: RootState): IMapState {
  return {
    message: state.ui.message,
    showToast: state.ui.showToast,
  };
}

interface IMapState {
  message: string;
  showToast: IShowToastStates;
}
interface IActions {
  toggleToastMessage: (payload: IToggleToastMessage) => void;
}
interface IProps extends IMapState, IActions {}

const ToastMessage = (props: IProps) => {
  React.useEffect(() => {
    setTimeout(() => {
      props.toggleToastMessage({ message: "", showToast: null });
    }, 3000);
  }, [props.showToast]);

  if (!props.showToast) {
    return null;
  }
  const Success = () => (
    <div
      style={{
        border: "1px solid green",
        backgroundColor: "lightgreen",
        width: "70vw",
        margin: "auto",
        padding: "12px 24px",
        borderRadius: "8px",
        display: "flex",
        lineHeight: 1.5,
        color: "green",
      }}
    >
      <CheckCircleOutline style={{ marginRight: "12px", color: "green" }} />{" "}
      {props.message}
    </div>
  );

  const Error = () => (
    <div
      style={{
        border: "1px solid red",
        backgroundColor: "pink",
        width: "70vw",
        margin: "auto",
        padding: "12px 24px",
        borderRadius: "8px",
        display: "flex",
        lineHeight: 1.5,
        color: "red",
      }}
    >
      <ErrorOutline style={{ marginRight: "12px", color: "red" }} />{" "}
      {props.message}
    </div>
  );

  const Info = () => (
    <div
      style={{
        border: "1px solid blue",
        backgroundColor: "lightblue",
        width: "70vw",
        margin: "auto",
        padding: "12px 24px",
        borderRadius: "8px",
        display: "flex",
        lineHeight: 1.5,
        color: "blue",
      }}
    >
      <InfoOutlined style={{ marginRight: "12px", color: "blue" }} />{" "}
      {props.message}
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        bottom: "30px",
        position: "absolute",
        width: "100%",
      }}
    >
      {props.showToast === "success" && <Success />}
      {props.showToast === "error" && <Error />}
      {props.showToast === "info" && <Info />}
    </div>
  );
};

export default connect(mapStateToProps, { toggleToastMessage })(ToastMessage);
