import React from "react";
import MainStats from "../components/stats/MainStats";
// import FilterAndGraphSection from "../components/section/FilterAndGraphContainer/FilterAndGraphSection";
// import MainPR from "../components/section/MainPR/MainPR";
// import MainIssue from "../components/section/MainIssue/MainIssue";
import styled from "styled-components";

const Container = styled.div``;
// const BottomContainer = styled.div``;

const Dashboard: React.FC = () => (
  <Container>
    <MainStats />
    {/* <FilterAndGraphSection /> */}
    {/* <BottomContainer> */}
    {/* <MainPR /> */}
    {/* <MainIssue /> */}
    {/* </BottomContainer> */}
  </Container>
);

export default Dashboard;
