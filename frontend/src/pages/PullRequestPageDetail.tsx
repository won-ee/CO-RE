import React, { useState } from 'react'
import TabPullRequest from '../components/tab/TabPullRequest'
import { ContainerLayout } from './PullRequestPageDetail.styled'
import SectionOverview from '../components/section/SectionOverview'
import SectionCommits from '../components/section/SectionCommits'
import SectionChanges from '../components/section/SectionChanges'

const PullRequestPageDetail:React.FC = () => {
    const [isSeleted, setIsSeleted] = useState('Overview')

  return (
    <>
        <ContainerLayout>
            <TabPullRequest isSeleted={isSeleted} setIsSeleted={setIsSeleted}/>
            {isSeleted === 'Overview' && <SectionOverview />}
            {isSeleted === 'Commits' && <SectionCommits />}
            {isSeleted === 'Changes' && <SectionChanges />}
        </ContainerLayout>   
    </>
    )
}

export default PullRequestPageDetail