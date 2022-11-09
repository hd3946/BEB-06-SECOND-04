import React, { useEffect } from "react";
import SearchAndPost from "./SearchAndPost";
import styled from "styled-components";
import PageList from "./PageList";
import { useDispatch } from "react-redux";
import { postlist } from "../../../store/slice";
import { postListCall } from "../../../api/post";
import { usePost } from "../../../hooks/usePostFilter";

const MainPageBox = styled.div`
  padding-top: 50px;
  margin: 0px 100px;
`;

const MainPage = () => {
  const dispatch = useDispatch();

  const listCall = async () => {
    const { data } = await postListCall();
    dispatch(postlist({ list: data.postList }));
  };
  // listCall();
  useEffect(() => {
    listCall();
  }, []);

  return (
    <MainPageBox>
      <SearchAndPost />
      <PageList />
    </MainPageBox>
  );
};

export default MainPage;
