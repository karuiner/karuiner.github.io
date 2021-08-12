import React from "react";
import styled from "styled-components";
import { data } from "./data";
import ListBody from "./component/ListBody";

const Frame = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Body = styled.div`
  display: flex;
  flex: 1 0 0;
  width: ${window.innerWidth < 1200 ? window.innerWidth : 1200}px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled.div`
  display: flex;
`;

function App() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  console.log(inputRef);
  return (
    <Frame>
      <Body>
        <ListBody></ListBody>
      </Body>
    </Frame>
  );
}

export default App;
