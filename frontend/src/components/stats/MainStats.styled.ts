import styled from "styled-components";

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 15px;
  margin-bottom: 30px;
  padding: 10px 10px;
`;

export const StatBox = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 15px;
  width: calc(25% - 15px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 130px;
  gap: 10px;
  transition: transform 0.2s;
`;

export const Title = styled.h4`
  font-size: 18px;
  margin: 0;
  line-height: 1.5;
`;

export const Value = styled.h2`
  font-size: 32px;
  margin: 10px 0;
  line-height: 1.2;
`;

interface ChangeProps {
  $positive: boolean;
}

export const Change = styled.span<ChangeProps>`
  font-size: 14px;
  color: ${(props) => (props.$positive ? "green" : "red")};
  text-align: center;
`;

export type Stat = {
  TITLE: string;
  VALUE: string;
  CHANGE: string;
  POSITIVE: boolean;
};
