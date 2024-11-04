import React, { useState } from 'react';
import SectionErrorInquiry from '../components/section/SectionErrorInquiry';
import {
  ErrorInquiryButton,
  RelocationButton,
  FormContainerBox,
  FormWrapperBox,
  LeftSectionBox,
  SelectInput,
  DividerLine,
  IssueContainerBox,
  IssueLayout,
  TabBox,
  IssueListText,
  ReassignedTasksText,
} from './IssuePage.styled';
import SectionIssueRelocation from '../components/section/SectionIssueRelocation';
import SectionIssueList from '../components/section/SectionIssueList';
import SectionReassignedTasks from '../components/section/SectionReassignedTasks';
import { Block } from '../styles/GlobalStyled';

const IssuePage:React.FC=()=>{
  const [isErrorInquirySelected, setIsErrorInquirySelected] = useState(true);
  const [isIssueSelected,setIsIssueSelected] =useState(true)

  return (
    <>
      <IssueLayout>
        <FormContainerBox>
          <FormWrapperBox>
            <LeftSectionBox>
              <SelectInput>
                <option>팀 선택</option>
              </SelectInput>
              <ErrorInquiryButton
                onClick={() => setIsErrorInquirySelected(true)}
                $isErrorInquirySelected={isErrorInquirySelected}
                >
                SUPPORT - 오류문의
              </ErrorInquiryButton>
              <RelocationButton
                $isErrorInquirySelected={!isErrorInquirySelected}
                onClick={() => setIsErrorInquirySelected(false)}
                style={{ marginTop: '10px' }}
                >
                SUPPORT - 이슈재배치
              </RelocationButton>
            </LeftSectionBox>
            <DividerLine />
            {isErrorInquirySelected ? <SectionErrorInquiry /> : <SectionIssueRelocation />}
          </FormWrapperBox>
        </FormContainerBox>
        <TabBox>
          <IssueListText $isIssueSelected={isIssueSelected} onClick={() => setIsIssueSelected(true)}>IssueList</IssueListText>
          <ReassignedTasksText $isIssueSelected={isIssueSelected} onClick={() => setIsIssueSelected(false)}>ReassignedTasks</ReassignedTasksText>
        </TabBox>
        <IssueContainerBox>
          {isIssueSelected ? <SectionIssueList /> : <SectionReassignedTasks/>}
        </IssueContainerBox>
      </IssueLayout>
      <Block/>

    </>
  );
}

export default IssuePage;
