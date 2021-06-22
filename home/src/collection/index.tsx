import { useState } from "react";
import styled from "styled-components";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const InnerFrame = styled.div`
  height: ${window.innerHeight - 70}px;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`;
const LabelBox = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Label = styled.div`
  height: 100%;
  width: 10%;
  min-width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tbox = styled.div`
  display: flex;
`;
const ContentBox = styled.div`
  height: ${window.innerHeight - 120}px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  overflow-y: scroll;
`;

const Content = styled.div`
  display: flex;
  ${window.innerWidth > 1200
    ? `
    width: 393px;
    height: 393px;
    `
    : `
    width: ${Math.floor(window.innerWidth / 3)}px;
    height: ${Math.floor(window.innerWidth / 3)}px;
    `}
  border:solid 1px red;
`;

function Collection() {
  let data = ["sample", "sample1", "sample2", "sample3"];
  let k = data.length;
  data = data.concat(Array(Math.ceil(k / 10) * 10 - k).fill(""));
  let dummy = [5, 8, 2, 3].map((x) => {
    return Array(x)
      .fill("")
      .map((x, i) => `sample${i + 1}`);
  });
  const [sel, setsel] = useState(0);

  return (
    <Frame>
      <InnerFrame>
        <LabelBox>
          {data.map((x, i) => (
            <Label
              key={i}
              onClick={() => {
                if (i < k) {
                  setsel(i);
                }
              }}
            >
              <Tbox>{x}</Tbox>
            </Label>
          ))}
        </LabelBox>
        <ContentBox>
          {dummy[sel].map((x, i) => (
            <Content key={i}>{x}</Content>
          ))}
        </ContentBox>
      </InnerFrame>
    </Frame>
  );
}

export default Collection;
