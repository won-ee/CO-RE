import React from 'react'
import { ActionButton, 
        ActionCellBox, 
        CardCellBox, 
        CardLayout, 
        CardNameParagraph, 
        CategoryBox,
        DeadlineCellBox, 
        ProjectCodeSpan, 
        SenderAvatar,
        SenderCellBox, 
        SenderInfoBox, 
        SenderNameSpan 
        } from './CardTask.styled'

interface CardTaskProps{
    task:{
        id: number;
        name: string;
        category: string;
        deadline: string;
        sender: string;
        senderImage: string;
        projectCode: string;}}

const CardTask:React.FC<CardTaskProps> = ({task}) => {
  return (
    <CardLayout key={task.id}>
        <CardCellBox>
            <CardNameParagraph>{task.name}</CardNameParagraph>
            <ProjectCodeSpan>{task.projectCode}</ProjectCodeSpan>
            <CategoryBox category={task.category}>{task.category}</CategoryBox>
        </CardCellBox>
        <DeadlineCellBox>{task.deadline}</DeadlineCellBox>
        <SenderCellBox>
        <SenderInfoBox>
            <SenderAvatar src={task.senderImage} alt={task.sender} />
            <SenderNameSpan>{task.sender}</SenderNameSpan>
        </SenderInfoBox>
        </SenderCellBox>
        <ActionCellBox>
            <ActionButton color="accept">ACCEPT</ActionButton>
            <ActionButton color="reject">REJECT</ActionButton>
        </ActionCellBox>
    </CardLayout>
  )
}

export default CardTask