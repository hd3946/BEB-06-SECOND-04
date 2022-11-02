import React, { useEffect } from "react";
import MainTop from "./MainTop";
import styled from "styled-components";
import PageList from "./PageList";
import { useDispatch } from "react-redux";
import { postlist } from "../../../store/slice";
import { postListCall } from "../../../api/post";

const MainPageBox = styled.div`
  padding-top: 50px;
  margin: 0px 100px;
`;

const MainPage = () => {
  const dispatch = useDispatch();

  const listCall = async () => {
    const { data } = await postListCall();
    dispatch(postlist({ list: data.postList.reverse() }));
  };

  useEffect(() => {
    listCall();
  }, []);

  return (
    <MainPageBox>
      <MainTop />
      <PageList />
    </MainPageBox>
  );
};

export default MainPage;
