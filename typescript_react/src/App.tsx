import styled from "styled-components";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { useState } from "react";
import Login from "./component/login";
import Resister from "./component/resister";
import Mypage from "./component/mypage";
import axios from "axios";
import "dotenv/config";
axios.defaults.withCredentials = true;
const Main = styled.div`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;
const MenuBar = styled.div`
  max-height: 100px;
  flex: 1 0 0;
  border: solid 1px red;
  display: flex;
  flex-direction: row-reverse;
`;

const Body = styled.div`
  flex: 1 0 0;
  border: solid 1px red;
`;

const Button = styled.button`
  height: 100px;
  width: 100px;
  background: grey;
`;

const Logo = styled.img`
  height: 100px;
  width: 100px;
`;

const SearchArea = styled.div`
  flex: 1 0 0;
  flex-direction: column;
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  height: 30px;
  width: 100%;
  font-size: 30px;
  text-align: center;
`;

const SearchBarFrame = styled.div`
  display: flex;
  width: 100%;
  flex: 1 0 0;
  justify-content: center;
  padding-top: 15px;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 10px;
  font-size: 18px;
  text-align: right;
`;

const SearchSelect = styled.select`
  font-size: 18px;
`;

const Searchinput = styled.input`
  flex: 1 0 0;
  max-width: 600px;
  font-size: 18px;
`;

const SearchButton = styled.button`
  width: 50px;
  font-size: 25px;
  text-align: center;
`;

function App() {
  let history = useHistory();
  const [active, activf] = useState(false);
  const [AccessToken, TokenGetFunc] = useState("");
  const [userInfo, userInfof] = useState({
    userName: "",
    email: "",
    phone: "",
    createdAt: "",
  });

  function MainBar() {
    return (
      <SearchArea>
        <Title>Recipe 101</Title>
        <SearchBar></SearchBar>
      </SearchArea>
    );
  }

  function SearchBar() {
    return (
      <SearchBarFrame>
        <SearchSelect>
          <option>작성자</option>
          <option>요리명</option>
          <option>재료명</option>
        </SearchSelect>
        <Searchinput></Searchinput>
        <SearchButton>검색</SearchButton>
      </SearchBarFrame>
    );
  }

  return (
    <div>
      <Main>
        <MenuBar>
          {AccessToken.length === 0 ? (
            <Button
              onClick={() => {
                activf(!active);
              }}
            >
              login
            </Button>
          ) : (
            <Button
              onClick={() => {
                axios
                  .get(`https://server.recipe101.tk/user`, {
                    headers: {
                      Authorization: `Bearer ${AccessToken}`,
                    },
                  })
                  .then((res) => {
                    userInfof({ ...res.data.data.userinfo });
                    history.push("/mypage");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Profile
            </Button>
          )}
          <MainBar />
          <Logo></Logo>
        </MenuBar>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return active ? (
                <div>
                  <Body />
                  <Redirect to="/signin" />
                </div>
              ) : (
                <Redirect to="/" />
              );
            }}
          ></Route>
          <Route exact path="/signin">
            <Login Ftoken={TokenGetFunc} Factive={activf} />
          </Route>
          <Route exact path="/signup">
            <Resister Factive={activf} />
          </Route>
          <Route exact path="/mypage">
            <Mypage token={AccessToken} {...userInfo} />
          </Route>
        </Switch>
      </Main>
    </div>
  );
}

export default App;
