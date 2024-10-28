import React from 'react'
import { Arrow, Comment, TaskContainer, TaskId, TaskItem, TaskName, TaskStatusBox, TaskTitleBox } from './CardIsuue.styled';
import tastimg from '../../assets/task.png'

interface CardIsuueProps{
    task: { name: string; id: string; title: string; status: string; comment: string; priority: string; }; 
    index: number;
}

const CardIsuue:React.FC<CardIsuueProps> = ({task,index}) => {
  return (
    <>
        <TaskContainer>
            <TaskItem key={index}>
                <img src={tastimg} alt="" />
                <TaskName>{task.name}</TaskName>
                <TaskId>{task.id}</TaskId>
                <TaskTitleBox status={task.title}>{task.title}</TaskTitleBox>
                <TaskStatusBox status={task.status}>{task.status}</TaskStatusBox>
                <Comment>{task.comment}</Comment>
                <Arrow>▲</Arrow>
            </TaskItem>
        </TaskContainer>
    </>
  )
}

export default CardIsuue