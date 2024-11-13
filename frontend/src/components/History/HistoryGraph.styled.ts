import styled from "styled-components";

export const GitGraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  transform: scale(0.6);
  transform-origin: top;
  margin-bottom: 20px;
  margin-left: 200px;
  margin-top: 30px;
`;

export const ReversedGraphContainer = styled.div`
  transform: scaleY(-1);
`;
