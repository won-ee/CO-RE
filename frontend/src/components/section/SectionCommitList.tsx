import React from 'react';
import { CommitMessageBox, CommitMessageContent, CommitMessageTitle, Container, Date, DateBox } from './SectionCommits.styled';
import { useQueryCommitList } from '../../hooks/usePullRequestData';
import { CommitListType } from '../../Types/pullRequestType';

interface SectionCommitListProps{
  owner:string;
  repo:string;
  base:string;
  head:string;
}

const SectionCommitList: React.FC<SectionCommitListProps> = ({owner,repo,base,head}) => {
  const params = {
    owner: owner,
    repo: repo,
    base: base,
    head: head,
  }
  const {data,error,isLoading} = useQueryCommitList(params)
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  const groupedCommits = data?.reduce((acc: { [key: string]: CommitListType[] }, commit) => {
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
        <div key={commitGroup.commits?.[index]?.date || index}>
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

export default SectionCommitList;
