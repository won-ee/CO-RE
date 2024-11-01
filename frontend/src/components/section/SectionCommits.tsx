import React from 'react'
import { CommitMessageBox, CommitMessageContent, CommitMessageTitle, Container, DateBox } from './SectionCommits.styled';

interface Commit {
  title: string;
  content: string;
}

interface CommitHistoryProps {
  date: string;
  commits: Commit[];
}

const sectionsData: CommitHistoryProps[] = [
  {
    date: 'Oct 15, 2024',
    commits: [
      {
        title: 'Frontend',
        content: "Merge branch 'fe/feature/S11P21C205-386-fe-사용자-추천-피드-api-연결' into 'frontend'",
      },
      {
        title: 'Hotfix',
        content: "Merge branch 'fe/feature/S11P21C205-356' into 'frontend'",
      },
    ],
  },
  {
    date: 'Oct 13, 2024',
    commits: [
      {
        title: '무한스크롤 수정',
        content: "Merge branch 'fe/feature/S11P21C205-386-fe-사용자-추천-피드-api-연결' into 'frontend'",
      },
      {
        title: '여행 계획 마커 지도에 찍히게 만듦',
        content: "Merge branch 'fe/feature/S11P21C205-386-fe-사용자-추천-피드-api-연결' into 'frontend'",
      },
      {
        title: '페이지네이션 오류 수정',
        content: "Merge branch 'fe/feature/S11P21C205-386-fe-사용자-추천-피드-api-연결' into 'frontend'",
      },
      {
        title: '메인페이지 수정',
        content: "Merge branch 'fe/feature/S11P21C205-386-fe-사용자-추천-피드-api-연결' into 'frontend'",
      },
    ],
  },
];


const SectionCommits:React.FC = () => {
  return (
    <>
      <Container>
        {sectionsData.map((section, index) => (
          <div key={index}>
            <DateBox>
              <Date>{section.date}</Date>
            </DateBox>
            {section.commits.map((commit, idx) => (
              <CommitMessageBox>
                <CommitMessageTitle key={idx}>{commit.title}</CommitMessageTitle>
                <CommitMessageContent key={idx}>{commit.content}</CommitMessageContent>
              </CommitMessageBox>
            ))}
          </div>
        ))}
    </Container>
    </>
  )
}

export default SectionCommits