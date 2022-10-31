import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import SignPage from "../../pages/sign/SignPage";
import Error from "./Error";
import Loading from "./Loading";

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
      {control === "login" ? <SignPage /> : null}
      {control === "error" ? <Error /> : null}
    </ModalBox>
  );
};

export default Modal;
