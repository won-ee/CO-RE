import React, { useEffect, useState } from "react";
import {
  IssueInfoSection,
  IssueItem,
  IssueDetailsWrapper,
  IssueIcon,
  IssueTextWrapper,
  IssueNameLabel,
  IssueIDLabel,
  IssueStatusWrapper,
  IssueStatusLabel,
  CommentCountLabel,
  SectionTitleText,
  IssuesListContainer,
  MainIssueLayout,
} from "./MainIssue.styled";

import greenIcon from "../../assets/DashboardIssueIcon.png";

interface IssueData {
  NAME: string;
  ID: string;
  STATUS: "In Progress" | "To Do";
  COMMENTS: number;
}

const MainIssue: React.FC = () => {
  const [issues, setIssues] = useState<IssueData[]>([]);

  useEffect(() => {
    fetch("/DashboardIssue.json")
      .then((response) => response.json())
      .then((data) => setIssues(data))
      .catch((error) => console.error("Error loading issues:", error));
  }, []);

  return (
    <MainIssueLayout>
      <IssueInfoSection>
        <SectionTitleText>Issue Info</SectionTitleText>
        <IssuesListContainer>
          {issues.map((issue, index) => (
            <IssueItem key={index}>
              <IssueDetailsWrapper>
                <IssueIcon src={greenIcon} alt="Issue Icon" />
                <IssueTextWrapper>
                  <IssueNameLabel>{issue.NAME}</IssueNameLabel>
                  <IssueIDLabel>{issue.ID}</IssueIDLabel>
                </IssueTextWrapper>
              </IssueDetailsWrapper>
              <IssueStatusWrapper>
                <IssueStatusLabel $status={issue.STATUS}>
                  {issue.STATUS.replace("-", " ")}
                </IssueStatusLabel>
                <CommentCountLabel>{issue.COMMENTS}</CommentCountLabel>
              </IssueStatusWrapper>
            </IssueItem>
          ))}
        </IssuesListContainer>
      </IssueInfoSection>
    </MainIssueLayout>
  );
};

export default MainIssue;
