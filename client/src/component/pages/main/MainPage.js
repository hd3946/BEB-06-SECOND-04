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

  const listUpdate = () => {
    axios
      .get(`http://localhost:3005/post/list`)
      .then((res) => {
        dispatch(postlist({ list: res.data.postList }));
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    listUpdate();
  }, []);

  return (
    <MainPageBox>
      <MainTop />
      <PageList />
    </MainPageBox>
  );
};

export default MainPage;
