import React from "react";
import {
  PullRequestsLayout,
  TableRowItem,
  TableHeaderCell,
  TableDataCell,
  StatusLabel,
  SectionTitleText,
  CommentCountLabel,
  ScrollableTableWrapper,
  StyledTable,
} from "./MainPR.styled";
import { DashPRDataType } from "../../Types/dashboardType";

interface MainPRProps {
  data: DashPRDataType[];
}

const MainPR: React.FC<MainPRProps> = ({ data }) => {
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
            {data.map((item: DashPRDataType) => (
              <TableRowItem key={item.pullRequestId}>
                <TableDataCell>{item.writer.writerId}</TableDataCell>
                <TableDataCell>{item.title}</TableDataCell>
                <TableDataCell>{item.deadline}</TableDataCell>
                <TableDataCell>
                  <CommentCountLabel>{item.commentCount}</CommentCountLabel>
                </TableDataCell>
                <TableDataCell>
                  <StatusLabel
                    $status={
                      item.status === "Approved" ||
                      item.status === "Processing" ||
                      item.status === "Rejected"
                        ? item.status
                        : "Processing"
                    }
                  >
                    {item.status || "Processing"}
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
