import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const ErrorBox = styled.div`
  position: fixed;
  background-color: rgba(255, 0, 0, 0.5);
  width: 100vw;
  height: 50px;
  animation: identifier 0.5s forwards;
  cursor: pointer;
  div,
  span {
    height: 100%;
    font-size: 30px;
    transition: 0.2s;
  }
  div {
    font-weight: 500;
    width: 100%;
    color: rgb(0, 0, 0);
    :hover {
      color: rgb(58, 58, 58);
    }
  }
  span {
    position: absolute;
    width: 50px;
    right: 0px;
    padding: 0px 25px 0px 10px;

    :hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  @keyframes identifier {
    0% {
      display: block;
      top: -50px;
    }
    100% {
      top: 0px;
    }
  }
`;

const Error = (errorData) => {
  // props로 상황에 맞는 에러를 받아옴

  // Error 모달을 클릭하면 해당 에러에 맞는
  // 페이지로 이동하거나 새로운 모달로 이동함
  // ex) 로그인 에러 모달 클릭시 로그인 모달을 띄워줌
  return (
    <ErrorBox className="cc">
      <div className="cc" onClick={() => console.log("모달 클릭")}>
        {/* error 종류에 따라 text 컨트롤 하기 */}
        <b>로그인</b>이 필요한 서비스입니다!
      </div>
      {/* 닫기 버튼 클릭시 Error 모달 제거 */}
      <span className="cc" onClick={() => console.log("닫기 클릭")}>
        <FontAwesomeIcon icon="fa-solid fa-xmark" />
      </span>
    </ErrorBox>
  );
};

export default Error;
