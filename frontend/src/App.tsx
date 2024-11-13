import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./styles/GlobalStyled";
import { DisplayLayout, NavLayout } from "./App.Styled";
import Sidebar from "./components/Sidebar";
import IssuePage from "./pages/IssuePage";
import DashboardPage from "./pages/DashboardPage";
import PullRequestPage from "./pages/PullRequestPage";
import LoginPage from "./pages/LoginPage";
import MemberPage from "./pages/MemberPage";
import SettingPage from "./pages/SettingPage";
import CalendarPage from "./pages/CalendarPage";
import useUserStore from "./store/userStore";
import CreatePRPage from "./pages/CreatePRPage";
import PullRequestPageDetail from "./pages/PullRequestPageDetail";
import Header from "./components/Header";
import NotFoundPage from "./pages/NotFoundPage";
import HistoryPage from "./pages/HistoryPage";
import PrivacyNotice from "./pages/PrivacyNotice";
import ModalLogin from "./components/modal/ModalLogin";

const AppComponent: React.FC = () => {
  const { isLogin } = useUserStore();
  
  return (
    <>
      {isLogin && <Sidebar />}
      <NavLayout>
        {isLogin && <Header />}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/pullrequest" element={<PullRequestPage />} />
          <Route path="/pullrequest/create" element={<CreatePRPage />} />
          <Route path="/issue" element={<IssuePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/history/:id" element={<HistoryPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/member" element={<MemberPage />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route
            path="/pullrequest/:pullRequestId"
            element={<PullRequestPageDetail />}
          />
          <Route path="*" element={<NotFoundPage errorNumber={404} />} />
          <Route path="/403ERROR" element={<NotFoundPage errorNumber={403} />} />
          <Route path="/privacy" element={<PrivacyNotice />} />
          <Route path="/project" element={<ModalLogin />} />
        </Routes>
      </NavLayout>
    </>
  );
};

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <DisplayLayout>
          <Router>
            <AppComponent />
          </Router>
        </DisplayLayout>
      </ThemeProvider>
    </>
  );
};

export default App;
