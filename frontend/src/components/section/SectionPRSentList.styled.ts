import styled from 'styled-components';

interface GridCellProps {
    align?: 'left' | 'center'; // 정렬 방식 지정 (left 또는 center)
  }
interface StringProps {
    status:string;
}
// Section과 Filter 레이아웃
export const SectionPRSentListLayout = styled.div`
`;

export const FilterLayout = styled.div`
  margin-bottom: 20px;
`;

// Grid 테이블 구성
export const GridTable = styled.div`
  display: grid;
  grid-template-columns: 17.5% 17.5% 10% 15% 10% 15% 15%; /* 각 열의 너비를 설정 */
  width: 100%;
  background-color: white;
  border-radius: 14px;
  border: 0.3px solid #B9B9B9;
  font-size: 14px;
`;

// Header
export const GridHeader = styled.div`
  display: contents;
  
`;

export const GridHeaderCell = styled.div<GridCellProps>`
  padding: 15px 41px;
  font-weight: bold;
  /* border-bottom: 0.6px solid #B9B9B9; //헤더 가로선 */
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.align ? props.align : 'left')};
  box-sizing: border-box;
`;

// Row와 Cell
export const GridRow = styled.div`
  display: contents;
`;

export const GridCell = styled.div<GridCellProps>`
  padding: 20px 41px;
  border-top: 0.6px solid #B9B9B9;
  display: flex;
  justify-content: ${(props) => (props.align === 'center' ? 'center' : 'flex-start')}; /* 수평 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  text-align: ${(props) => (props.align ? props.align : 'left')};
`;
export const CommentBox = styled.div`
  background-color: #D9D9D9;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
  text-align: center;
  border-radius: 100%;
`
export const StatusBox = styled.div<StringProps>`
  width: 93px;
  height: 27px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 4px;
  background-color: ${(props) => {
  switch (props.status) {
    case 'Approved':
      return '#CCF0EB'; 
    case 'Processing':
      return '#E0D4FC'; 
    case 'Rejected':
      return '#FCD7D4'; 
    default:
      return 'white'; // 기본 배경색
  }
  }};
  color: ${(props) => {
  switch (props.status) {
    case 'Approved':
      return '#00B69B'; 
    case 'Processing':
      return '#6226EF'; 
    case 'Rejected':
      return '#EF3826'; 
    default:
      return 'white'; // 기본 배경색
  }
  }};
`
export const PriorityBox = styled.div<StringProps>`
  width: 93px;
  height: 27px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 4px;
  color: white;
  background-color: ${(props) => {
  switch (props.status) {
    case 'HIGH':
      return '#FF0000'; 
    case 'MIDDLE':
      return '#67C658'; 
    case 'LOW':
      return '#78C7FF'; 
    default:
      return 'white'; // 기본 배경색
  }
  }};
`
export const DeadLineBox = styled.div<StringProps>`
  font-weight: bold;
  white-space: nowrap;
  color: ${(props)=>(props.status=="After Review" ? '#723CF1': parseInt(props.status.replace('D-',''),10) < 2 ? 'red':'black')};
`
export const TitleBox = styled.div`
  font-weight: bold;
`