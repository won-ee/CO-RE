import styled from "styled-components";

export const CardLayout = styled.table`
  width: 100%;
  border-bottom: solid 1px #D5D5D5;
`;

export const CardCellBox = styled.td`
  padding: 15px;
  display: flex;
  width: 500px;
  vertical-align: middle;
  margin-right: -100px;
`;

export const CardNameParagraph = styled.p`
  font-weight: bold;
  width: 500px;
  vertical-align: middle;
  margin-left: 5%;
`;

export const ProjectCodeSpan = styled.p`
  font-size: 0.9em;
  color: #6b7280;
  width: 200px;
  vertical-align: middle;

`;

export const CategoryBox = styled.div<{ status: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  width: 150px;
  height: 30px;
  font-weight: bold;

  color: ${(props) => {
    return props.status;
  }};

  background-color: ${(props) => {
    const rgbaColor = props.status;
    return rgbaColor.replace(/, 1\)$/g, ", 0.2)");
  }};
`;

export const DeadlineCellBox = styled.td`
  text-align: left;
  width: 150px;

`;

export const SenderCellBox = styled.td`
  padding: 15px;
  text-align: left;
  width: 120px;
  vertical-align: middle;
  margin-right: 30px;

`;

export const SenderInfoBox = styled.div`
  display: flex;
  align-items: center;
`;

export const SenderAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const SenderNameSpan = styled.span`
  font-size: 0.9em;
`;

export const ActionCellBox = styled.td`
  padding: 15px;
  text-align: left;
  vertical-align: middle;
`;

export const ActionButton = styled.button<{ color: 'accept' | 'reject' }>`
  padding: 8px 16px;
  margin: 0 5px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  color: ${(props) =>
    props.color === 'accept' ? '#17519D' : 'none'};
  background-color: ${(props) =>
    props.color === 'accept' ? 'rgba(96, 151, 223, 0.2)' : 'none'};
  cursor: ${(props) =>
    props.color === 'accept' ? 'pointer' : 'none'};
`;
