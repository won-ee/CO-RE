import React from 'react'
import { ContainerLayout, Email, Image, Name, Title } from './CardMember.styled';

interface CardMemberProps{
    profile: {
        image: string;
        name: string;
        title: string;
        email: string;
    }
}

const CardMember:React.FC<CardMemberProps> = ({profile}) => {
  return (
    <>
        <ContainerLayout>
            <Image src={profile.image} alt={profile.name} />
            <Name>{profile.name}</Name>
            <Title>{profile.title}</Title>
            <Email>{profile.email}</Email>
        </ContainerLayout>
    </>

)
}

export default CardMember