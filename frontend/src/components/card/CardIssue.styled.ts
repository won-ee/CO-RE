import styled from "styled-components";

interface TaskStatusProps {
  status: string;
}

export const TaskContainerLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
`;

export const TaskNameText = styled.div`
  font-weight: bold;
  margin-left: 15px;
`;

export const TaskIdText = styled.div`
  color: #555;
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
  font-size: 12px;
  font-weight: bold;

  color: ${(props) => {
    switch (props.status) {
      case 'IN_PROGRESS':
        return '#6226EF';
      case 'TODO':
        return '#202A30';
      case 'DONE':
        return '#00B69B';
      default:
        return '';
    }
  }};
  
  background-color: ${(props) => {
    switch (props.status) {
      case 'IN_PROGRESS':
        return 'rgba(98, 38, 239, 0.2)';
      case 'TODO':
        return 'rgba(32, 42, 48, 0.2)';
      case 'DONE':
        return 'rgba(0, 192, 155, 0.2)';
      default:
        return '';
    }
  }};
`;

export const ArrowIcon = styled.img`
  cursor: pointer;
  margin-right: 30px;
`;
