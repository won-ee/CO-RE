import styled from "styled-components";

interface IssueStatusLabelProps {
  $status: "In Progress" | "To Do";
}

export const MainIssueLayout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const IssueInfoSection = styled.div`
  width: 37%;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

export const IssuesListContainer = styled.div`
  max-height: 125px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 10px;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const IssueItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eaeaea;
  margin-top: -5px;
`;

export const IssueDetailsWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

export const IssueIcon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 50%;
`;

export const IssueTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const IssueNameLabel = styled.span`
  font-weight: bold;
  font-size: 16px;
`;

export const IssueIDLabel = styled.span`
  color: #777;
  font-size: 12px;
`;

export const IssueStatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const IssueStatusLabel = styled.span<IssueStatusLabelProps>`
  background: ${(props) =>
    props.$status === "In Progress"
      ? "rgba(98, 38, 239, 0.2)"
      : "rgba(32, 42, 48, 0.2)"};
  color: ${(props) =>
    props.$status === "In Progress" ? "#6226EF" : "#202A30"};
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
`;

export const SectionTitleText = styled.h3`
  margin-top: 5px;
  font-size: 22px;
  font-weight: bold;
`;
