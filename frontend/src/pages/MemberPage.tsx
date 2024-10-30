import React from 'react'
import { ContainerLayout } from './MemberPage.styled'
import CardMember from '../components/card/CardMember';

const MemberPage:React.FC = () => {
    const profiles = [
        { image: 'https://i.pravatar.cc/150?img=1', name: 'Lily French', title: 'Strategist', email: 'lucienne.herman@hotmail.com' },
        { image: 'https://i.pravatar.cc/150?img=2', name: 'Lily French', title: 'Strategist', email: 'lucienne.herman@hotmail.com' },
        { image: 'https://i.pravatar.cc/150?img=3', name: 'Lily French', title: 'Strategist', email: 'lucienne.herman@hotmail.com' },
        { image: 'https://i.pravatar.cc/150?img=4', name: 'Lily French', title: 'Strategist', email: 'lucienne.herman@hotmail.com' },
        { image: 'https://i.pravatar.cc/150?img=5', name: 'Lily French', title: 'Strategist', email: 'lucienne.herman@hotmail.com' },
        { image: 'https://i.pravatar.cc/150?img=6', name: 'Lily French', title: 'Strategist', email: 'lucienne.herman@hotmail.com' },
        { image: 'https://i.pravatar.cc/150?img=7', name: 'Lily French', title: 'Strategist', email: 'lucienne.herman@hotmail.com' },
        { image: 'https://i.pravatar.cc/150?img=8', name: 'Lily French', title: 'Strategist', email: 'lucienne.herman@hotmail.com' },
        { image: 'https://i.pravatar.cc/150?img=9', name: 'Lily French', title: 'Strategist', email: 'lucienne.herman@hotmail.com' },
        { image: 'https://i.pravatar.cc/150?img=10', name: 'Lily French', title: 'Strategist', email: 'lucienne.herman@hotmail.com' },
        { image: 'https://i.pravatar.cc/150?img=11', name: 'Lily French', title: 'Strategist', email: 'lucienne.herman@hotmail.com' },
        { image: 'https://i.pravatar.cc/150?img=12', name: 'Lily French', title: 'Strategist', email: 'lucienne.herman@hotmail.com' },
        { image: 'https://i.pravatar.cc/150?img=13', name: 'Lily French', title: 'Strategist', email: 'lucienne.herman@hotmail.com' },
        { image: 'https://i.pravatar.cc/150?img=14', name: 'Lily French', title: 'Strategist', email: 'lucienne.herman@hotmail.com' },
        { image: 'https://i.pravatar.cc/150?img=15', name: 'Lily French', title: 'Strategist', email: 'lucienne.herman@hotmail.com' },
      ];
  return (
    <>
        <ContainerLayout>
            {profiles.map((profile, index) => (
            <CardMember
                key={index}
                profile={profile}
            />
            ))}
        </ContainerLayout>
    </>
    )
}

export default MemberPage