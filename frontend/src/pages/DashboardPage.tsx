import React from "react";
import MainStats from "../components/DashStats/MainStats";
import FilterAndGraphSection from "../components/DashFilterGraph/FilterAndGraphSection";
import MainPR from "../components/DashPR/MainPR";
import MainIssue from "../components/DashIssue/MainIssue";
import styled from "styled-components";

const Container = styled.div``;
const BottomContainer = styled.div``;

const Dashboard: React.FC = () => (
  <Container>
    <MainStats />
    <FilterAndGraphSection />
    <BottomContainer>
      <MainPR />
      <MainIssue />
    </BottomContainer>
  </Container>
);

export default Dashboard;
