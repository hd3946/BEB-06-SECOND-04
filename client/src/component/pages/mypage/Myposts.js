import React from "react";
import styled from "styled-components";

const MypostsBox = styled.div`
  width: 100%;
  margin-top: 30px;
  .mypostsHeader {
    font-size: 18px;
    font-weight: 500;
  }
  .mypostsList {
    height: 203px;
    margin-top: 10px;
    border: 1px solid black;
    overflow-y: auto;

    .mypost {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      border-bottom: 1px solid black;
      :last-child {
        border-bottom: 0px;
      }
      .mypostIndex {
        width: 50px;
        margin-left: 10px;
        font-size: 20px;
        font-weight: 500;
      }
      .mypostdesc {
        width: 550px;
      }
      .mypostDay {
        width: 80px;
        font-size: 18px;
        font-weight: 500;
      }
    }
  }
`;

const Myposts = () => {
  return (
    <MypostsBox>
      <div className="mypostsHeader">My Posts</div>
      <div className="mypostsList">
        {[1, 2, 3, 4].map((data, index) => (
          <div className="mypost" key={index}>
            <div className="mypostIndex">#{index}</div>
            <div className="mypostdesc">description</div>
            <div className="mypostDay">day</div>
          </div>
        ))}
      </div>
    </MypostsBox>
  );
};

export default Myposts;
