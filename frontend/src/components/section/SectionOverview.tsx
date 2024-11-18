import React, { useState, ChangeEvent } from 'react'
import { Button, Container, ContainerLayout, DeadLineBox, OverviewApproveBox, OverviewApproveButton, OverviewApproveContent, OverviewApproveHeader, OverviewContent, OverviewContentBox, OverviewCoreBox, OverviewCoreContentBox, OverviewCoreHeader, OverviewCoreImg, OverviewCoreText, OverviewDayText, OverviewHeaderBox, OverviewHeaderText, OverviewInfoBox, OverviewInput, OverviewName, OverviewProfileImg, OverviewSourceText, OverviewTargetText, OverviewText, RadioButton, RadioCol, RadioGroup, RadioText, Text } from './SectionOverview.styled'
import core from '../../assets/Core.png'
import { PRDataType } from '../../Types/pullRequestType';
import ReactMarkdown from 'react-markdown';
import useDateDiff from '../../hooks/useDateDiff';
import { differenceInDays } from 'date-fns'
import { useMutationReviewComment } from '../../hooks/useMutationCreatePR';
import { useProjectStore } from '../../store/userStore';
import LoadingPage from '../../pages/LoadingPage';

interface SectionOverviewProps{
  data:PRDataType|undefined
}

const SectionOverview:React.FC<SectionOverviewProps> = ({data}) => {
  const [postLoading, setPostLoading] = useState(false)
  const [body, setBody] = useState<string>("")
  const [rating,setRating] = useState<number>(0);
  const [status,setStatus] = useState<boolean>(false);
  const projectInfo = useProjectStore();
  const dafeDiff = useDateDiff(data?.createdDate,"")
  const mutationComment = useMutationReviewComment()
  const deadlineDate = data?.deadline ? new Date(data.deadline) : new Date();
  const today = new Date();
  const dayDifference = differenceInDays(deadlineDate, today);
  const deadlineText = dayDifference > 0 ? `D-${dayDifference}` : `D-day`;

  const handlePostComment = ()=>{
    setPostLoading(true);
    const commentData = {
      content: body,
      score: rating,
      status: status,
    }
    const mutationData = {
      owner: projectInfo.selectedOwner,
      repo: projectInfo.selectedRepo,
      pullId: data?.pullRequestId || 0,
      commentData :commentData
    }
    mutationComment.mutate(mutationData,{
      onSuccess:()=>{
        setPostLoading(false)
      },
      onError: ()=>{
        setPostLoading(false)
      }
    })
  }

  const handleCommentbody = (e:ChangeEvent<HTMLTextAreaElement>)=>{
    setBody(e.target.value)
  }

  const handleRating = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setRating(Number(e.target.value))
  }

  const handleStatus = (e:boolean)=>{
    setStatus(e);
    handlePostComment()
  }
  return (
    postLoading ? 
    <LoadingPage/>
    :
      <ContainerLayout>
        <OverviewHeaderBox>
          <DeadLineBox $status={deadlineText} $afterReview={data?.afterReview}>{deadlineText}</DeadLineBox>
          <OverviewHeaderText>{data?.title}</OverviewHeaderText>
        </OverviewHeaderBox>
        <OverviewInfoBox>
          <OverviewProfileImg src={data?.writer.writerImg} />
          <OverviewName>{data?.writer.writerId}</OverviewName>
          <OverviewDayText>
            {dafeDiff}
          </OverviewDayText>
          <OverviewSourceText>{data?.head}</OverviewSourceText>
          <OverviewText>into</OverviewText>
          <OverviewTargetText>{data?.base}</OverviewTargetText>
        </OverviewInfoBox>
        <OverviewContentBox>
          <OverviewContent>
            <ReactMarkdown>{data?.description}</ReactMarkdown>
          </OverviewContent>
        </OverviewContentBox>
        <OverviewCoreBox>
          <OverviewCoreImg src={core} />
          <OverviewCoreContentBox>
            <OverviewCoreHeader>Summarized by CO:RE</OverviewCoreHeader>
            <OverviewCoreText>
              {data?.summary}
            </OverviewCoreText>
          </OverviewCoreContentBox>
        </OverviewCoreBox>
        <OverviewApproveBox>
        {data?.comments.map((comment) => (
          <div key={comment.writer.writerId}>
            <OverviewApproveHeader>
              <OverviewProfileImg src={comment.writer.writerImg} />
              <OverviewName>{comment.writer.writerId}</OverviewName>
              <OverviewApproveButton $status={comment.comment.status}>
               {comment.comment.status === true ? "approve" : `reject`}
              </OverviewApproveButton>
            </OverviewApproveHeader>
            <OverviewApproveContent>
            {comment.comment.content}
            </OverviewApproveContent>
          </div>
        ))}

        </OverviewApproveBox>
        <OverviewInput placeholder="Write a comment" onChange={handleCommentbody}/>
        <Container>
          <Text>Code-Review</Text>
          <RadioGroup>
            <RadioCol>
              <RadioText>-2</RadioText>
              <RadioButton name="rating" value="-2" onChange={handleRating}/>
            </RadioCol>
            <RadioCol>
              <RadioText>-1</RadioText>
              <RadioButton name="rating" value="-1" onChange={handleRating}/>
            </RadioCol>
            <RadioCol>
              <RadioText>&nbsp;0</RadioText>
              <RadioButton name="rating" value="0" defaultChecked onChange={handleRating}/>
            </RadioCol>
            <RadioCol>
              <RadioText>+1</RadioText>
              <RadioButton name="rating" value="+1" onChange={handleRating}/>
            </RadioCol>
            <RadioCol>
              <RadioText>+2</RadioText>
              <RadioButton name="rating" value="+2" onChange={handleRating}/>
            </RadioCol>
          </RadioGroup>
          <Text>Looks good to me, approved!</Text>
          <Button $approve={"approve"} onClick={()=>handleStatus(true)}>Approve</Button>
          <Button onClick={()=>handleStatus(false)}>Reject</Button>
        </Container>
      </ContainerLayout>
  );
};

export default SectionOverview;
