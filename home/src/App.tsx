import React from "react";
import styled from "styled-components";
import img from "./img/mountains.jpg";
import Main from "./main/index";

const Frame = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-image: url(${img});
  background-size: cover;

  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: solid 1px black;
`;

const Header = styled.div`
  height: 100px;
  width: 100%;
  flex: 1 0 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px black;
`;
const Navi = styled.div`
  height: 100%;
  flex: 2 0 0;
  display:flex
  overflow-y: auto;
  border: solid 1px black;
`;

const MainF = styled.div`
  height: 100%;
  flex: 6 0 0;
  border: solid 1px black;
`;

const Side = styled.div`
  height: 100%;
  flex: 2 0 0;
  border: solid 1px black;
`;

const Body = styled.div`
  flex: 1 0 0;
  width: 100%;
  min-width: 900px;
  display: flex;
  flex-direction: row;
  border: solid 1px black;
`;

const Title = styled.div`
  flex: 1 0 1;
  display: flex;
`;

function App() {
  return (
    <Frame>
      <Header>
        <Title>공인택의 놀이터</Title>
      </Header>
      <Body>
        <Navi></Navi>
        <MainF>
          <Main></Main>
        </MainF>
        <Side></Side>
      </Body>
    </Frame>
  );
}

export default App;
