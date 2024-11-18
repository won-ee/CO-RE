import React from 'react';
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
        } from './CardTask.styled';
import { IssueLocationType } from '../../Types/IssueType';

interface CardTaskProps {
    task: IssueLocationType;
    handleSubmit: (taskId: number) => void;
    status:string;
}

const CardTask: React.FC<CardTaskProps> = ({ task, handleSubmit,status }) => {
    
  return (
    <CardLayout key={task.id}>
        <CardCellBox>
            <CardNameParagraph>{task.name}</CardNameParagraph>
            <ProjectCodeSpan>{task.key}</ProjectCodeSpan>
            <CategoryBox status={status}>{task.epicName}</CategoryBox>
        </CardCellBox>
        <DeadlineCellBox>{task?.deadLine?.substring(0, 10)}</DeadlineCellBox>
        <SenderCellBox>
            <SenderInfoBox>
                <SenderAvatar src={task.senderImage} alt={task.senderName} />
                <SenderNameSpan>{task.senderName}</SenderNameSpan>
            </SenderInfoBox>
        </SenderCellBox>
        <ActionCellBox>
            <ActionButton color="accept" onClick={() => handleSubmit(task.id)}>ACCEPT</ActionButton>
        </ActionCellBox>
    </CardLayout>
  );
}

export default CardTask;
