import React from "react";
import styled from "styled-components";
import SignPage from "../../pages/sign/SignPage";
import Error from "./Error";
import Loading from "./Loading";

const ModalBox = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
`;

const Modal = () => {
  // redux에서 상태를 가져와 선택 랜더링
  // 상태에 따라 ModalBox의 z-index도 변경
  return (
    <ModalBox>
      {/* <Loading /> */}
      {/* <SignPage /> */}
      {/* <Error /> */}
    </ModalBox>
  );
};

export default Modal;
