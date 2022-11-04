import React from "react";
import styled from "styled-components";
import "@fortawesome/fontawesome-free/js/all.js";
import Page from "../../common/page/Page";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

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
      border-bottom: ${(props) =>
        props.tap === "ALL" ? "3px solid rgb(82, 192, 255)" : "0px"};
      cursor: pointer;
    }
    .tapSearch {
      border-bottom: ${(props) =>
        props.tap === "SEARCH" ? "3px solid rgb(82, 192, 255)" : "0px"};
    }
  }
`;

const PageList = () => {
  const [tap, setTap] = useState("ALL");
  const { list, filterList } = useSelector((state) => state.post);

  useEffect(() => {
    if (filterList.length > 0) {
      setTap("SEARCH");
    }
  }, [filterList]);

  return (
    <PageListBox tap={tap} filterColor={filterList.length}>
      <div className="pageHeader">
        <div
          className="tapAll"
          onClick={() => {
            setTap("ALL");
          }}
        >
          ALL
        </div>

        <div className="tapAll tapSearch" onClick={() => setTap("SEARCH")}>
          SEARCH
        </div>
      </div>

      {tap === "ALL" ? (
        list.length > 0 ? (
          list.map((data, index) => <Page key={index} data={data} />)
        ) : (
          <div className="cc" style={{ height: "150px" }}>
            작성된 글이 없어요!
          </div>
        )
      ) : filterList.length > 0 ? (
        filterList.map((data, index) => <Page key={index} data={data} />)
      ) : (
        <div className="cc" style={{ height: "150px" }}>
          검색된 글이 없어요!
        </div>
      )}
    </PageListBox>
  );
};

export default PageList;
