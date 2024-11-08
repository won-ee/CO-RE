import React, { useState } from 'react'
import TabPullRequest from '../components/tab/TabPullRequest'
import { ContainerLayout } from './PullRequestPageDetail.styled'
import SectionOverview from '../components/section/SectionOverview'
import SectionCommits from '../components/section/SectionCommits'
// import SectionChanges from '../components/section/SectionChanges'
import { useQueryPRDetail } from '../hooks/usePullRequestData'
import { PRDegailParamsType } from '../Types/pullRequestType'

const params: PRDegailParamsType = {
    owner: 'JEM1224',
    repo: 'github-api',
    pullId: 52
};
  
const PullRequestPageDetail:React.FC = () => {
    const [isSeleted, setIsSeleted] = useState('Overview')
    const { data, error, isLoading } = useQueryPRDetail(params);
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

  return (
    <>
        <ContainerLayout>
            <TabPullRequest isSeleted={isSeleted} setIsSeleted={setIsSeleted}/>
            {isSeleted === 'Overview' && <SectionOverview data={data} />}
            {isSeleted === 'Commits' && <SectionCommits data={data?.commits} />}
            {/* {isSeleted === 'Changes' && <SectionChanges />} */}
        </ContainerLayout>   
    </>
    )
}

export default PullRequestPageDetail