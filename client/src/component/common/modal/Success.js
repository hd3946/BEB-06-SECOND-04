import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { check } from "../../../store/slice";

const SuccessBox = styled.div`
  position: fixed;
  background-color: rgb(71 210 213 / 82%);
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

const Success = (successData) => {
  // props로 상황에 맞는 success data를 받아옴
  const [modal, setModal] = useState(true);

  const dispatch = useDispatch();
  const handleClose = () => {
    setModal(false);
    dispatch(check({ type: "" }));
  };

  if (modal) {
    return (
      <SuccessBox className="cc">
        <div className="cc" onClick={() => console.log("모달 클릭")}>
          {/* success 종류에 따라 text 컨트롤 하기 */}
          <b>민팅</b>에 성공했습니다
        </div>
        {/* 닫기 버튼 클릭시 success 모달 제거 */}
        <span className="cc" onClick={handleClose}>
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </span>
      </SuccessBox>
    );
  }
};

export default Success;
