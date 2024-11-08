import React, { useEffect, useState } from 'react'
import { Button, Container, ContainerLayout, DeadLineBox, OverviewApproveBox, OverviewApproveButton, OverviewApproveContent, OverviewApproveHeader, OverviewContent, OverviewContentBox, OverviewCoreBox, OverviewCoreContentBox, OverviewCoreHeader, OverviewCoreImg, OverviewCoreText, OverviewDayText, OverviewHeaderBox, OverviewHeaderText, OverviewInfoBox, OverviewInput, OverviewName, OverviewProfileImg, OverviewSourceText, OverviewTargetText, OverviewText, RadioButton, RadioCol, RadioGroup, RadioText, Text } from './SectionOverview.styled'
import core from '../../assets/Core.png'
import { PRDataType } from '../../Types/pullRequestType';
interface SectionOverviewProps{
  data:PRDataType|undefined
}

const SectionOverview:React.FC<SectionOverviewProps> = ({data}) => {
  const [dDay, setDDay] = useState(0);
  const [createDate,setCreateDate] = useState(0)

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
          <OverviewProfileImg src={data?.writerImg} />
          <OverviewName>{data?.writerId}</OverviewName>
          <OverviewDayText>{createDate}days ago</OverviewDayText>
          <OverviewSourceText>{data?.base}</OverviewSourceText>
          <OverviewText>into</OverviewText>
          <OverviewTargetText>{data?.head}</OverviewTargetText>
        </OverviewInfoBox>
        <OverviewContentBox>
          <OverviewContent>
            This commit includes 2 main features with a total of 10 changes.
            <br />
            Main Feature
            <br />
            1. Refactored authentication service to improve token validation
            efficiency.
            <br />
            2. Added caching mechanism for frequently accessed user data to
            reduce database load.
            <br />
            3. Updated user interface to enhance accessibility for visually
            impaired users.
            <br />
            4. Implemented a new logging system for better error tracking and
            monitoring in production.
            <br />
            5. Optimized API response time by streamlining data serialization
            and reducing payload size.
            <br />
            Sub Feature
            <br />
            1. Fixed minor bug in password reset flow that caused invalid tokens
            to be accepted.
            <br />
            2. Added input validation for user registration forms to prevent
            injection attacks.
            <br />
            3. Improved error messages for failed login attempts to provide more
            helpful feedback to users.
            <br />
            4. Updated localization files to support new languages (Spanish and
            French).
            <br />
            5. Enhanced front-end performance by lazy loading images and
            deferring non-critical scripts.
            <br />
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
          <OverviewApproveHeader>
            <OverviewProfileImg src="https://i.pravatar.cc/150?img=1" />
            <OverviewName>Brooks</OverviewName>
            <OverviewDayText>3days ago</OverviewDayText>
            <OverviewApproveButton>Approved</OverviewApproveButton>
          </OverviewApproveHeader>
          <OverviewApproveContent>
            You did Great Job!
            <br />
            like your Componenet style and effieciency of Algorithm
          </OverviewApproveContent>
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
