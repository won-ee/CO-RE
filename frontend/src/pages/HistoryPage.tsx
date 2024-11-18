import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GitGraphComponent from "../components/History/HIstoryGraph";
import { useHistoryData } from "../hooks/useHistory";
import LoadingPage from "./LoadingPage";
import NotFoundPage from "./NotFoundPage";
import { DropdownContainer, StyledSelect } from "./HistoryPage.styled";
import { useProjectStore } from "../store/userStore";

const HistoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedOwner, selectedRepo } = useProjectStore();

  const {
    repos,
    isLoadingRepos,
    selectedRepoId,
    // setSelectedRepoId,
    graphData,
    isLoadingGraph,
    refetchGraphData,
    graphError,
  } = useHistoryData(selectedOwner, selectedRepo);

  // useEffect(() => {
  //   if (id) {
  //     setSelectedRepoId(id);
  //   }
  // }, [id, setSelectedRepoId]);

  // useEffect(() => {
  //   if (id && id !== selectedRepoId) {
  //     setSelectedRepoId(id);
  //   }
  // }, [id, selectedRepoId, setSelectedRepoId]);

  useEffect(() => {
    if (selectedRepoId) {
      refetchGraphData();
    }
  }, [selectedRepoId, refetchGraphData]);

  const handleSelectChange = (selectedId: string) => {
    // setSelectedRepoId(selectedId);
    // if (!selectedId) {
    //   navigate("/history");
    // } else {
    //   setSelectedRepoId(selectedId);
    //   setTimeout(() => navigate(`/history/${selectedId}`), 100);
    // }
    navigate(`history/${selectedId}`);
  };

  if (isLoadingRepos) return <LoadingPage />;
  if (graphError) return <NotFoundPage errorNumber={404} />;

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
              {repo.name}
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
