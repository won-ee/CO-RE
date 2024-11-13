import React from 'react';
import { CommitMessageBox, CommitMessageContent, CommitMessageTitle, Container, Date, DateBox } from './SectionCommits.styled';
import { CommitType } from '../../Types/pullRequestType';

interface SectionCommitsProps {
  commits: CommitType[] | undefined;
}

const SectionCommits: React.FC<SectionCommitsProps> = ({ commits }) => {
  const groupedCommits = commits?.reduce((acc: { [key: string]: CommitType[] }, commit) => {
    const date = commit.date.split("T")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(commit);
    return acc;
  }, {});

  const result = groupedCommits
    ? Object.keys(groupedCommits).map(date => ({
        date,
        commits: groupedCommits[date]
      }))
    : [];

  return (
    <Container>
      {result.map((commitGroup, index) => (
        <div key={commitGroup.commits?.[index]?.id || index}>
          <DateBox>
            <Date>
              {new window.Date(commitGroup.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Date>
          </DateBox>
          {commitGroup.commits.map((commit) => (
            <CommitMessageBox key={commit.id}>
              <CommitMessageTitle>{commit.message}</CommitMessageTitle>
              <CommitMessageContent>
                {new window.Date(commit.date).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </CommitMessageContent>
            </CommitMessageBox>
          ))}
        </div>
      ))}
    </Container>
  );
};

export default SectionCommits;
