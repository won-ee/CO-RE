import React, {useState} from "react";
import Select,{SingleValue} from "react-select"
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "styled-components";
import { OptionType } from "./Types/SelectType";

//글로벌 css
import { GlobalStyle, theme } from "./styles/GlobalStyled";

//Styled 컴포넌트
import { DisplayLayout, SidebarLayout, HeaderLayout, NavLayout, ChoiceStyles } from "./App.Styled";

import Sidebar from "./components/Sidebar";
import IssuePage from "./pages/IssuePage";
import DashboardPage from "./pages/DashboardPage";
import PullRequestPage from "./pages/PullRequestPage";
import LoginPage from "./pages/LoginPage";
import MemberPage from "./pages/MemberPage";
import SettingPage from "./pages/SettingPage";
import CalenderPage from "./pages/CalenderPage";
import useUserStore from "./store/userStore";
const queryClient = new QueryClient();

const ParseHeader = (str: string) => {
  if (!str) return;

  const firstSlashIndex = str.indexOf('/');
  const secondSlashIndex = str.indexOf('/', firstSlashIndex + 1);
  let result = '';
  // 두 번째 '/'가 있을 때 첫 번째 '/'와 두 번째 '/' 사이의 문자열 반환
  if (secondSlashIndex !== -1) {
    result = str.slice(firstSlashIndex + 1, secondSlashIndex);
  }
  else{// 두 번째 '/'가 없을 때 첫 번째 '/' 이후의 문자열 전체 반환
  result = str.slice(firstSlashIndex + 1);
  }
  if(result=='pullrequest'){
    return 'Pull Request'
  }
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const tempOption = [
  { value: 'Projec01',label:'Project01'},
  { value: 'Projec02',label:'Project02'},
  { value: 'Projec03',label:'Project03'}
]

const AppComponent: React.FC = () =>{
  const location = useLocation()
  const { isLogin } = useUserStore(); 
  const [selectedOp,setSelectedOp] = useState<SingleValue<OptionType>>(null);

  const handleChange = (option: SingleValue<OptionType>)=>{
    setSelectedOp(option)
  }
  return(
    <>
    {isLogin && (
      <SidebarLayout>
        <Sidebar />
      </SidebarLayout>)}
      <NavLayout>
      {isLogin && (
        <HeaderLayout>
          {ParseHeader(location.pathname)}
          <Select
          styles={ChoiceStyles}
          value={selectedOp}
          onChange={handleChange}
          options={tempOption}
          />
        </HeaderLayout>)}
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/pullrequest" element={<PullRequestPage/>} />
          <Route path="/issue" element={<IssuePage />} />
          <Route path="/history" element={"NEED HISTORY PAGE"} />
          <Route path="/calender" element={<CalenderPage/>} />
          <Route path="/member" element={<MemberPage/>} />
          <Route path="/setting" element={<SettingPage/>} />
        </Routes>
      </NavLayout>
    </>
  );
};

const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <DisplayLayout>
            <Router>
              <AppComponent />
            </Router>
          </DisplayLayout>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
