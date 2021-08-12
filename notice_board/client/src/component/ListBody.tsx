import React from "react";
import styled from "styled-components";

const Frame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
`;

const Header = styled.div`
  min-height: 50px;
  display: felx;
  flex: 1 0 0;
  border: solid red 1px;
`;

const Body = styled.div`
  min-height: 500px;
  display: flex;
  flex: 10 0 0;
`;

const Footer = styled.div`
  min-height: 50px;
  display: felx;
  flex: 1 0 0;
  border: solid blue 1px;
`;

function ListBody() {
  return (
    <Frame>
      <Header></Header>
      <Body>{}</Body>
      <Footer></Footer>
    </Frame>
  );
}

export default ListBody;
