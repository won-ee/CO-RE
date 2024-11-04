import React from 'react'
import { Button, Container, ContainerLayout, DeadLineBox, OverviewApproveBox, OverviewApproveButton, OverviewApproveContent, OverviewApproveHeader, OverviewContent, OverviewContentBox, OverviewCoreBox, OverviewCoreContentBox, OverviewCoreHeader, OverviewCoreImg, OverviewCoreText, OverviewDayText, OverviewHeaderBox, OverviewHeaderText, OverviewInfoBox, OverviewInput, OverviewName, OverviewProfileImg, OverviewSourceText, OverviewTargetText, OverviewText, RadioButton, RadioCol, RadioGroup, RadioText, Text } from './SectionOverview.styled'
import core from '../../assets/Core.png'
const SectionOverview:React.FC = () => {
  return (
    <>
      <ContainerLayout>
        <OverviewHeaderBox>
          <DeadLineBox>D-1</DeadLineBox>
          <OverviewHeaderText>Frame Adjustment</OverviewHeaderText>
        </OverviewHeaderBox>
        <OverviewInfoBox>
          <OverviewProfileImg src="https://i.pravatar.cc/150?img=1" />
          <OverviewName>Brooks</OverviewName>
          <OverviewDayText>3days ago</OverviewDayText>
          <OverviewSourceText>Frame</OverviewSourceText>
          <OverviewText>into</OverviewText>
          <OverviewTargetText>frontend</OverviewTargetText>
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
              This commit includes optimizations in authentication, caching, API
              performance, and accessibility improvements.
              <br />
              It also introduces better error logging, bug fixes in password
              reset, input validation, and new language support.
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
