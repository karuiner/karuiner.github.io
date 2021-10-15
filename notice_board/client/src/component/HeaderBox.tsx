import React from "react";
import styled from "styled-components";

function HeaderBox() {
  return (
    <div>
      <span>
        <select>
          <option>제목</option>
          <option>작성자</option>
          <option>작성일자</option>
        </select>
        <input type="text"></input>
      </span>
      <span>
        <button> 글쓰기</button>
      </span>
    </div>
  );
}
export default HeaderBox;
