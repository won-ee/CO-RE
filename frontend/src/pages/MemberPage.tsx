import React from 'react'
import { ContainerLayout } from './MemberPage.styled'
import CardMember from '../components/card/CardMember';
import { useMemberList } from '../hooks/useUser';
import { useProjectStore } from '../store/userStore';

const MemberPage:React.FC = () => {
    const {selectedProjectId} = useProjectStore();
    const {data} = useMemberList(selectedProjectId)
  return (
    <>
        <ContainerLayout>
            {data?.map((member, index) => (
            <CardMember
                key={index}
                member={member}
            />
            ))}
        </ContainerLayout>
    </>
    )
}

export default MemberPage