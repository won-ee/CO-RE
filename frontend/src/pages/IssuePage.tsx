import React, { useState } from 'react'
import SectionErrorInquiry from '../components/section/SectionErrorInquiry'
import { ErrorInquiryButton,RelocationButton, FormContainer, FormWrapper, LeftSection, SelectInput,Line, IssueContainer } from './IssuePage.style'
import SectionIssueRelocation from '../components/section/SectionIssueRelocation';
import SectionIssueList from '../components/section/SectionIssueList';
import TabIssueReassigned from '../components/tab/TabIssueReassigned';

function IssuePage() {
  const [selectSection,setSelectSection] = useState(true)
  
  const handleSelectSection = (prev: boolean) => {
    setSelectSection(prev);
    console.log(prev);
    
  }


  return (
    <>
      <FormContainer>
        <FormWrapper>
          <LeftSection>
            <SelectInput>
              <option>팀 선택</option>
            </SelectInput>
            <ErrorInquiryButton onClick={()=>handleSelectSection(true)} $selectSection={selectSection}>SUPPORT - 오류문의</ErrorInquiryButton>
            <RelocationButton 
              $selectSection={selectSection}
              onClick={()=>handleSelectSection(false)}
              style={{ marginTop: '10px' }}>SUPPORT - 이슈재배치
            </RelocationButton>
          </LeftSection>
          <Line/>
          {selectSection ? <SectionErrorInquiry /> : <SectionIssueRelocation />}
        </FormWrapper>
      </FormContainer>
      <TabIssueReassigned/>
      <IssueContainer>
        <SectionIssueList/>
      </IssueContainer>
    </>
  )
}

export default IssuePage