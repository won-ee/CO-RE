import React, { useEffect, useState } from "react";
import {
  PullRequestsLayout,
  TableWrapper,
  TableRowItem,
  TableHeaderCell,
  TableDataCell,
  StatusLabel,
  SectionTitleText,
  CommentCountLabel,
} from "./MainPR.styled";
import styled from "styled-components";

type StatusType = "Approved" | "Processing" | "Rejected";

interface PullRequest {
  NAME: string;
  MESSAGE: string;
  DEADLINE: string;
  COMMENT: number;
  STATUS: StatusType;
}

const ScrollableTableWrapper = styled.div`
  max-height: 90px;
  overflow-y: auto;
  display: block;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const StyledTable = styled(TableWrapper)`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
`;

const parseDeadline = (deadline: string): number => {
  return parseInt(deadline.replace("D-", ""), 10);
};

const MainPR: React.FC = () => {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);

  useEffect(() => {
    fetch("/DashboardPR.json")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort(
          (a: PullRequest, b: PullRequest) =>
            parseDeadline(a.DEADLINE) - parseDeadline(b.DEADLINE),
        );
        setPullRequests(sortedData);
      })
      .catch((error) => console.error("Error fetching pull requests:", error));
  }, []);

  return (
    <PullRequestsLayout>
      <SectionTitleText>Pull Requests</SectionTitleText>
      <StyledTable>
        <thead>
          <TableRowItem>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Message</TableHeaderCell>
            <TableHeaderCell>Deadline</TableHeaderCell>
            <TableHeaderCell>Comment</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRowItem>
        </thead>
      </StyledTable>
      <ScrollableTableWrapper>
        <StyledTable>
          <tbody>
            {pullRequests.map((request, index) => (
              <TableRowItem key={index}>
                <TableDataCell>{request.NAME}</TableDataCell>
                <TableDataCell>{request.MESSAGE}</TableDataCell>
                <TableDataCell>{request.DEADLINE}</TableDataCell>
                <TableDataCell>
                  <CommentCountLabel>{request.COMMENT}</CommentCountLabel>
                </TableDataCell>
                <TableDataCell>
                  <StatusLabel $status={request.STATUS}>
                    {request.STATUS}
                  </StatusLabel>
                </TableDataCell>
              </TableRowItem>
            ))}
          </tbody>
        </StyledTable>
      </ScrollableTableWrapper>
    </PullRequestsLayout>
  );
};

export default MainPR;
