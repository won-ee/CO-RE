import React from 'react';
import { useQueryPRList } from '../../hooks/usePullRequestData';
import { useProjectStore } from '../../store/userStore';
import { SectionPRSentListLayout,FilterLayout, GridTable , GridHeader, GridHeaderCell, GridRow, GridCell,CommentBox,StatusBox,PriorityBox, DeadLineBox, TitleBox, ReviewerImg, ImgBox} from './SectionPRSentList.styled'
import { differenceInDays } from 'date-fns'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

function SectionPRSentList(): React.ReactElement {
  const projectInfo = useProjectStore((state)=>state);
  const navigate = useNavigate();
  const params = {
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
          <GridHeaderCell $align="center">DEADLINE</GridHeaderCell>
          <GridHeaderCell>ASSIGNED</GridHeaderCell>
          <GridHeaderCell $align="center">COMMENT</GridHeaderCell>
          <GridHeaderCell $align="center">PRIORITY</GridHeaderCell>
          <GridHeaderCell $align="center">STATUS</GridHeaderCell>
        </GridHeader>

        {/* Body (Rows) */}        
        {data && data.map((row, index) => {
          const deadlineDate = new Date(row.deadline);
          const today = new Date();
          const dayDifference = differenceInDays(deadlineDate, today);
          const deadlineText = dayDifference > 0 ? `D-${dayDifference}` : `D-day`;
 

        return(

          <GridRow key={index} onClick={()=>navigate(`/pullrequest/${row.pullRequestId}`)} style={{cursor:'pointer'}}>
            <GridCell>
              <TitleBox>{row.title}</TitleBox>
              <TitleBox>{row.pullRequestId}</TitleBox>
              </GridCell>
            <GridCell>{row.head} into {row.base}</GridCell>
            <GridCell $align="center">
              <DeadLineBox $status={deadlineText} $afterReview={row.afterReview}>{deadlineText}</DeadLineBox>
              </GridCell>
            <GridCell>
              <ImgBox>{row.reviewers.slice(0, 3).map((reviewer, index) => (
                <ReviewerImg src={reviewer.writerImg} key={index} />))}
                {row.reviewers.length > 3 && <HiOutlineDotsHorizontal style={{zIndex:10, marginLeft:'6px'}}/>}
              </ImgBox>
              </GridCell>
            <GridCell $align="center">
              <CommentBox $status={String(row.commentCount)}>{row.commentCount}</CommentBox>
            </GridCell>
            <GridCell $align="center">
              <PriorityBox $status={row.priority}>{row.priority.toUpperCase()}</PriorityBox>
              </GridCell>
            <GridCell $align="center">
              <StatusBox $status={row.status}>{row.status.charAt(0).toUpperCase() + row.status.slice(1)}</StatusBox>
              </GridCell>
          </GridRow>
        )
        })}
      </GridTable>
    </SectionPRSentListLayout>
  );
}

export default SectionPRSentList;