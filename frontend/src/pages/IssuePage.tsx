import SectionErrorInquiry from "../components/section/SectionErrorInquiry";
import { useState } from "react";
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
} from "./IssuePage.styled";
import SectionIssueRelocation from "../components/section/SectionIssueRelocation";
import SectionIssueList from "../components/section/SectionIssueList";
import SectionReassignedTasks from "../components/section/SectionReassignedTasks";
import { Block } from "../styles/GlobalStyled";
import { useProjectStore, useUserStore } from "../store/userStore";
import { useQueryAllProject } from "../hooks/useIssueList";

const IssuePage: React.FC = () => {
  const { selectedGroupId } = useProjectStore();
  const [isErrorInquirySelected, setIsErrorInquirySelected] = useState(true);
  const [isIssueSelected, setIsIssueSelected] = useState(true);
  const [selectedTeamId, setSelectedTeamId] = useState<string>(""); 
  const { userInfo } = useUserStore();
  const { data: allProject } = useQueryAllProject(selectedGroupId);

  const differentProjects = allProject?.filter(
    (project) =>
      userInfo && !userInfo.projects.some((userProject) => userProject.id === project.id)
  );

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeamId(event.target.value);    
  };
  
  return (
    <>
      <IssueLayout>
        <FormContainerBox>
          <FormWrapperBox>
            <LeftSectionBox>
              <SelectInput value={selectedTeamId} onChange={handleTeamChange}>
                <option value="">팀 선택</option>
                {differentProjects?.map((project) => (
                  <option key={project.id} value={project.key}>
                    {project.name}
                  </option>
                ))}
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
                style={{ marginTop: "10px" }}
              >
                SUPPORT - 이슈재배치
              </RelocationButton>
            </LeftSectionBox>
            <DividerLine />
            {isErrorInquirySelected ? (
              <SectionErrorInquiry selectedTeamId={selectedTeamId} setSelectedTeamId={setSelectedTeamId} />
            ) : (
              <SectionIssueRelocation />
            )}
          </FormWrapperBox>
        </FormContainerBox>
        <TabBox>
          <IssueListText
            $isIssueSelected={isIssueSelected}
            onClick={() => setIsIssueSelected(true)}
          >
            IssueList
          </IssueListText>
          <ReassignedTasksText
            $isIssueSelected={isIssueSelected}
            onClick={() => setIsIssueSelected(false)}
          >
            ReassignedTasks
          </ReassignedTasksText>
        </TabBox>
        <IssueContainerBox>
          {isIssueSelected ? <SectionIssueList /> : <SectionReassignedTasks />}
        </IssueContainerBox>
      </IssueLayout>
      <Block />
    </>
  );
};

export default IssuePage;
