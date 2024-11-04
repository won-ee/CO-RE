import React from 'react';
import CardIssue from '../card/CardIssue'; 
import { ContainerLayout, HeaderBox, Icon, SearchContainer, SearchInput } from './SectionIssueList.styled';
import lens from '../../assets/Lens.png'

const SectionIssueList:React.FC = () => {
    const tasks = [
        { name: '프로젝트 테스트01', id: 'S11P315106-2', title: '프로젝트 기획/설계', status: 'In Progress', comment: '4', priority: 'high' },
        { name: '프로젝트 테스트02', id: 'S11P315106-2', title: '프로젝트 기획/설계', status: 'In Progress', comment: '4', priority: 'high' },
        { name: '프로젝트 테스트03', id: 'S11P315106-2', title: '와이어프레임 제작', status: 'To Do', comment: '4', priority: 'low' },
        { name: '프로젝트 테스트04', id: 'S11P315106-2', title: '와이어프레임 제작', status: 'To Do', comment: '4', priority: 'high' },
        { name: '프로젝트 테스트05', id: 'S11P315106-2', title: '아이디어 회의', status: 'DONE', comment: '4', priority: 'middle' },
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
                <CardIssue key={task.id} task={task} index={index} />
            ))}
        </ContainerLayout>
    );
};

export default SectionIssueList;
