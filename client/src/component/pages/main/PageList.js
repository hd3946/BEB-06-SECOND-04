import React from "react";
import styled from "styled-components";
import "@fortawesome/fontawesome-free/js/all.js";
import Page from "../../common/Page";
import { useEffect } from "react";
import axios from "axios";

const PageListBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  .pageHeader {
    .tapAll {
      width: 250px;
      padding-bottom: 5px;
      text-align: center;
      font-weight: 600;
      border-bottom: 3px solid rgb(82, 192, 255);
      cursor: pointer;
    }
  }
`;

const PageList = () => {
  // contentList 요청 함수
  const listUpdate = () => {
    axios
      .get(`http://localhost:3005/post`)
      .then((res) => {
        // 받은 list는 redux에서 관리하기
        console.log(res);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    // 서버에서 API완성되면 주석 풀기
    // listUpdate();
  }, []);

  return (
    <PageListBox>
      <div className="pageHeader">
        <div className="tapAll">ALL</div>
      </div>
      {[1].map((data, index) => (
        <Page key={index} pos="main" />
      ))}
    </PageListBox>
  );
};

export default PageList;
