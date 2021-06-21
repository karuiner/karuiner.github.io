import React from "react";
import styled from "styled-components";
import img from "./img/mountains.jpg";
import Blog from "./blog";
import { Route, Switch, Link } from "react-router-dom";

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
  height: 70px;
  width: 100%;
  flex: 1 0 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px black;
`;
const InnerFrame = styled.div<{ header: boolean }>`
  height: 100%;
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  ${(header) => (header ? "flex-direction: row-reverse;" : "")}
`;

const Body = styled.div`
  flex: 1 0 0;
  width: 100%;
  min-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  display: flex;
  margin-left: 20px;
`;

function App() {
  return (
    <Frame>
      <Header>
        <InnerFrame header={true}>
          <Box>
            <Link to={"/"}>돌아가기</Link>
          </Box>
          <Box>
            <Link to={"/blog"}>블로그</Link>
          </Box>
        </InnerFrame>
      </Header>
      <Body>
        <Switch>
          <Route exact path={"/blog"} component={Blog}></Route>
          <Route path={"/"}>
            <Body></Body>
          </Route>
        </Switch>
      </Body>
    </Frame>
  );
}

export default App;
