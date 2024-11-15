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
import highestIcon from "../../assets/highest.png";
import highIcon from "../../assets/high.png";
import middleIcon from "../../assets/middle.png";
import lowIcon from "../../assets/low.png";
import lowestIcon from "../../assets/lowest.png";

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
                <CommentCountLabel>
                  <img
                    src={
                      issue.issuePriority === 1
                        ? highestIcon
                        : issue.issuePriority === 2
                          ? highIcon
                          : issue.issuePriority === 3
                            ? middleIcon
                            : issue.issuePriority === 4
                              ? lowIcon
                              : lowestIcon
                    }
                    alt={
                      issue.issuePriority === 1
                        ? "Highest"
                        : issue.issuePriority === 2
                          ? "High"
                          : issue.issuePriority === 3
                            ? "Middle"
                            : issue.issuePriority === 4
                              ? "Low"
                              : "Lowest"
                    }
                  />
                </CommentCountLabel>
              </IssueStatusWrapper>
            </IssueItem>
          ))}
        </IssuesListContainer>
      </IssueInfoSection>
    </MainIssueLayout>
  );
};

export default MainIssue;
