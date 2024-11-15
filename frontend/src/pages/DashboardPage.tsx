import React from "react";
import MainStats from "../components/DashStats/MainStats";
import FilterAndGraphSection from "../components/DashFilterGraph/FilterAndGraphSection";
import MainPR from "../components/DashPR/MainPR";
import MainIssue from "../components/DashIssue/MainIssue";
import LoadingPage from "./LoadingPage";
import NotFoundPage from "./NotFoundPage";

import { useDashboard, useDashPR, useDashIssue } from "../hooks/useDashboard";
import { useProjectStore } from "../store/userStore";

const Dashboard: React.FC = () => {
  const { selectedOwner, selectedRepo, selectedProjectUserId } =
    useProjectStore();
  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    error: dashboardError,
  } = useDashboard({
    owner: selectedOwner,
    repo: selectedRepo,
  });

  const {
    data: dashPRData,
    isLoading: isDashPRLoading,
    error: dashPRError,
  } = useDashPR({
    owner: selectedOwner,
    repo: selectedRepo,
    state: "receive",
  });

  const {
    data: dashIssueData,
    isLoading: isDashIssueLoading,
    error: dashIssueError,
  } = useDashIssue(selectedProjectUserId);

  if (isDashboardLoading || isDashPRLoading || isDashIssueLoading)
    return <LoadingPage />;
  if (dashboardError || dashPRError || dashIssueError)
    return <NotFoundPage errorNumber={404} />;
  if (!dashboardData || !dashPRData || !dashIssueData) return null;

  return (
    <div>
      <MainStats data={dashboardData} />
      <FilterAndGraphSection />
      <div>
        <MainPR data={dashPRData} />
        <MainIssue data={dashIssueData} />
      </div>
    </div>
  );
};

export default Dashboard;
