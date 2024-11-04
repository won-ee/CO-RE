import React from 'react'
import {  TableLayout, TableRow, TableText, TaskText } from './SectionReassignedTasks.styled'
import CardTask from '../card/CardTask';
import { ContainerLayout, HeaderBox, Icon, SearchContainer, SearchInput } from './SectionIssueList.styled';
import lens from '../../assets/Lens.png'

type Task = {
  id: number;
  name: string;
  projectCode: string;
  category: string;
  deadline: string;
  sender: string;
  senderImage: string;
};

const SectionReassignedTasks:React.FC = () => {
  const tasks: Task[] = [
    { id: 1, name: '프로젝트 테스크01', projectCode: 'S11P315106-2', category: '프로젝트 기획/설계', deadline: 'D-2', sender: 'Brooks', senderImage: 'https://i.pravatar.cc/150?img=1'},
    { id: 2, name: '프로젝트 테스크02', projectCode: 'S11P315106-2', category: '프로젝트 기획/설계', deadline: 'D-4', sender: 'Pearson', senderImage: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: '프로젝트 테스크03', projectCode: 'S11P315106-2', category: '와이어 프레임 제작', deadline: 'D-4', sender: 'Caldwell', senderImage: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: '프로젝트 테스크04', projectCode: 'S11P315106-2', category: '와이어 프레임 제작', deadline: 'D-6', sender: 'Johnston', senderImage: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: '프로젝트 테스크06', projectCode: 'S11P315106-2', category: '아이디어 회의', deadline: 'D-6', sender: 'Cain', senderImage: 'https://i.pravatar.cc/150?img=5' },
    { id: 6, name: '프로젝트 테스크07', projectCode: 'S11P315106-2', category: '아이디어 회의', deadline: 'D-8', sender: 'Murray', senderImage: 'https://i.pravatar.cc/150?img=6' },
  ];
  
  return (
    <>
      <ContainerLayout>
      <HeaderBox>
                <SearchContainer>
                    <SearchInput type="text" placeholder="Search" />
                    <Icon src={lens} alt="search icon" />
                </SearchContainer>
            </HeaderBox>
        <TableLayout>
            <TableRow>
              <TaskText>TASK</TaskText>
              <TableText>DEADLINE</TableText>
              <TableText>SENDER</TableText>
            </TableRow>
            {tasks.map((task) => (
              <CardTask task = {task}/>
            ))}
        </TableLayout>
      </ContainerLayout>
    </>
  )
}

export default SectionReassignedTasks