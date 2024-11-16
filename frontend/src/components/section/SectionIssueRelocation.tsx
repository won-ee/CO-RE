import React from 'react';
import { 
    ErrorIcon, 
    ErrorMessageBox, 
    FormLabel, 
    RightSectionLayout,
    SelectInput, 
    SubmitButton 
} from './SectionIssueRelocation.styled';
import { useProjectStore, useUserStore } from '../../store/userStore';
import { useQueryIssueList } from '../../hooks/useIssueList';

const SectionIssueRelocation:React.FC = () => {
    const { selectedProjectId } = useProjectStore();
    const { data } = useQueryIssueList(selectedProjectId);

    const issueList = data?.map((issue) => ({
      issueId: issue.issueId,
      issueTitle: issue.issueTitle,
    }));

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
                {issueList?.map((issue) => (
                  <option key={issue.issueId} value={issue.issueId}>
                    {issue.issueTitle}
                  </option>
                ))}
            </SelectInput>
        </div>
        <div style={{ textAlign: 'right', marginRight: '32px' }}>
            <SubmitButton>SEND</SubmitButton>
        </div>
    </RightSectionLayout>
  );
}

export default SectionIssueRelocation;
