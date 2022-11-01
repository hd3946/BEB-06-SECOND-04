import React from "react";
import styled from "styled-components";
import "@fortawesome/fontawesome-free/js/all.js";
import Page from "../../common/page/Page";
import { useSelector } from "react-redux";
import { useState } from "react";

const PageListBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  .pageHeader {
    display: flex;
    justify-content: space-between;
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
  const [tap, setTap] = useState("ALL");

  const { list, filterList } = useSelector((state) => state.post);

  return (
    <PageListBox>
      <div className="pageHeader">
        <div
          className="tapAll"
          onClick={() => {
            setTap("ALL");
          }}
        >
          ALL
        </div>

        <div className="tapAll" onClick={() => setTap("SEARCH")}>
          SEARCH
        </div>
      </div>
      {tap === "ALL" ? (
        list.length > 0 ? (
          list.map((data, index) => (
            // data 에서 페이지 id를 받아 link로 보냄

            <Page pos="main" key={index} data={data} />
          ))
        ) : (
          <div>작성된 글이 없어요!</div>
        )
      ) : filterList.length > 0 ? (
        filterList.map((data, index) => (
          <Page pos="main" key={index} data={data} />
        ))
      ) : (
        <div>검색된 글이 없어요!</div>
      )}
    </PageListBox>
  );
};

export default PageList;
