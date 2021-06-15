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

const BoardFrame = styled.div`
  flex: 1 0 0;
  width: 100%;
`;

const NumberBox = styled.div`
  height: 50px;
  width: 100%;
`;

const Main = function () {
  return (
    <Frame>
      <Title>
        <Tbox>타이틀</Tbox>
      </Title>
      <BoardFrame></BoardFrame>
      <NumberBox></NumberBox>
    </Frame>
  );
};

export default Main;
