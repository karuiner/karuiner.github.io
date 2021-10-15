import React, { useState } from "react";
import styled from "styled-components";
import Box from "./ListBox";
import axios from "axios";
import HeaderBox from "./HeaderBox";

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
  margin: 5px;
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
  display: flex;
  flex: 1 0 0;
  border: solid blue 1px;
  margin: 5px;
  padding: 5px;
`;

const SBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
`;

const NumberBox = styled.div`
  display: flex;
  flex: 10 0 0;
`;

const Tbox = styled.div`
  display: flex;
`;
const Bbox = styled.div`
  width: 100%;
  border: solid black 1px;
`;

interface Post_l {
  _id: object;
  no: number;
  user: string;
  subject: string;
  createdAt: Date;
}

function ListBody() {
  let [data, setdata] = useState<Post_l[]>([]);

  if (data.length === 0) {
    axios.get(process.env.REACT_APP_SERVER + "/post").then((rst) => {
      console.log(rst.data);
      setdata(rst.data);
    });
  }
  let n = data.length;
  let [k, setk] = useState(0);

  return (
    <Frame>
      <Header>
        <HeaderBox></HeaderBox>
      </Header>
      <Body>
        <Bbox>
          <Box
            num={"번호"}
            sub={"제목"}
            user={"작성자"}
            date={"작성일자"}
          ></Box>
        </Bbox>
        {Array(10)
          .fill(0)
          .map((p, i) => {
            let x = data[k + i];
            return x !== undefined ? (
              <Box
                key={k + i}
                num={x.no}
                sub={x.subject}
                user={x.user}
                date={`${x.createdAt}`.split("T")[0]}
              ></Box>
            ) : (
              <Box></Box>
            );
          })}
      </Body>
      <Footer>
        <SBox
          onClick={() => {
            let u = Math.floor(k / 10);
            setk(u > 0 ? (u - 1) * 10 : 0);
          }}
        >
          <Tbox>{"이전"}</Tbox>
        </SBox>
        <NumberBox>
          {Array(10)
            .fill(0)
            .map((x, i) => {
              return (
                <SBox key={k + i + 1}>
                  <Tbox>{`${k + i + 1}`}</Tbox>
                </SBox>
              );
            })}
        </NumberBox>
        <SBox
          onClick={() => {
            if (n > 10) {
              let u = Math.floor(k / 10);
              let l = Math.floor(n / 10);
              setk(u < l ? (u + 1) * 10 : l * 10);
            }
          }}
        >
          <Tbox>{"이후"}</Tbox>
        </SBox>
      </Footer>
    </Frame>
  );
}

export default ListBody;
