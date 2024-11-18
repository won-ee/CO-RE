import React, { useState } from 'react'
import { TableLayout, TableRow, TableText, TaskText } from './SectionReassignedTasks.styled'
import CardTask from '../card/CardTask';
import { ContainerLayout, HeaderBox, Icon, SearchContainer, SearchInput } from './SectionIssueList.styled';
import lens from '../../assets/Lens.png'
import { useQueryIssueLocation } from '../../hooks/useIssueList';
import { useProjectStore } from '../../store/userStore';
import { useMutationAcceptIssueLocation } from '../../hooks/useMutationCreatePR';

const SectionReassignedTasks: React.FC = () => {
  const { selectedProjectUserId } = useProjectStore();
  const { data: projectTasks, isLoading } = useQueryIssueLocation(selectedProjectUserId);
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState(projectTasks || []);
  const mutation = useMutationAcceptIssueLocation();    

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = Array.isArray(tasks)
    ? tasks.filter((task) =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSubmit = (taskId: number) => {
    mutation.mutate({
      projectUserId: selectedProjectUserId,
      carrotId: taskId,
    }, {
      onSuccess: () => {
        setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId)); 
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
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
          <CardTask key={projectTask.id} task={projectTask} handleSubmit={handleSubmit} />
        ))}
      </TableLayout>
    </ContainerLayout>
  );
};

export default SectionReassignedTasks;
