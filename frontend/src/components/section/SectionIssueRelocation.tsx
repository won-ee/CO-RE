import React from 'react';
import { 
    ErrorIcon, 
    ErrorMessageBox, 
    FormLabel, 
    RightSectionLayout,
    SelectInput, 
    SubmitButton 
} from './SectionIssueRelocation.styled';

const SectionIssueRelocation:React.FC = () => {
  return (
    <RightSectionLayout> 
        <ErrorMessageBox>
            <ErrorIcon>❗</ErrorIcon>
            이슈 재배치
        </ErrorMessageBox>
        <div>
            <FormLabel>[필수] 재배치 할 이슈를 선택해주세요.</FormLabel>
            <SelectInput>
                <option>옵션선택</option>
            </SelectInput>
        </div>
        <div style={{ textAlign: 'right', marginRight: '32px' }}>
            <SubmitButton>SEND</SubmitButton>
        </div>
    </RightSectionLayout>
  );
}

export default SectionIssueRelocation;
