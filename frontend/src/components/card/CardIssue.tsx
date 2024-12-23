import React from 'react';
import { 
    ArrowIcon, 
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
import { IssueListType } from '../../Types/IssueType';

interface CardIssueProps{
    issue:IssueListType;
    index:number;
}

const CardIssue: React.FC<CardIssueProps> = ({ issue, index }) => {
  return (
    <>
        <TaskContainerLayout> 
            <TaskItemBox key={index}> 
                <TaskNameBox>
                    <img src={taskImg} alt="" />
                    <TaskNameText>{issue.issueTitle}</TaskNameText> 
                </TaskNameBox>
                <TaskIdText>{issue.issueKey}</TaskIdText>
                <TaskTitleBox status={""}>{issue.epicName}</TaskTitleBox>
                <TaskStatusBox status={issue.issueStatus}>{issue.issueStatus}</TaskStatusBox>
                <ArrowIcon src={
                            issue.issuePriority === 1 ? highIcon 
                            : issue.issuePriority === 2 ? middleIcon 
                            : lowIcon
                            } />
            </TaskItemBox>
        </TaskContainerLayout>
    </>
  );
}

export default CardIssue;