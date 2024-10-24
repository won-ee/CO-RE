import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
  }
`;

export const theme = {
  colors: {
    primary: '#0070f3',
    secondary: '#1db954',
  },
};
