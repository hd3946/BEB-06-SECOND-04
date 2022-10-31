import React from "react";
import { useSelector } from "react-redux";
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
    .empty {
      height: 100%;
    }
  }
`;

const Myposts = () => {
  const { list } = useSelector((state) => state.post);
  return (
    <MypostsBox>
      <div className="mypostsHeader">My Posts</div>
      <div className="mypostsList">
        {list.length > 0 ? (
          list.map((data, index) => (
            <div className="mypost" key={index}>
              <div className="mypostIndex">#{index}</div>
              <div className="mypostdesc">description</div>
              <div className="mypostDay">day</div>
            </div>
          ))
        ) : (
          <div className="empty cc">작성한 글이 없습니다!</div>
        )}
      </div>
    </MypostsBox>
  );
};

export default Myposts;
