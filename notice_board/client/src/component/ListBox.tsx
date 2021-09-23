import React from "react";
import styled from "styled-components";

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
  date?: string;
}

function ListBox({ num, sub, date }: box) {
  return (
    <Frame>
      <Num>
        <Tbox>{num ? num : ""} </Tbox>
      </Num>
      <Subject>
        <Tbox>{sub ? sub : ""}</Tbox>
      </Subject>
      <Date>
        <Tbox>{date ? date : ""}</Tbox>
      </Date>
    </Frame>
  );
}

export default ListBox;
