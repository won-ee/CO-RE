import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import GitGraphComponent from "../components/History/HIstoryGraph";
import { useHistoryData } from "../hooks/useHistory";
import LoadingPage from "./LoadingPage";
import NotFoundPage from "./NotFoundPage";
import { DropdownContainer, StyledSelect } from "./HistoryPage.styled";

const HistoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    repos,
    isLoadingRepos,
    selectedRepoId,
    setSelectedRepoId,
    graphData,
    isLoadingGraph,
    graphError,
  } = useHistoryData();

  const handleSelectChange = (selectedId: string) => {
    setSelectedRepoId(selectedId);
    if (!selectedId) {
      navigate("/history");
    } else {
      navigate(`/history/${selectedId}`);
    }
  };

  if (isLoadingRepos) return <LoadingPage />;
  if (graphError) return <NotFoundPage />;

  return (
    <div>
      <DropdownContainer>
        <StyledSelect
          value={selectedRepoId || ""}
          onChange={(e) => handleSelectChange(e.target.value)}
        >
          <option value="">Version</option>
          {repos?.map((repo) => (
            <option key={repo.id} value={repo.id}>
              {repo.id}
            </option>
          ))}
        </StyledSelect>
      </DropdownContainer>

      {id && isLoadingGraph && <div>Loading graph data...</div>}
      {id && graphData && <GitGraphComponent graphData={graphData} />}
    </div>
  );
};

export default HistoryPage;
