import React, { useEffect, useState } from 'react'
import { Button, Container, ContainerLayout, DeadLineBox, OverviewApproveBox, OverviewApproveButton, OverviewApproveContent, OverviewApproveHeader, OverviewContent, OverviewContentBox, OverviewCoreBox, OverviewCoreContentBox, OverviewCoreHeader, OverviewCoreImg, OverviewCoreText, OverviewDayText, OverviewHeaderBox, OverviewHeaderText, OverviewInfoBox, OverviewInput, OverviewName, OverviewProfileImg, OverviewSourceText, OverviewTargetText, OverviewText, RadioButton, RadioCol, RadioGroup, RadioText, Text } from './SectionOverview.styled'
import core from '../../assets/Core.png'
import { PRDataType } from '../../Types/pullRequestType';
import ReactMarkdown from 'react-markdown';

interface SectionOverviewProps{
  data:PRDataType|undefined
}

const SectionOverview:React.FC<SectionOverviewProps> = ({data}) => {
  const [dDay, setDDay] = useState(0);
  const [createDate,setCreateDate] = useState(0)  
  console.log(data);

  const formatRelativeDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const differenceInTime = now.getTime() - date.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
    
    if (differenceInDays === 0) return 'today';
    if (differenceInDays === 1) return 'yesterday';
    return `${differenceInDays} days ago`;
  };

  useEffect(() => {
    if (data?.deadline) {
      const formatDeadline = () => {
        const deadline = new Date(data.deadline);
        const today = new Date();
        const differenceInTime = deadline.getTime() - today.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
        setDDay(differenceInDays);
      };

      formatDeadline();
    }
    if (data?.createdDate) {
      const formatCreateDate = () => {
        const createData = new Date(data.createdDate);
        const today = new Date();
        const differenceInTime = createData.getTime() - today.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
        setCreateDate(-differenceInDays);
      }
      formatCreateDate();
    }

  }, []);
  
  return (
    <>
      <ContainerLayout>
        <OverviewHeaderBox>
          <DeadLineBox>D-{dDay}</DeadLineBox>
          <OverviewHeaderText>{data?.title}</OverviewHeaderText>
        </OverviewHeaderBox>
        <OverviewInfoBox>
          <OverviewProfileImg src={data?.writer.writerImg} />
          <OverviewName>{data?.writer.writerId}</OverviewName>
          <OverviewDayText>
            {createDate === 0 ? "today" : `${createDate} days ago`}
          </OverviewDayText>
          <OverviewSourceText>{data?.base}</OverviewSourceText>
          <OverviewText>into</OverviewText>
          <OverviewTargetText>{data?.head}</OverviewTargetText>
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
                <OverviewDayText>{formatRelativeDate(comment.comment.date)}</OverviewDayText>
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
