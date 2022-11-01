import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import SignPage from "../../pages/sign/SignPage";
import Error from "./Error";
import Loading from "./Loading";
import Success from "./Success";

const ModalBox = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: ${(props) => (props.control !== null ? "10000" : "-1")};
`;

const Modal = () => {
  const { control } = useSelector((state) => state.state);

  return (
    <ModalBox control={control}>
      {control === "loading" ? <Loading /> : null}
      {control === "login" ? <SignPage control={control} /> : null}
      {control === "logout" ? <SignPage control={control} /> : null}
      {control === "error" ? <Error /> : null}
      {control === "success" ? <Success /> : null}
    </ModalBox>
  );
};

export default Modal;
