import React, { useState } from 'react'
import {  TableLayout, TableRow, TableText, TaskText } from './SectionReassignedTasks.styled'
import CardTask from '../card/CardTask';
import { ContainerLayout, HeaderBox, Icon, SearchContainer, SearchInput } from './SectionIssueList.styled';
import lens from '../../assets/Lens.png'
import { useQueryIssueLocation } from '../../hooks/useIssueList';
import { useProjectStore } from '../../store/userStore';

const SectionReassignedTasks:React.FC = () => {
  const {selectedProjectUserId}=useProjectStore()
  const {data:projectTasks} = useQueryIssueLocation(selectedProjectUserId)
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const filteredData = projectTasks?.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ContainerLayout>
      <HeaderBox>
                <SearchContainer>
                    <SearchInput
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={handleSearchChange} 
                    />
                    <Icon src={lens} alt="search icon" />
                </SearchContainer>
            </HeaderBox>
        <TableLayout>
            <TableRow>
              <TaskText>TASK</TaskText>
              <TableText>DEADLINE</TableText>
              <TableText>SENDER</TableText>
            </TableRow>
            {filteredData?.map((projectTask) => (
              <CardTask task = {projectTask}/>
            ))}
        </TableLayout>
      </ContainerLayout>
    </>
  )
}

export default SectionReassignedTasks