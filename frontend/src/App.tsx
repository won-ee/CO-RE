import React from "react";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "styled-components";

//글로벌 css
import { GlobalStyle, theme } from "./styles/globalStyles";

//Styled 컴포넌트
import { DisplayLayout, SidebarLayout, HeaderLayout, NavLayout } from "./styles/appStyles";

import Sidebar from "./components/Sidebar";
import IssuePage from "./pages/IssuePage";

const queryClient = new QueryClient();

const App: React.FC = () => { 
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <DisplayLayout>
          <SidebarLayout>
            <Sidebar/>
          </SidebarLayout>
          <NavLayout>
            <HeaderLayout>
              Header
            </HeaderLayout>
            <Router>
              <Routes>
                <Route path="/" element={'NEED LOGIN PAGE'}/>
                <Route path="/dashboard" element={'NEED DASHBOARD'}/>
                <Route path="/pullrequest" element={'NEED PR'}/>
                <Route path="/issue" element={<IssuePage/>}/>
                <Route path="/history" element={'NEED HISTORY PAGE'}/>
                <Route path="/calender" element={'NEED CALENDER'}/>
                <Route path="/member" element={'NEED MEMBER'}/>
                <Route path="/setting" element={'NEED SETTING'}/>
              </Routes>
            </Router>
          </NavLayout>
        </DisplayLayout>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;


