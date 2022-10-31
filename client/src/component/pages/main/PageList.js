import React from "react";
import styled from "styled-components";
import "@fortawesome/fontawesome-free/js/all.js";
import Page from "../../common/page/Page";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const PageListBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  a {
    color: black;
    text-decoration: none;
    cursor: default;
    transition: 0.3s;
    :hover {
      background-color: aliceblue;
    }
  }
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
  console.log("pagelist 리랜더링");

  return (
    <PageListBox>
      <div className="pageHeader">
        <div className="tapAll" onClick={() => setTap("ALL")}>
          ALL
        </div>
        {filterList > 0 ? (
          <div className="tapAll" onClick={() => setTap("SEARCH")}>
            SEARCH
          </div>
        ) : null}
      </div>
      {tap === "ALL"
        ? list.map((data, index) => (
            // data 에서 페이지 id를 받아 link로 보냄
            <Link to={`/detail`} key={index} state={{ pageId: 0 }}>
              <Page pos="main" />
            </Link>
          ))
        : filterList.map((data, index) => (
            <Link to={`/detail`} key={index} state={{ pageId: 0 }}>
              <Page pos="main" />
            </Link>
          ))}
    </PageListBox>
  );
};

export default PageList;
