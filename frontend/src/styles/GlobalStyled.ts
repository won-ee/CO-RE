import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family:'Pretendard';
  }
`;

export const theme = {
  colors: {
    primary: "#0070f3",
    secondary: "#1db954",
  },
};

export const Block = styled.div`
  padding: 50px;
  background-color: #F5F6FA;
`