import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const PageBox = styled.div`
  width: 100%;
  border-bottom: ${(props) =>
    props.pos === "main" ? "2px solid rgba(36, 36, 36, 0.5)" : null};
  margin-top: 20px;
  .pageHeader {
    display: flex;
    width: 100%;
    .pageUserProfileBox {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: rgba(82, 192, 255, 0.6);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .pageUserBox {
      width: 90%;
      margin-left: 10px;
      .pageUserName {
        font-weight: 500;
      }
      .pageUserDesc {
        margin-top: 10px;
      }
    }
  }

  .pageImgBox {
    width: 100%;
    height: 200px;
    margin-top: 15px;
    background-color: rgba(82, 192, 255, 0.6);
  }

  .pageEtcBox {
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    margin: 10px 0px 10px 0px;
    .pageRorLBox {
      position: absolute;
      left: 0px;
      display: flex;
      justify-content: space-between;
      .count {
        display: flex;
        align-items: center;
        height: 50px;
        margin: 0px 25px 0px 10px;
        font-weight: 500;
      }
    }
    .pageiconBox {
      display: flex;
      justify-content: space-between;
      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        margin-left: 10px;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.2s;
        :hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
`;

const Page = ({ pos }) => {
  return (
    <PageBox pos={pos}>
      <div className="pageHeader">
        <div className="pageUserProfileBox">
          <img src="" alt="Profile" />
        </div>
        <div className="pageUserBox">
          <div className="pageUserName">Test User Name</div>
          <div className="pageUserDesc">Test User Description Test User</div>
        </div>
      </div>
      <div className="pageImgBox">
        <img src="" alt="" />
      </div>
      <div className="pageEtcBox">
        {pos === "detail" ? (
          <div className="pageRorLBox">
            <div className="count">0 Reply</div>
            <div className="count">0 Likes</div>
          </div>
        ) : null}
        <div className="pageiconBox">
          <div className="icon">
            <FontAwesomeIcon icon="fa-regular fa-message" />
          </div>
          <div className="icon">
            <FontAwesomeIcon icon="fa-heart-circle-plus" />
          </div>
        </div>
      </div>
    </PageBox>
  );
};

export default Page;
