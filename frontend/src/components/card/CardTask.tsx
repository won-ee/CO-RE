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
import { IssueLocationType } from '../../Types/IssueType'
import { useMutationAcceptIssueLocation } from '../../hooks/useMutationCreatePR'
import { useProjectStore } from '../../store/userStore'

interface CardTaskProps{
    task:IssueLocationType
}

const CardTask:React.FC<CardTaskProps> = ({task}) => {
    const { selectedProjectUserId } = useProjectStore();
    const mutation = useMutationAcceptIssueLocation();    

    console.log(task);
    
    const handleSubmit =()=>{
        mutation.mutate({
            projectUserId: selectedProjectUserId,
            carrotId: task.id,
        });
    }
  return (
    <CardLayout key={task.id}>
        <CardCellBox>
            <CardNameParagraph>{task.name}</CardNameParagraph>
            <ProjectCodeSpan>{task.key}</ProjectCodeSpan>
            <CategoryBox category={task.epicName}>{task.epicName}</CategoryBox>
        </CardCellBox>
        <DeadlineCellBox>{task?.deadLine?.substring(0,10)}</DeadlineCellBox>
        <SenderCellBox>
        <SenderInfoBox>
            <SenderAvatar src={task.senderImage} alt={task.senderName} />
            <SenderNameSpan>{task.senderName}</SenderNameSpan>
        </SenderInfoBox>
        </SenderCellBox>
        <ActionCellBox>
            <ActionButton color="accept" onClick={handleSubmit}>ACCEPT</ActionButton>
        </ActionCellBox>
    </CardLayout>
  )
}

export default CardTask