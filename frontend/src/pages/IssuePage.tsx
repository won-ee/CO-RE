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
import { useProjectStore } from "../store/userStore";
import { useQueryAllProject } from "../hooks/useIssueList";

const IssuePage: React.FC = () => {
  const { selectedGroupId, selectedProjectId } = useProjectStore();
  const [isErrorInquirySelected, setIsErrorInquirySelected] = useState(true);
  const [isIssueSelected, setIsIssueSelected] = useState(true);
  const [selectedPrId, setSelectedPrId] = useState<number>(0);
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");
  const { data: allProject } = useQueryAllProject(selectedGroupId);

  const differentProjects = allProject?.filter(
    (project) => project.id !== selectedProjectId
  );

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedProjectData = differentProjects?.find(project => project.key === selectedValue);
    if (selectedProjectData) {
      setSelectedPrId(selectedProjectData.id);
      setSelectedTeamId(selectedProjectData.key);
    }
  };

  return (
    <>
      <IssueLayout>
        <FormContainerBox>
          <FormWrapperBox>
            <LeftSectionBox>
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
              {isErrorInquirySelected && (
                <SelectInput value={selectedTeamId} onChange={handleTeamChange}>
                  <option value="">팀 선택</option>
                  {differentProjects?.map((project) => (
                    <option key={project.id} value={project.key}>
                      {project.name}
                    </option>
                  ))}
                </SelectInput>
              )}
            </LeftSectionBox>
            <DividerLine />
            {isErrorInquirySelected ? (
              <SectionErrorInquiry selectedTeamId={selectedTeamId} setSelectedTeamId={setSelectedTeamId} selectedProjectId={selectedPrId} />
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
