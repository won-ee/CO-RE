import React from 'react';
import { CommitMessageBox, CommitMessageContent, CommitMessageTitle, Container, Date, DateBox } from './SectionCommits.styled';
import { CommitListType } from '../../Types/pullRequestType';

interface SectionCommitsProps {
  commits: CommitListType[] | undefined;
}

const SectionCommits: React.FC<SectionCommitsProps> = ({ commits }) => {
  const groupedCommits = commits?.reduce((acc: { [key: string]: CommitListType[] }, commit) => {
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
      {result.map((commitGroup) => (
        <div key={commitGroup.date}>
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
            <CommitMessageBox key={commit.date}>
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
