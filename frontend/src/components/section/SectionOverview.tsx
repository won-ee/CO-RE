import React from 'react'
import { Button, Container, ContainerLayout, DeadLineBox, OverviewApproveBox, OverviewApproveButton, OverviewApproveContent, OverviewApproveHeader, OverviewContent, OverviewContentBox, OverviewCoreBox, OverviewCoreContentBox, OverviewCoreHeader, OverviewCoreImg, OverviewCoreText, OverviewDayText, OverviewHeaderBox, OverviewHeaderText, OverviewInfoBox, OverviewInput, OverviewName, OverviewProfileImg, OverviewSourceText, OverviewTargetText, OverviewText, RadioButton, RadioCol, RadioGroup, RadioText, Text } from './SectionOverview.styled'
import core from '../../assets/Core.png'
import { PRDataType } from '../../Types/pullRequestType';
import ReactMarkdown from 'react-markdown';
import useDateDiff from '../../hooks/useDateDiff';
import { differenceInDays } from 'date-fns'

interface SectionOverviewProps{
  data:PRDataType|undefined
}

const SectionOverview:React.FC<SectionOverviewProps> = ({data}) => {
  const dafeDiff = useDateDiff(data?.createdDate,"")

  const deadlineDate = data?.deadline ? new Date(data.deadline) : new Date();
  const today = new Date();
  const dayDifference = differenceInDays(deadlineDate, today);
  const deadlineText = dayDifference > 0 ? `D-${dayDifference}` : `D-day`;

  return (
    <>
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
        <OverviewInput placeholder="Write a comment" />
        <Container>
          <Text>Code-Review</Text>
          <RadioGroup>
            <RadioCol>
              <RadioText>-2</RadioText>
              <RadioButton name="rating" value="-2" />
            </RadioCol>
            <RadioCol>
              <RadioText>-1</RadioText>
              <RadioButton name="rating" value="-1" />
            </RadioCol>
            <RadioCol>
              <RadioText>&nbsp;0</RadioText>
              <RadioButton name="rating" value="0" defaultChecked />
            </RadioCol>
            <RadioCol>
              <RadioText>+1</RadioText>
              <RadioButton name="rating" value="+1" />
            </RadioCol>
            <RadioCol>
              <RadioText>+2</RadioText>
              <RadioButton name="rating" value="+2" />
            </RadioCol>
          </RadioGroup>
          <Text>Looks good to me, approved!</Text>
          <Button $approve={"approve"}>Approve</Button>
          <Button>Reject</Button>
        </Container>
      </ContainerLayout>
    </>
  );
};

export default SectionOverview;
