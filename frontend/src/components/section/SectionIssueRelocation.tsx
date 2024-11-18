import React, { useState } from 'react';
import { 
    ErrorIcon, 
    ErrorMessageBox, 
    FormLabel, 
    RightSectionLayout,
    SelectInput, 
    SubmitButton 
} from './SectionIssueRelocation.styled';
import { useProjectStore } from '../../store/userStore';
import { useQueryIssueLocationList } from '../../hooks/useIssueList';
import { useMutationIssueLocation } from '../../hooks/useMutationCreatePR';

const SectionIssueRelocation: React.FC = () => {
    const { selectedProjectUserId } = useProjectStore();
    const { data } = useQueryIssueLocationList(selectedProjectUserId);
    const [issueId, setIssueId] = useState(0);
    const [issueName, setIssueName] = useState('');

    const mutation = useMutationIssueLocation();

    const issueList = Array.isArray(data)
        ? data.map((issue) => ({
            issueId: issue.issueId,
            issueTitle: issue.issueTitle,
        }))
        : [];

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIssueId = Number(event.target.value);
        setIssueId(selectedIssueId);

    };

    const handleSubmit = () => {    
        if (selectedProjectUserId && issueId !== 0) {
            mutation.mutate({
                projectUserId: selectedProjectUserId,
                issueId: issueId,
            });
            setIssueId(0);
            setIssueName(''); // 요청 후 issueTitle을 초기화
        }
    };

    return (
        <RightSectionLayout>
            <ErrorMessageBox>
                <ErrorIcon>❗</ErrorIcon>
                이슈 재배치
            </ErrorMessageBox>

            <div>
                <FormLabel>[필수] 재배치 할 이슈를 선택해주세요.</FormLabel>
                <SelectInput value={issueId} onChange={handleChange}>
                    <option value={0}>옵션선택</option>
                    {issueList?.map((issue) => (
                        <option key={issue.issueId} value={issue.issueId}>
                            {issue.issueTitle}
                        </option>
                    ))}
                </SelectInput>
            </div>

            {mutation.isLoading && <div>로딩 중...</div>}
            {mutation.isError && (
                <div style={{ color: 'red' }}>
                    오류 발생
                </div>
            )}
            {mutation.isSuccess && issueName && (
                <div>
                </div>
            )}

            <div style={{ textAlign: 'right', marginRight: '32px' }}>
                <SubmitButton onClick={handleSubmit}>SEND</SubmitButton>
            </div>
        </RightSectionLayout>
    );
};

export default SectionIssueRelocation;
