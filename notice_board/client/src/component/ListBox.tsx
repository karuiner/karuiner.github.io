import React from "react";
import styled from "styled-components";

const Frame = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  width: 100%;
`;

function ListBox(height: number) {
  return <Frame height={height}></Frame>;
}

export default ListBox;
