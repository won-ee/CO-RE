import React from 'react'
import { ErrorIcon, ErrorMessage, FormLabel, FormRow, RightSection, SelectInput, SubmitButton, TextInput } from './SectionErrorInquiry.styled'

const SectionErrorInquiry = () => {
  return (
    <>
      <RightSection>
            <ErrorMessage>
              <ErrorIcon>❗</ErrorIcon>
              시스템에 오류가 있어요
            </ErrorMessage>

            <FormRow> 
              <div>
                <FormLabel>[필수] 우선도를 알려주세요</FormLabel>
                <SelectInput>
                  <option>옵션선택</option>
                </SelectInput>
              </div>
              <div style={{marginRight: '45px'}}>
                <FormLabel>[필수] 마감일자를 선택해주세요</FormLabel>
                <SelectInput>
                  <option>옵션선택</option>
                </SelectInput>
              </div>
            </FormRow>

            <div>
              <FormLabel>[선택] 내용을 입력해 주세요</FormLabel>
              <TextInput rows={4} />
            </div>

            <div style={{ textAlign: 'right', marginRight:'32px' }}>
              <SubmitButton>SEND</SubmitButton>
            </div>
          </RightSection>
    </>
  )
}

export default SectionErrorInquiry