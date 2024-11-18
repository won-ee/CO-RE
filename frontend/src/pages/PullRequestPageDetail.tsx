import React, { useState, useEffect } from 'react'
import TabPullRequest from '../components/tab/TabPullRequest'
import { ContainerLayout, TabBox } from './PullRequestPageDetail.styled'
import SectionOverview from '../components/section/SectionOverview'
import SectionCommits from '../components/section/SectionCommits'
import SectionChanges from '../components/section/SectionChanges'
import { useQueryPRDetail } from '../hooks/usePullRequestData'
import { PRDetailParamsType, ReviewType, TotalReviewsType } from '../Types/pullRequestType'
import LoadingPage from './LoadingPage'
import NotFoundPage from './NotFoundPage'
import { useProjectStore } from '../store/userStore'
import { useParams } from 'react-router-dom'
import { useQueryChangeList, useQueryCommitList } from '../hooks/usePullRequestData'
import { useMutationpostPRReview } from '../hooks/useMutationCreatePR'
import ButtonSimpleSquare from '../components/buttons/ButtonSimpleSquare'
import CardFinalCodeReview from '../components/card/CardFinalCodeReview'
  
const PullRequestPageDetail:React.FC = () => {
    const [isSeleted, setIsSeleted] = useState('Overview')
    const { selectedOwner, selectedRepo} = useProjectStore()
    const { pullRequestId } = useParams<{ pullRequestId: string }>();
    const [reviews,setReviews] = useState<ReviewType[]>([])
    const [body,setBody] = useState<string>('')
    const event = "COMMENT"


    const params: PRDetailParamsType = {
        owner: selectedOwner,
        repo: selectedRepo,
        pullId: Number(pullRequestId),
    };
    
    const { data, error, isLoading, refetch } = useQueryPRDetail(params);
    const commitParams = {
        owner: selectedOwner,
        repo : selectedRepo,
        base: data?.base || "", // undefined일 경우 빈 문자열로 대체
        head: data?.head || "", // undefined일 경우 빈 문자열로 대체
      }

    const changesData = useQueryChangeList(commitParams)
    const commitData = useQueryCommitList(commitParams)
    const mutationpostPRReview = useMutationpostPRReview()
    const [isFinalReviewOpen,setIsFinalReviewOpen] = useState(false)





    const handleUpdateComments = (updatedReviews: ReviewType[]) => {
        setReviews(updatedReviews);
      };


    
    const handleFinishReview = ()=>{
    const TotalReview : TotalReviewsType ={
        body,
        event,
        reviews,
    }
    mutationpostPRReview.mutate({
        owner:selectedOwner,
        repo: selectedRepo,
        pullId: Number(pullRequestId),
        reviewData:TotalReview
    },
    {
        onSuccess: () => {
            refetch(); // 성공 시 최신 데이터 다시 가져오기
        },
        onError: () => {
            console.log('에러 메세지 :',error?.message);
            console.log('오너 :',selectedOwner);
            console.log('레포 :',selectedRepo);
            console.log('아이디 :',Number(pullRequestId));
            console.log('리뷰데이터 :',TotalReview);
            
        },
    })
    }

    useEffect(()=>{
        handleFinishReview(); // API 호출
      },[body])

    const handleAddReview = (content: string) => {
        setBody(content); // content를 body로 설정     
    };

    const handlesIsFinalReviewOpen = ()=>{
        setIsFinalReviewOpen((isFinalReviewOpen)=>!isFinalReviewOpen)
      }
    if (isLoading) return <LoadingPage/>;
    if (error) return <NotFoundPage errorNumber={404}/>;
  return (
    <>
        <ContainerLayout>
            <TabBox>
            <TabPullRequest isSeleted={isSeleted} setIsSeleted={setIsSeleted}/>
            {reviews.length>0 && 
            <div style={{position:'relative'}}>
            <ButtonSimpleSquare $text="Finish Review" $color="white" $bgc="#1C8139" btnEvent={handlesIsFinalReviewOpen}/>
            {isFinalReviewOpen && <CardFinalCodeReview onAdd={handleAddReview} commentNums={reviews.length}/>}
            </div>}
            </TabBox>
            {isSeleted === 'Overview' && <SectionOverview data={data} refetch={refetch}/>}
            {isSeleted === 'Commits' && <SectionCommits commits={commitData.data || [] } />}
            {isSeleted === 'Changes' && <SectionChanges changes={changesData.data || []} onUpdateReviews={handleUpdateComments} reviewData={data?.reviews ?? []}/>}
        </ContainerLayout>   
    </>
    )
}

export default PullRequestPageDetail