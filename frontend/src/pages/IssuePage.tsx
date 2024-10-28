import React, { useState } from 'react';
import SectionErrorInquiry from '../components/section/SectionErrorInquiry';
import {
  ErrorInquiryButton,
  RelocationButton,
  FormContainerLayout,
  FormWrapperBox,
  LeftSectionBox,
  SelectInput,
  DividerLine,
  IssueContainerBox,
} from './IssuePage.style';
import SectionIssueRelocation from '../components/section/SectionIssueRelocation';
import SectionIssueList from '../components/section/SectionIssueList';
import TabIssueReassigned from '../components/tab/TabIssueReassigned';

function IssuePage() {
  const [isErrorInquirySelected, setIsErrorInquirySelected] = useState(true);

  const handleSelectSection = (isErrorSelected: boolean) => {
    setIsErrorInquirySelected(isErrorSelected);
    console.log(isErrorSelected);
  };

  return (
    <>
      <FormContainerLayout>
        <FormWrapperBox>
          <LeftSectionBox>
            <SelectInput>
              <option>팀 선택</option>
            </SelectInput>
            <ErrorInquiryButton
              onClick={() => handleSelectSection(true)}
              $isErrorInquirySelected={isErrorInquirySelected}
            >
              SUPPORT - 오류문의
            </ErrorInquiryButton>
            <RelocationButton
              $isErrorInquirySelected={!isErrorInquirySelected}
              onClick={() => handleSelectSection(false)}
              style={{ marginTop: '10px' }}
            >
              SUPPORT - 이슈재배치
            </RelocationButton>
          </LeftSectionBox>
          <DividerLine />
          {isErrorInquirySelected ? <SectionErrorInquiry /> : <SectionIssueRelocation />}
        </FormWrapperBox>
      </FormContainerLayout>
      <TabIssueReassigned />
      <IssueContainerBox>
        <SectionIssueList />
      </IssueContainerBox>
    </>
  );
}

export default IssuePage;
