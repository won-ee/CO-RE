import React from "react";
import MainStats from "../components/DashStats/MainStats";
import FilterAndGraphSection from "../components/DashFilterGraph/FilterAndGraphSection";
import MainPR from "../components/DashPR/MainPR";
import MainIssue from "../components/DashIssue/MainIssue";
import LoadingPage from "./LoadingPage";
import NotFoundPage from "./NotFoundPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    state: "received",
  });
  const {
    data: dashIssueData,
    isLoading: isDashIssueLoading,
    error: dashIssueError,
  } = useDashIssue(selectedProjectUserId);

  // 로딩 상태 처리
  if (isDashboardLoading || isDashPRLoading || isDashIssueLoading)
    return <LoadingPage />;

  // 에러 상태 처리
  if (dashboardError || dashPRError || dashIssueError) {
    toast.error("데이터를 불러오는 중 오류가 발생했습니다."); // 오류 메시지 추가
    return <NotFoundPage errorNumber={404} />;
  }

  if (!dashboardData) return null;

  if (!dashPRData) {
    toast.info("현재 PR 데이터가 없습니다."); // PR 데이터 없음 메시지 추가
    console.log("현재 데이터가 없습니다.");
  }

  return (
    <div>
      {/* ToastContainer 추가 */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
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
