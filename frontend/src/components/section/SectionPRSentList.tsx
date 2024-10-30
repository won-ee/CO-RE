import { SectionPRSentListLayout,FilterLayout, GridTable , GridHeader, GridHeaderCell, GridRow, GridCell,CommentBox,StatusBox } from './SectionPRSentList.styled'

const data = [
  { col1: 'Frame Adjusement', col2: 'Frame into frontend', col3: 'D-1', col4: 'Row 1 Col 4', col5: '5', col6: 'HIGH', col7: 'Approved' },
  { col1: 'Row 2 Col 1', col2: 'Row 2 Col 2', col3: 'Row 2 Col 3', col4: 'Row 2 Col 4', col5: '21', col6: 'MIDDLE', col7: 'Processing' },
  { col1: 'Row 3 Col 1', col2: 'Row 3 Col 2', col3: 'Row 3 Col 3', col4: 'Row 3 Col 4', col5: '3', col6: 'LOW', col7: 'Rejected' },
];

function SectionPRSentList() {
  return (
    <SectionPRSentListLayout>
      <FilterLayout>
        {/* 필터 UI가 필요하면 여기에 추가 */}
      </FilterLayout>

      {/* CSS Grid로 구현된 테이블 구조 */}
      <GridTable>
        {/* Header */}
        <GridHeader>
          <GridHeaderCell>TITLE</GridHeaderCell>
          <GridHeaderCell>MERGE PATH</GridHeaderCell>
          <GridHeaderCell align="center">DEADLINE</GridHeaderCell>
          <GridHeaderCell>ASSIGNED</GridHeaderCell>
          <GridHeaderCell align="center">COMMENT</GridHeaderCell>
          <GridHeaderCell align="center">PRIORITY</GridHeaderCell>
          <GridHeaderCell align="center">STATUS</GridHeaderCell>
        </GridHeader>

        {/* Body (Rows) */}        {data.map((row, index) => (
          <GridRow key={index}>
            <GridCell>{row.col1}</GridCell>
            <GridCell>{row.col2}</GridCell>
            <GridCell align="center">{row.col3}</GridCell>
            <GridCell>{row.col4}</GridCell>
            <GridCell align="center">
              <CommentBox>{row.col5}</CommentBox>
            </GridCell>
            <GridCell align="center">
              {row.col6}
              </GridCell>
            <GridCell align="center">
              <StatusBox status={row.col7}>{row.col7}</StatusBox>
              </GridCell>
          </GridRow>
        ))}
      </GridTable>
    </SectionPRSentListLayout>
  );
}

export default SectionPRSentList;