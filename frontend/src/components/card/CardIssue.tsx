import React from 'react';
import { 
    ArrowIcon, 
    CommentText, 
    TaskContainerLayout, // Layout 접미사 추가
    TaskIdText,          // Text 접미사 추가
    TaskItemBox,        // Box 접미사 추가
    TaskNameText,       // Text 접미사 추가
    TaskStatusBox, 
    TaskTitleBox 
} from './CardIssue.styled';
import taskImg from '../../assets/task.png'; // 오타 수정: tastimg -> taskImg

interface CardIssueProps {
    task: { 
        name: string; 
        id: string; 
        title: string; 
        status: string; 
        comment: string; 
        priority: string; 
    }; 
    index: number;
}

const CardIssue: React.FC<CardIssueProps> = ({ task, index }) => {
  return (
    <TaskContainerLayout> 
        <TaskItemBox key={index}> 
            <img src={taskImg} alt="" />
            <TaskNameText>{task.name}</TaskNameText> 
            <TaskIdText>{task.id}</TaskIdText> 
            <TaskTitleBox status={task.title}>{task.title}</TaskTitleBox>
            <TaskStatusBox status={task.status}>{task.status}</TaskStatusBox>
            <CommentText>{task.comment}</CommentText> 
            <ArrowIcon>▲</ArrowIcon>
        </TaskItemBox>
    </TaskContainerLayout>
  );
}

export default CardIssue;
