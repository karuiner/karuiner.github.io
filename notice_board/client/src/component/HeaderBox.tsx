import React, { useState } from "react";
import styled from "styled-components";

const Frame = styled.div`
  width: 100%;
  height: 100%;
`;
interface options {
  [index: string]: string;
  제목: string;
  작성자: string;
  작성일자: string;
}

const targetdb: options = {
  제목: "subject",
  작성자: "user",
  작성일자: "createdAt",
};

function HeaderBox({ setdata }: { setdata: any }) {
  let [target, settarget] = useState("제목");

  return (
    <Frame>
      <span>
        <select
          defaultValue={target}
          onChange={(ev) => {
            let v: string = ev.target.value;
            settarget(targetdb[ev.target.value]);
          }}
        >
          <option>제목</option>
          <option>작성자</option>
          <option>작성일자</option>
        </select>
      </span>
      <span>
        {target !== "createdAt" ? <input type="text"></input> : <span></span>}

        <button
          onClick={() => {
            console.log(target);
          }}
        >
          검색
        </button>
      </span>
      <span>
        <button> 글쓰기</button>
      </span>
    </Frame>
  );
}
export default HeaderBox;
