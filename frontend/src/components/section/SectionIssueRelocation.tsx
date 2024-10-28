import React from 'react'
import { ErrorIcon, ErrorMessage, FormLabel, RightSection, SelectInput, SubmitButton } from './SectionIssueRelocation.styled'

const SectionIssueRelocation = () => {
  return (
    <>
        <RightSection>
        <ErrorMessage>
            <ErrorIcon>❗</ErrorIcon>
            이슈 재배치
        </ErrorMessage>

        <div>
            <FormLabel>[필수] 재배치 할 이슈를 선택해주세요.</FormLabel>
            <SelectInput>
                <option>옵션선택</option>
            </SelectInput>
        </div>
        <div style={{marginRight: '45px'}}>
            <FormLabel>[필수] 재배치 할 팀원을 선택해주세요.</FormLabel>
            <SelectInput>
                <option>옵션선택</option>
            </SelectInput>
        </div>
        <div style={{ textAlign: 'right', marginRight:'32px' }}>
            <SubmitButton>SEND</SubmitButton>
        </div>
        </RightSection>
    </>
    )
}

export default SectionIssueRelocation