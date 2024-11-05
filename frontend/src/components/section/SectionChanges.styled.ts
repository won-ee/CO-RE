import styled from 'styled-components';

export const ChangeCard = styled.div`
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  background-color: #fafbfc;
  margin: 16px 0;
  padding: 16px;
  font-family: 'Courier New', Courier, monospace;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const StatusBadge = styled.span<{ status: string }>`
  font-size: 0.875em;
  padding: 2px 6px;
  color: white;
  background-color: ${({ status }) =>
    status === 'modified' ? '#0366d6' : status === 'added' ? '#28a745' : '#d73a49'};
  border-radius: 2px;
  text-transform: uppercase;
`;

export const FileInfo = styled.div`
  font-size: 0.875em;
  color: #586069;
  margin-bottom: 12px;
`;

export const PatchContent = styled.div`
  font-family: 'Courier New', Courier, monospace;
`;

export const LineContainer = styled.div<{ className?: string }>`
  display: flex;
  align-items: center;
  padding: 2px 0;
  cursor: pointer;
  background-color: ${({ className }) =>
    className === 'add' ? '#e6ffed' : className === 'remove' ? '#ffeef0' : 'transparent'};
  &:hover {
    background-color: #ebedf0;
  }
`;

export const LineNumber = styled.div`
  width: 40px;
  text-align: right;
  color: #6a737d;
  padding-right: 10px;
  font-size: 0.875em;
  user-select: none;
`;

export const LineContent = styled.div`
  flex: 1;
  padding: 2px 5px;
  font-size: 0.875em;
  color: #24292e;
  
`;

export const CollapsedLinesContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f1f8ff;
  border-left: 2px solid #0366d6;
  /* padding-left: 10px; */
  /* margin-left: 50px; */
`;
