import React from 'react'
import { ContainerLayout, Email, Image, Name, Title } from './CardMember.styled';
import { ProjectMemberType } from '../../Types/userType';

interface CardMemberProps{
    member: ProjectMemberType
}

const CardMember:React.FC<CardMemberProps> = ({member}) => {
  return (
    <>
        <ContainerLayout>
            <Image src={member.userUrl} alt={member.userName} />
            <Name>{member.userNickName}</Name>
            <Title>{member.userName}</Title>
            <Email>{member.userEmail}</Email>
        </ContainerLayout>
    </>

)
}

export default CardMember 