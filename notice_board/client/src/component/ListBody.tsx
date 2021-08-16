import React from "react";
import styled from "styled-components";
import Box from "./ListBox";

const Frame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1 0 0;
  padding: 10px;
  flex-direction: column;
`;

const Header = styled.div`
  min-height: 50px;
  display: flex;
  flex: 1 0 0;
  border: solid red 1px;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  padding: 5px;
`;

const Body = styled.div`
  min-height: 500px;
  display: flex;
  flex: 10 0 0;
  border: solid black 1px;
  flex-direction: column;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
  padding: 5px;
`;

const Footer = styled.div`
  min-height: 50px;
  display: felx;
  flex: 1 0 0;
  border: solid blue 1px;
  margin: 5px;
`;

function ListBody() {
  let dummy = Array(100).fill(0);
  return (
    <Frame>
      <Header>
        <Box num={"번호"} sub={"제목"} date={"작성일자"}></Box>
      </Header>
      <Body>
        {dummy.slice(0, 10).map((x, i) => {
          return (
            <Box key={i} num={i + 1} sub={`dummy${i + 1}`} date={"test"}></Box>
          );
        })}
      </Body>
      <Footer></Footer>
    </Frame>
  );
}

export default ListBody;
