import { useQueryPRList } from '../../hooks/usePullRequestData';
import { useProjectStore } from '../../store/userStore';
import { SectionPRSentListLayout,FilterLayout, GridTable , GridHeader, GridHeaderCell, GridRow, GridCell,CommentBox,StatusBox,PriorityBox, DeadLineBox, TitleBox} from './SectionPRSentList.styled'
import { differenceInDays } from 'date-fns'

// const data = [
//   { col1: 'Frame Adjusement', col2: 'Frame into frontend', col3: 'D-1', col4: 'IMAGES', col5: '5', col6: 'HIGH', col7: 'Approved' },
//   { col1: 'Sound Add', col2: 'Adjustment into frontend', col3: 'D-2', col4: 'IMAGES', col5: '21', col6: 'MIDDLE', col7: 'Processing' },
//   { col1: 'Schedule Page total Direct & Create', col2: 'Row 3 Col 2', col3: 'After Review', col4: 'IMAGES', col5: '3', col6: 'LOW', col7: 'Rejected' },
// ];

function SectionPRSentList() {
  const projectInfo = useProjectStore((state)=>state);
  const params = {
    // owner: 'JEM1224',
    // repo: 'github-api',
    owner : projectInfo.selectedOwner,
    repo : projectInfo.selectedRepo,
    state : 'sent'
  }
  const {data,error,isLoading} = useQueryPRList(params)
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
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

        {/* Body (Rows) */}        
        {data && data.map((row, index) => {
          const deadlineDate = new Date(row.deadline);
          const today = new Date();
          const dayDifference = differenceInDays(deadlineDate, today);
          const deadlineText = dayDifference > 0 ? `D-${dayDifference}` : `D-day`;
 

        return(

          <GridRow key={index}>
            <GridCell>
              <TitleBox>{row.title}</TitleBox>
              </GridCell>
            <GridCell>{row.head} into {row.base}</GridCell>
            <GridCell align="center">
              <DeadLineBox status={deadlineText} afterReview={row.afterReview}>{deadlineText}</DeadLineBox>
              </GridCell>
            <GridCell>{row.reviewers.map((reviewers,index)=>(
              <img src={reviewers.writerImg} key={index}/>
            ))}</GridCell>
            <GridCell align="center">
              <CommentBox status={String(row.commentCount)}>{row.commentCount}</CommentBox>
            </GridCell>
            <GridCell align="center">
              <PriorityBox status={row.priority}>{row.priority.toUpperCase()}</PriorityBox>
              </GridCell>
            <GridCell align="center">
              <StatusBox status={row.status}>{row.status.charAt(0).toUpperCase() + row.status.slice(1)}</StatusBox>
              </GridCell>
          </GridRow>
        )
        })}
      </GridTable>
    </SectionPRSentListLayout>
  );
}

export default SectionPRSentList;