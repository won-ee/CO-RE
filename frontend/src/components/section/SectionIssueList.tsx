import React, { useState } from "react";
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

const SectionIssueList: React.FC = () => {
  const { selectedProjectId } = useProjectStore();
  const { data } = useQueryIssueList(selectedProjectId);
  const [searchTerm, setSearchTerm] = useState("");
  
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
      {filteredData?.map((issue, index) => (
        <CardIssue key={index} issue={issue} index={index} />
      ))}
    </ContainerLayout>
  );
};

export default SectionIssueList;
