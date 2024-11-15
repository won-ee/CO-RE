import React, { useState } from 'react'
import TabPullRequest from '../components/tab/TabPullRequest'
import { ContainerLayout } from './PullRequestPageDetail.styled'
import SectionOverview from '../components/section/SectionOverview'
import SectionCommits from '../components/section/SectionCommits'
// import SectionChanges from '../components/section/SectionChanges'
import { useQueryPRDetail } from '../hooks/usePullRequestData'
import { PRDetailParamsType } from '../Types/pullRequestType'
import LoadingPage from './LoadingPage'
import NotFoundPage from './NotFoundPage'
import { useProjectStore } from '../store/userStore'
import { useParams } from 'react-router-dom'


  
const PullRequestPageDetail:React.FC = () => {
    const [isSeleted, setIsSeleted] = useState('Overview')
    const { selectedOwner, selectedRepo} = useProjectStore()
    const { pullRequestId } = useParams<{ pullRequestId: string }>();

    const params: PRDetailParamsType = {
        // owner: selectedOwner,
        // repo: selectedRepo,
        pullId: Number(pullRequestId),
        owner:"JEM1224",
        repo:"github-api",
    };
    

    const { data, error, isLoading } = useQueryPRDetail(params);
    if (isLoading) return <LoadingPage/>;
    if (error) return <NotFoundPage errorNumber={404}/>;

  return (
    <>
        <ContainerLayout>
            <TabPullRequest isSeleted={isSeleted} setIsSeleted={setIsSeleted}/>
            {isSeleted === 'Overview' && <SectionOverview data={data} />}
            {isSeleted === 'Commits' && <SectionCommits commits={data?.commits} />}
            {/* {isSeleted === 'Changes' && <SectionChanges />} */}
        </ContainerLayout>   
    </>
    )
}

export default PullRequestPageDetail