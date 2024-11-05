import styled from 'styled-components';

export const ChangeCard = styled.div`
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  background-color: #fafbfc;
  margin: 16px 0;
  font-size: 14px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  padding: 10px 25px;
  background-color: #F6F8FA;
  border-radius: 5px;
  border: 1px solid #807F7F;
`;

export const HeaderToggle = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`
export const VectorImg = styled.img<{ isExpanded: boolean }>`
  transform: ${({ isExpanded }) => (isExpanded ? 'rotate(-90deg)' : 'rotate(0deg)')};
  filter: grayscale(100%) brightness(0.5);
  width: 14px;
  height: 8px;
`
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
