import styled, { css } from 'styled-components';




export const TextBox = styled.div<{ errorNumber: number }>`
  padding: 17% 5% 10% 5%;
  text-align: center;
  ${({ errorNumber }) =>
    errorNumber === 403 &&
    css`
      margin-left: -100px;
    `}
`

export const NotFoundText = styled.div`
  position: relative;
  border: none;
  font-size: 200px;
  font-weight: bold;
  color: white;
  text-align: center;
  z-index: 100;
  pointer-events: none;
  margin-top: -100px;
  margin-bottom:-50px;
`;

export const ErrorText = styled.div`
  position: relative;
  border: none;
  font-size: 100px;
  font-weight: bold;
  color: white;
  text-align: center;
  z-index: 100;
  pointer-events: none;
`;

export const Background = styled.div<{ errorNumber: number }>`
  position: fixed;
  width: 100%;
  height: 100%;
  background: url(http://salehriaz.com/404Page/img/bg_purple.png) no-repeat center center;
  background-size: cover;
  z-index: 0;
  
  ${({ errorNumber }) =>
    errorNumber !== 403 &&
    css`
      top: 0;
      left: 0;
    `}
`;