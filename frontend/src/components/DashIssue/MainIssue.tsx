import React from "react";
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

import { DashIssueType } from "../../Types/dashboardType";

interface MainIssueProps {
  data: DashIssueType[] | undefined;
}

const MainIssue: React.FC<MainIssueProps> = ({ data }) => {
  return (
    <MainIssueLayout>
      <IssueInfoSection>
        <SectionTitleText>Issue Info</SectionTitleText>
        <IssuesListContainer>
          {data?.map((issue, index) => (
            <IssueItem key={index}>
              <IssueDetailsWrapper>
                <IssueIcon src={greenIcon} alt="Issue Icon" />
                <IssueTextWrapper>
                  <IssueNameLabel>{issue.issueTitle}</IssueNameLabel>
                  <IssueIDLabel>{issue.issueKey}</IssueIDLabel>
                </IssueTextWrapper>
              </IssueDetailsWrapper>
              <IssueStatusWrapper>
                <IssueStatusLabel $status={issue.issueStatus}>
                  {issue.issueStatus.replace("-", " ")}
                </IssueStatusLabel>
                <CommentCountLabel>{issue.issuePriority}</CommentCountLabel>
              </IssueStatusWrapper>
            </IssueItem>
          ))}
        </IssuesListContainer>
      </IssueInfoSection>
    </MainIssueLayout>
  );
};

export default MainIssue;
