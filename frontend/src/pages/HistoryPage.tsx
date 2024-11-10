import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import GitHistory from "../components/History/HIstoryGraph";
import { useQueryHistoryData } from "../hooks/useHistory";
import LoadingPage from "./LoadingPage";
import NotFoundPage from "./NotFoundPage";
import { HistoryParamsType } from "../Types/historyType";

const Container = styled.div``;

const History: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const params: HistoryParamsType = {
    id: id ?? "",
  };

  const { data: graphData, error, isLoading } = useQueryHistoryData(params);

  if (!id) return <NotFoundPage />;
  if (isLoading) return <LoadingPage />;
  if (error || !graphData) return <NotFoundPage />;

  return (
    <Container>
      <GitHistory graphData={graphData} />
    </Container>
  );
};

export default History;
