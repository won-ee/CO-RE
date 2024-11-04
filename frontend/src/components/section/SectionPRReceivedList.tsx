import { SectionPRSentListLayout,FilterLayout, GridTable , GridHeader, GridHeaderCell, GridRow, GridCell,CommentBox,StatusBox,PriorityBox, DeadLineBox, TitleBox} from './SectionPRReceivedList.styled'

const data = [
  { col1: 'Frame Adjusement', col2: 'Frame into frontend', col3: 'D-1', col4: 'IMAGES', col5: '5', col6: 'HIGH', col7: 'Approved' },
  { col1: 'Sound Add', col2: 'Adjustment into frontend', col3: 'D-2', col4: 'IMAGES', col5: '', col6: 'MIDDLE', col7: 'Processing' },
  { col1: 'Schedule Page total Direct & Create', col2: 'Row 3 Col 2', col3: 'After Review', col4: 'IMAGES', col5: '3', col6: 'LOW', col7: 'Rejected' },
];

function SectionPRReceivedList() {
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
          <GridHeaderCell>SENDER</GridHeaderCell>
          <GridHeaderCell align="center">COMMENT</GridHeaderCell>
          <GridHeaderCell align="center">PRIORITY</GridHeaderCell>
          <GridHeaderCell align="center">STATUS</GridHeaderCell>
        </GridHeader>

        {/* Body (Rows) */}        {data.map((row, index) => (
          <GridRow key={index}>
            <GridCell>
              <TitleBox>{row.col1}</TitleBox>
              </GridCell>
            <GridCell>{row.col2}</GridCell>
            <GridCell align="center">
              <DeadLineBox status={row.col3}>{row.col3}</DeadLineBox>
              </GridCell>
            <GridCell>{row.col4}</GridCell>
            <GridCell align="center">
              <CommentBox status={row.col5}>{row.col5}</CommentBox>
            </GridCell>
            <GridCell align="center">
              <PriorityBox status={row.col6}>{row.col6}</PriorityBox>
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

export default SectionPRReceivedList;