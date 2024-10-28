import React from 'react'
import { HeaderLayout, IssueListText, ReassignedTasksText } from './TabIssueReassigned.styled'

const TabIssueReassigned = () => {
  return (
    <>
      <HeaderLayout>
        <IssueListText>IssueList</IssueListText>
        <ReassignedTasksText>ReassignedTasks</ReassignedTasksText>
      </HeaderLayout>

    </>
  )
}

export default TabIssueReassigned