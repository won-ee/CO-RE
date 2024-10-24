import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./styles/globalStyles";
import Sidebar from "./components/Sidebar";
import IssuePage from "./pages/IssuePage";


const queryClient = new QueryClient();
const Block=styled.div`
  display: flex;
  height: 100vh;
`


const App: React.FC = () => { 
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Block>
          <div style={{ flex: '0 0 240px', height:'100vh',  backgroundColor:'white', display:'fixed'}}>
          <Sidebar/>  {/* 왼쪽 고정 너비 (250px) */}
          </div>
          <div style={{ flex: 1, backgroundColor:'#F5F6FA'}} >
            <div style={{backgroundColor:'white',height:'70px',fontSize:'32px'}}>
              Header
            </div>
          <IssuePage/>  {/* 오른쪽 남은 영역을 모두 차지 */}
          </div>
        </Block>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
