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
    switch (props.status) {
      case '프로젝트 기획/설계':
        return '#17519D';
      case '와이어프레임 제작':
        return '#9D1730'; 
      case '아이디어 회의':
        return '#4A9D17'; 
      default:
        return '#ccc';
    }
  }};
  background-color: ${(props) => {
    switch (props.status) {
      case '프로젝트 기획/설계':
        return 'rgba(96, 151, 223, 0.2)';
      case '와이어프레임 제작':
        return 'rgba(223, 96, 100, 0.2)'; 
      case '아이디어 회의':
        return 'rgba(99, 186, 60, 0.2)'; 
      default:
        return 'rgba(204, 204, 204, 0.2)'; 
    }
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
      case 'In Progress':
        return '#6226EF';
      case 'To Do':
        return '#202A30'; 
      case 'DONE':
        return '#00B69B'; 
      default:
        return '#ccc'; 
    }
  }};
  background-color: ${(props) => {
    switch (props.status) {
      case 'In Progress':
        return 'rgba(98, 38, 239, 0.2)';
      case 'To Do':
        return 'rgba(32, 42, 48, 0.2)'; 
      case 'DONE':
        return 'rgba(0, 192, 155, 0.2)'; 
      default:
        return '#ccc';
    }
  }};
`;


export const ArrowIcon = styled.img`  
  cursor: pointer;
  margin-right: 30px;
`;
