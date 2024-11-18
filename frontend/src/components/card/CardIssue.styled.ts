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

export const TaskStatusBox = styled.div<TaskStatusProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: 33px;
  width: 150px;
  font-weight: bold;
`;

export const ArrowIcon = styled.img`
  cursor: pointer;
  margin-right: 30px;
`;
