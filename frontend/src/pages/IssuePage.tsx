import React from 'react'
import SectionErrorInquiry from '../components/SectionErrorInquiry'
import { Button, FormContainer, FormWrapper, LeftSection, SelectInput,Line } from './IssuePage.style'

function IssuePage() {
  return (
    <>
      <FormContainer>
        <FormWrapper>
          <LeftSection>
            <SelectInput>
              <option>팀 선택</option>
            </SelectInput>
            <Button>SUPPORT - 오류문의</Button>
            <Button style={{ marginTop: '10px' }}>SUPPORT - 이슈재배치</Button>
          </LeftSection>
          <Line/>
          <SectionErrorInquiry/>
        </FormWrapper>
      </FormContainer>
    </>
  )
}

export default IssuePage