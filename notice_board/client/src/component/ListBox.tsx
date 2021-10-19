import React from "react";
import styled from "styled-components";
import axios from "axios";

const Frame = styled.div`
  display: flex;
  flex: 1 0 0;
  margin: 5px;
`;

const Num = styled.div`
  display: flex;
  flex: 1 0 0;
  justify-content: center;
  align-items: center;
  border: solid black 1px;
`;

const Subject = styled.div`
  display: flex;
  flex: 5 0 0;
  justify-content: center;
  align-items: center;
  border: solid black 1px;
`;

const User = styled.div`
  display: flex;
  flex: 2 0 0;
  justify-content: center;
  align-items: center;
  border: solid black 1px;
`;

const Date = styled.div`
  display: flex;
  flex: 2 0 0;
  justify-content: center;
  align-items: center;
  border: solid black 1px;
`;

const Tbox = styled.div`
  display: flex;
`;
interface box {
  num?: number | string;
  sub?: string;
  user?: string;
  date?: string;
  setdata?: any;
}
const base = () => {
  console.log("test");
};

const sortf = (func: any, adr: string) => {
  return () => {
    if (func !== null) {
      axios.get(process.env.REACT_APP_SERVER + "/text" + adr).then((rst) => {
        func(rst.data);
      });
    }
  };
};

function ListBox({ num, sub, user, date, setdata = null }: box) {
  return (
    <Frame>
      <Num>
        <Tbox>{num ? num : ""} </Tbox>
      </Num>
      <Subject onClick={sortf(setdata, "/subject")}>
        <Tbox>{sub ? sub : ""}</Tbox>
      </Subject>
      <User onClick={sortf(setdata, "/user")}>
        <Tbox>{user ? user : ""}</Tbox>
      </User>
      <Date onClick={sortf(setdata, "")}>
        <Tbox>{date ? date : ""}</Tbox>
      </Date>
    </Frame>
  );
}

export default ListBox;
