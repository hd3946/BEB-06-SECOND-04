import React from "react";
import Search from "./Search";
import styled from "styled-components";
import PageList from "./PageList";

const MainPageBox = styled.div`
  padding-top: 50px;
  margin: 0px 100px;
`;

const MainPage = () => {
  return (
    <MainPageBox>
      <Search />
      <PageList />
    </MainPageBox>
  );
};

export default MainPage;
