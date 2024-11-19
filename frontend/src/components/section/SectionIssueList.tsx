import React, { useEffect, useState } from "react";
import CardIssue from "../card/CardIssue";
import {
  ContainerLayout,
  HeaderBox,
  Icon,
  SearchContainer,
  SearchInput,
} from "./SectionIssueList.styled";
import lens from "../../assets/Lens.png";
import { useQueryIssueList } from "../../hooks/useIssueList";
import { useProjectStore } from "../../store/userStore";
import { IssueListEpicType } from "../../Types/IssueType";


const SectionIssueList: React.FC = () => {
  const { selectedProjectUserId } = useProjectStore();
  const { data } = useQueryIssueList(selectedProjectUserId);
  const [searchTerm, setSearchTerm] = useState("");
  console.log('NouseEffect',data);

  useEffect(() => {
    console.log('useEffect',data);
    
  }, [data]);

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
  

  const groupedData = Array.isArray(data) ? data.reduce<Record<string, IssueListEpicType[]>>((acc, item) => {
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

  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data?.filter((issue) =>
    issue.issueContent.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      {filteredData?.map((issue, index) => {
        const epicData = result.find(r => r.epicKey === issue.epicKey);
        const color = epicData ? epicData.color : ''; 
        return (
          <CardIssue 
            key={index} 
            issue={issue} 
            index={index} 
            status={color} 
          />
        );
      })}
    </ContainerLayout>
  );
};

export default SectionIssueList;
