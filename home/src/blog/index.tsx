import { useState } from "react";
import styled from "styled-components";

const Frame = styled.div`
  height: 100%;
  max-width: 1200px;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Stbox = styled.div`
  display: flex;
`;

const BoardFrame = styled.div`
  flex: 1 0 0;
  width: 100%;
`;

const NumberBox = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  border-top: solid 1px white;
  justify-content: center;
  align-items: center;
`;
const NumberLinkBox = styled.div`
  display: flex;
  height: 95%;
  width: 80%;
  align-items: center;
  justify-content: space-between;
`;
const LinkBox = styled.div`
  height: 40px;
  width: 40px;
  color: white;
  cursor: pointer;
`;

const LabelBox = styled.div`
  height: 50px;
  width: 100%;
  border-top: solid 1px white;
  border-bottom: solid 1px white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LabelInnerBox = styled.div`
  display: flex;
  height: 95%;
  width: 95%;
`;
const Number = styled.div`
  display: flex;
  flex: 1 0 0;
  justify-content: center;
  align-items: center;
`;
const Subject = styled.div`
  display: flex;
  flex: 8 0 0;
  justify-content: center;
  align-items: center;
`;
const Date = styled.div`
  display: flex;
  flex: 2 0 0;
  justify-content: center;
  align-items: center;
`;

const Board = function () {
  const [k, setk] = useState(0);
  let n = 55;
  let data = Array(Math.ceil(n / 10) * 10)
    .fill(0)
    .map((x, i) => i + 1);
  console.log(data);
  return (
    <Frame>
      <LabelBox>
        <LabelInnerBox>
          <Number>
            <Stbox>번호</Stbox>
          </Number>
          <Subject>
            <Stbox>제목</Stbox>
          </Subject>
          <Date>
            <Stbox> 날짜</Stbox>
          </Date>
        </LabelInnerBox>
      </LabelBox>
      <BoardFrame></BoardFrame>
      <NumberBox>
        <NumberLinkBox>
          <LinkBox
            onClick={() => {
              if (k < 10) {
                setk(0);
              } else {
                setk(k - 10);
              }
            }}
          >
            이전
          </LinkBox>
          {data.slice(k, k + 10).map((x, i) => {
            return <LinkBox key={i}>{x <= n ? `${x}` : ""}</LinkBox>;
          })}
          <LinkBox
            onClick={() => {
              if (k + 10 < n) {
                setk(k + 10);
              }
            }}
          >
            이후
          </LinkBox>
        </NumberLinkBox>
      </NumberBox>
    </Frame>
  );
};

export default Board;
