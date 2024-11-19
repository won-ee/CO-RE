import React, { useEffect, useState } from 'react';
import { TableLayout } from './SectionReassignedTasks.styled';
import CardTask from '../card/CardTask';
import { ContainerLayout, HeaderBox, Icon, SearchContainer, SearchInput } from './SectionIssueList.styled';
import lens from '../../assets/Lens.png';
import { useQueryIssueLocation } from '../../hooks/useIssueList';
import { useProjectStore } from '../../store/userStore';
import { useMutationAcceptIssueLocation } from '../../hooks/useMutationCreatePR';
import { IssueLocationType } from '../../Types/IssueType';
import LoadingPage from '../../pages/LoadingPage';

const SectionReassignedTasks: React.FC = () => {
  const { selectedProjectUserId } = useProjectStore();
  const { data: projectTasks, isLoading } = useQueryIssueLocation(selectedProjectUserId);  
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState(projectTasks || []);
  const mutation = useMutationAcceptIssueLocation();
  console.log('projectTasks',projectTasks);
  console.log('tasks',tasks);
  
  
  useEffect(() => {
    if (projectTasks) {
      setTasks(projectTasks);
    }
  }, [projectTasks,selectedProjectUserId]);  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const colorPalette = [
    "rgba(96, 151, 223, 1)",  
    "rgba(223, 96, 100, 1)", 
    "rgba(99, 186, 60, 1)",  
    "rgba(80, 227, 194, 1)", 
    "rgba(245, 166, 35, 1)",  
    "rgba(184, 233, 134, 1)", 
    "rgba(208, 2, 27, 1)",    
    "rgba(139, 87, 42, 1)",   
    "rgba(0, 122, 255, 1)",   
    "rgba(255, 140, 0, 1)",   
    "rgba(60, 179, 113, 1)",  
    "rgba(255, 105, 180, 1)", 
    "rgba(0, 255, 255, 1)",   
    "rgba(255, 0, 255, 1)",   
    "rgba(255, 69, 0, 1)",    
    "rgba(255, 255, 0, 1)",   
    "rgba(34, 193, 195, 1)",  
    "rgba(253, 187, 45, 1)",  
    "rgba(255, 99, 71, 1)",   
  ];
  

  const groupedData = Array.isArray(projectTasks) ? projectTasks.reduce<Record<string, IssueLocationType[]>>((acc, item) => {
    if (!acc[item.epicKey]) {
      acc[item.epicKey] = [];
    }
    acc[item.epicKey].push(item);
    return acc;
  }, {}) : {}; 
  

  const result = Object.keys(groupedData).map((epicKey, index) => ({
    epicKey,
    color: colorPalette[index % colorPalette.length],
    issues: groupedData[epicKey],
  }));

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
    return <LoadingPage/>;
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
        {filteredData?.map((projectTask) => {
          const epicData = result.find(r => r.epicKey === projectTask.epicKey);
          const color = epicData ? epicData.color : ''; 
          return (
            <CardTask 
              key={projectTask.id} 
              task={projectTask} 
              handleSubmit={handleSubmit} 
              status={color} 
            />
          );
        })}
      </TableLayout>
    </ContainerLayout>
  );
};

export default SectionReassignedTasks;
