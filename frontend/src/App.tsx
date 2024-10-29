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

const queryClient = new QueryClient();

const ParseHeader = (str: string) => {
  if (!str) return;
  if (str == "/pullrequest") {
    return "Pull Request";
  }
  return str.charAt(1).toUpperCase() + str.slice(2);
};

const tempOption = [
  { value: 'Projec01',label:'Project01'},
  { value: 'Projec02',label:'Project02'},
  { value: 'Projec03',label:'Project03'}
]

const AppComponent: React.FC = () =>{
  const location = useLocation()

  const [selectedOp,setSelectedOp] = useState<SingleValue<OptionType>>(null);

  const handleChange = (option: SingleValue<OptionType>)=>{
    setSelectedOp(option)
  }
  return(
    <>
      <SidebarLayout>
        <Sidebar />
      </SidebarLayout>
      <NavLayout>
        <HeaderLayout>
          {ParseHeader(location.pathname)}
          <Select
          styles={ChoiceStyles}
          value={selectedOp}
          onChange={handleChange}
          options={tempOption}
          />
        </HeaderLayout>
        <Routes>
          <Route path="/" element={"NEED LOGIN PAGE"} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/pullrequest" element={"NEED PR"} />
          <Route path="/issue" element={<IssuePage />} />
          <Route path="/history" element={"NEED HISTORY PAGE"} />
          <Route path="/calender" element={"NEED CALENDER"} />
          <Route path="/member" element={"NEED MEMBER"} />
          <Route path="/setting" element={"NEED SETTING"} />
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
