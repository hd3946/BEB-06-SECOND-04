import React from "react";
import styled from "styled-components";
import "@fortawesome/fontawesome-free/js/all.js";
import Page from "../../common/Page";

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
  return (
    <PageListBox>
      <div className="pageHeader">
        <div className="tapAll">ALL</div>
      </div>
      {[1, 2, 3, 4, 5].map((data, index) => (
        <Page key={index} pos="main" />
      ))}
    </PageListBox>
  );
};

export default PageList;
