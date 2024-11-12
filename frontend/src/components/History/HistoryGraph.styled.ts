import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    background: #222222;
    margin: 0 auto;
    padding: 0;
    color: #00ff80;
    text-shadow: 0 0 0.5px;
    
  }

  html * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

export const GitGraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  transform: scale(0.6);
  transform-origin: top;
  margin-bottom: 20px;
  margin-left: 200px;
  margin-top: 30px;
  .gitgraph-commit-author {
    display: none !important;
  }
`;

export const ReversedGraphContainer = styled.div`
  transform: scaleY(-1);
`;
