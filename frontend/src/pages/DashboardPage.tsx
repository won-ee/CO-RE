import React from "react";
import MainStats from "../components/DashStats/MainStats";
import FilterAndGraphSection from "../components/DashFilterGraph/FilterAndGraphSection";
import MainPR from "../components/DashPR/MainPR";
import MainIssue from "../components/DashIssue/MainIssue";
import LoadingPage from "./LoadingPage";
import NotFoundPage from "./NotFoundPage";

// import { useDashboard, useDashPR } from "../hooks/useDashboard";
import { useDashPR } from "../hooks/useDashboard";
import { useProjectStore } from "../store/userStore";

const Dashboard: React.FC = () => {
  const projectInfo = useProjectStore((state) => state);
  // const {
  //   data: dashboardData,
  //   isLoading: isDashboardLoading,
  //   error: dashboardError,
  // } = useDashboard();

  const {
    data: dashPRData,
    isLoading: isDashPRLoading,
    error: dashPRError,
  } = useDashPR({
    owner: projectInfo.selectedOwner,
    repo: projectInfo.selectedRepo,
    state: "receive",
  });

  // if (isDashboardLoading || isDashPRLoading) return <LoadingPage />;
  // if (dashboardError || dashPRError) return <NotFoundPage />;
  // if (!dashboardData || !dashPRData) return null;

  if (isDashPRLoading) return <LoadingPage />;
  if (dashPRError) return <NotFoundPage errorNumber={404} />;
  if (!dashPRData) return null;

  return (
    <div>
      {/* <MainStats data={dashboardData} /> */}
      <MainStats />
      <FilterAndGraphSection />
      <div>
        <MainPR data={dashPRData} />
        <MainIssue />
      </div>
    </div>
  );
};

export default Dashboard;
