import styled from "styled-components";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;
const Title = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Tbox = styled.div`
  display: flex;
  font-size: 50px;
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
`;
const LinkBox = styled.div`
  height: 40px;
  width: 40px;
  color: white;
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

const Main = function () {
  return (
    <Frame>
      <Title>
        <Tbox>타이틀</Tbox>
      </Title>
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
          <LinkBox>이전</LinkBox>
          {Array(10)
            .fill(1)
            .map((x, i) => {
              return <LinkBox key={i}>{i < 5 ? `${i + 1}` : ""}</LinkBox>;
            })}
          <LinkBox>이후</LinkBox>
        </NumberLinkBox>
      </NumberBox>
    </Frame>
  );
};

export default Main;
