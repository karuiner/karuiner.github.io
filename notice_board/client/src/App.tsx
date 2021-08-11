import React from "react";
import styled from "styled-components";
import { data } from "./data";

const Frame = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  display: flex;
  height: 100%;
  width: ${window.innerWidth < 1200 ? window.innerWidth : 1200}px;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled.div`
  display: flex;
`;

function App() {
  console.log(data);
  return (
    <Frame>
      <Body>
        <TextBox>test</TextBox>
      </Body>
    </Frame>
  );
}

export default App;
