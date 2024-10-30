import React from 'react';
import { 
    ArrowIcon, 
    CommentText, 
    TaskContainerLayout,
    TaskIdText,
    TaskItemBox,      
    TaskNameBox,      
    TaskNameText,    
    TaskStatusBox, 
    TaskTitleBox 
} from './CardIssue.styled';
import taskImg from '../../assets/task.png'; 
import lowIcon from '../../assets/low.png'
import highIcon from '../../assets/high.png'
import middleIcon from '../../assets/middle.png'

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
    <>
        <TaskContainerLayout> 
            <TaskItemBox key={index}> 
                <TaskNameBox>
                    <img src={taskImg} alt="" />
                    <TaskNameText>{task.name}</TaskNameText> 
                </TaskNameBox>
                <TaskIdText>{task.id}</TaskIdText>
                <TaskTitleBox status={task.title}>{task.title}</TaskTitleBox>
                <TaskStatusBox status={task.status}>{task.status}</TaskStatusBox>
                <CommentText>{task.comment}</CommentText> 
                <ArrowIcon src={
                            task.priority === 'high' ? highIcon 
                            : task.priority === 'middle' ? middleIcon 
                            : lowIcon
                            } />
            </TaskItemBox>
        </TaskContainerLayout>
    </>
  );
}

export default CardIssue;
