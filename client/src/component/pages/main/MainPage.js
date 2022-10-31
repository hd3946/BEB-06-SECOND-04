import React, { useEffect } from "react";
import MainTop from "./MainTop";
import styled from "styled-components";
import PageList from "./PageList";
import { useDispatch } from "react-redux";
import axios from "axios";
import { postlist } from "../../../store/slice";

const MainPageBox = styled.div`
  padding-top: 50px;
  margin: 0px 100px;
`;

const MainPage = () => {
  const dispatch = useDispatch();

  // contentList 요청 함수
  const listUpdate = () => {
    axios
      .get(`http://localhost:3005/post`)
      .then((res) => {
        // 받은 list는 redux에서 관리하기
        // or
        // 현재 컴포넌트에 임시로 관리하기
        console.log(res);
        dispatch(postlist(res.postList));
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    // 서버에서 API완성되면 주석 풀기
    // listUpdate();
  }, []);

  return (
    <MainPageBox>
      <MainTop />
      <PageList />
    </MainPageBox>
  );
};

export default MainPage;
