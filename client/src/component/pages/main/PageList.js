import React from "react";
import styled from "styled-components";
import "@fortawesome/fontawesome-free/js/all.js";
import Page from "../../common/page/Page";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { postlist } from "../../../store/slice";

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

  const dispatch = useDispatch();
  return (
    <PageListBox>
      <div className="pageHeader">
        <div
          className="tapAll"
          onClick={() => {
            // setTap("ALL")
            dispatch(
              postlist({
                list: [
                  { content: "asdasdsa" },
                  { content: "asdasdsadasdasdasd" },
                  { content: "wqerfdsfser" },
                ],
              })
            );
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
            <Link to={`/detail`} key={index} state={{ pageId: 0, data: data }}>
              <Page pos="main" data={data} />
            </Link>
          ))
        ) : (
          <div>작성된 글이 없어요!</div>
        )
      ) : filterList.length > 0 ? (
        filterList.map((data, index) => (
          <Link to={`/detail`} key={index} state={{ pageId: 0, data: data }}>
            <Page pos="main" data={data} />
          </Link>
        ))
      ) : (
        <div>검색된 글이 없어요!</div>
      )}
    </PageListBox>
  );
};

export default PageList;
