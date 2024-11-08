import React from "react";
import styled from "styled-components";
import GitHistory from "../components/History/HIstoryGraph";

const Container = styled.div``;

const History: React.FC = () => (
  <Container>
    <GitHistory />
  </Container>
);

export default History;
