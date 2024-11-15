import CardIssue from "../card/CardIssue";
import {
  ContainerLayout,
  HeaderBox,
  Icon,
  SearchContainer,
  SearchInput,
} from "./SectionIssueList.styled";
import lens from "../../assets/Lens.png";
import { useQueryIssueList } from "../../hooks/useIssueList";
import { useProjectStore } from "../../store/userStore";

const SectionIssueList:React.FC = () => {
  const {selectedProjectId} = useProjectStore();
  
  const {data} = useQueryIssueList(selectedProjectId);
  console.log(data);
  
  const tasks = [
      //issueContent      /     issueKey     /    issueTitle    /      issueStatus      /    issuePriority
      { name: '프로젝트 테스트01', id: 'S11P315106-2', title: '프로젝트 기획/설계', status: 'In Progress', priority: 'high' },
      { name: '프로젝트 테스트02', id: 'S11P315106-2', title: '프로젝트 기획/설계', status: 'In Progress', priority: 'high' },
      { name: '프로젝트 테스트03', id: 'S11P315106-2', title: '와이어프레임 제작', status: 'To Do', priority: 'low' },
      { name: '프로젝트 테스트04', id: 'S11P315106-2', title: '와이어프레임 제작', status: 'To Do', priority: 'high' },
      { name: '프로젝트 테스트05', id: 'S11P315106-2', title: '아이디어 회의', status: 'DONE', priority: 'middle' },
  ];

  return (
    <ContainerLayout>
      <HeaderBox>
        <SearchContainer>
          <SearchInput type="text" placeholder="Search" />
          <Icon src={lens} alt="search icon" />
        </SearchContainer>
      </HeaderBox>
      {tasks.map((task, index) => (
        <CardIssue key={index} task={task} index={index} />
      ))}
    </ContainerLayout>
  );
};

export default SectionIssueList;
