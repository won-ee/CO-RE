import styled from "styled-components";

interface TaskStatusProps {
  status: string;
}

export const TaskContainerLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TaskImage = styled.img`
  width: 24px;
  height: 24px; 
  object-fit: contain; 
  flex-shrink: 0; 
`;

export const TaskItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1150px;
  padding: 12px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  border-radius: 20px;
`;

export const TaskNameBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TaskNameText = styled.div`
  width: 300px;
  font-weight: bold;
  margin-left: 15px;

`;

export const TaskIdText = styled.div`
  color: #555;
  font-weight: bold;
`;

export const TaskTitleBox = styled.div<TaskStatusProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: 33px;
  width: 150px;
  font-size: 12px;
  font-weight: bold;

  color: ${(props) => {
    return props.status;
  }};
  background-color: ${(props) => {
    const rgbaColor = props.status;
    return rgbaColor.replace(/, 1\)$/g, ", 0.2)");
  }};
`;

export const TaskStatusBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: 33px;
  width: 150px;
  font-weight: bold;
`;

export const SenderCellBox = styled.td`
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
  text-align: left;
  vertical-align: middle;
`;

export const ActionButton = styled.button`
  padding: 8px 16px;
  margin: 0 5px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  color:#17519D;
  background-color:rgba(96, 151, 223, 0.2);
  cursor:pointer;
  &:hover {
    background-color: rgba(96, 151, 223, 0.4); 
  }
`;
