import React from 'react';
import { IssueLocationType } from '../../Types/IssueType';
import taskImg from '../../assets/task.png'; 
import { ActionButton, ActionCellBox, SenderAvatar, SenderCellBox, SenderInfoBox, SenderNameSpan, TaskContainerLayout, TaskIdText, TaskImage, TaskItemBox, TaskNameBox, TaskNameText, TaskStatusBox, TaskTitleBox } from './CardTask.styled';

interface CardTaskProps {
    task: IssueLocationType;
    handleSubmit: (taskId: number) => void;
    status: string;
}

const CardTask: React.FC<CardTaskProps> = ({ task, handleSubmit, status }) => {
    const epicName = task.epicName || "NO EPIC";
    const taskStatusColor = status || "rgba(169, 169, 169, 1)";

    const calculateDday = (deadLine: string | undefined): string => {
        if (!deadLine) return "No Deadline";

        const today = new Date();
        const targetDate = new Date(deadLine);
        const diffTime = targetDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        return diffDays >= 0 ? `D - ${diffDays}` : `D + ${Math.abs(diffDays)}`; 
    };

    return (
        <>
            <TaskContainerLayout> 
                <TaskItemBox key={task.id}> 
                    <TaskNameBox>
                        <TaskImage src={taskImg} alt="" />
                        <TaskNameText>{task.name}</TaskNameText> 
                    </TaskNameBox>
                    <TaskIdText>{task.key}</TaskIdText>
                    <TaskTitleBox status={taskStatusColor}>
                        {epicName}
                    </TaskTitleBox>
                    <TaskStatusBox>
                        {calculateDday(task?.deadLine?.substring(0, 10))}
                    </TaskStatusBox>

                    <SenderCellBox>
                        <SenderInfoBox>
                            <SenderAvatar src={task.senderImage} alt={task.senderName} />
                            <SenderNameSpan>{task.senderName}</SenderNameSpan>
                        </SenderInfoBox>
                    </SenderCellBox>
                
                    <ActionCellBox>
                        <ActionButton onClick={() => handleSubmit(task.id)}>ACCEPT</ActionButton>
                    </ActionCellBox>
                </TaskItemBox>
            </TaskContainerLayout>
        </>
    );
}

export default CardTask;
