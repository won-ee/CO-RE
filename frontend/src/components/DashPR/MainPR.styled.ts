import styled from "styled-components";

interface StatusLabelProps {
  $status: "Approved" | "Processing" | "Rejected";
}

export const PullRequestsLayout = styled.div`
  width: 52%;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 20px;
  height: 270px;
`;

export const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 10px;
`;

export const TableRowItem = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

export const TableHeaderCell = styled.th`
  background-color: #f3f6fa;
  text-align: center;
  padding: 15px;
  font-weight: bold;
  border-bottom: 1px solid #dee2e6;
  font-size: 14px;
  vertical-align: middle;
`;

export const TableDataCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid #dee2e6;
  font-size: 14px;
  text-align: center;
  vertical-align: middle;
`;

export const StatusLabel = styled.span<StatusLabelProps>`
  background: ${(props) =>
    props.$status === "Approved"
      ? "rgba(0, 182, 155, 0.2)"
      : props.$status === "Processing"
        ? "rgba(98, 38, 239, 0.2)"
        : "rgba(239, 56, 38, 0.2)"};
  color: ${(props) =>
    props.$status === "Approved"
      ? "#00B69B"
      : props.$status === "Processing"
        ? "#6226EF"
        : "#EF3826"};
  padding: 5px 10px;
  border-radius: 4.5px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 25px;
  min-width: 100px;
  box-sizing: border-box;
`;

export const CommentCountLabel = styled.span`
  background: #e0e0e0;
  color: #333;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
  margin-left: 30px;
`;

export const ResetButtonBox = styled.button`
  background: none;
  color: #ff6347;
  border: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const SectionTitleText = styled.h3`
  margin-top: 5px;
  font-size: 22px;
  font-weight: bold;
`;

export const ScrollableTableWrapper = styled.div`
  max-height: 180px;
  overflow-y: auto;
  display: block;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const StyledTable = styled(TableWrapper)`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
`;
