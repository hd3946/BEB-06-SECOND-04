import React from "react";
import styled from "styled-components";

const LoadingBox = styled.div`
  background-color: rgba(128, 128, 128, 0.8);
  width: 100%;
  height: 100vh;
  margin: auto;

  .front {
    position: absolute;
    width: 100px;
    height: 100px;

    border: 8px solid var(--mainColor);
    animation: rotation 4s linear 0s infinite normal;
  }

  .back {
    width: 90px;
    height: 90px;
    border: 8px solid rgb(44, 118, 255);
    transform: rotate(45deg);
    animation: rotation2 5s linear 0s infinite normal;
  }

  .loadingText {
    position: absolute;
    font-size: 20px;
    font-weight: 700;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes rotation2 {
    0% {
      transform: rotate(45deg);
    }
    100% {
      transform: rotate(-315deg);
    }
  }
`;

const Loading = () => {
  return (
    <LoadingBox className="cc">
      <div className="front" />
      <div className="back" />
      <div className="loadingText">Loading</div>
    </LoadingBox>
  );
};

export default Loading;
