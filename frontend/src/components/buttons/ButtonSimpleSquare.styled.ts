import styled from "styled-components";

interface ButtonSimpleSquareLayoutProps{
    color:string;
    bgc:string;
}

export const ButtonSimpleSquareLayout = styled.div<ButtonSimpleSquareLayoutProps>`
    background-color: ${({bgc})=>bgc};
    border-radius: 5px;
    font-size: 14px;
    color: ${({color})=>color};
    padding: 6px 12px;
    font-weight: normal;
    cursor: pointer;
    display: inline-block;
    align-self: flex-start;
    border: 0.5px solid gray;
    &:hover {
    filter: brightness(0.9); /* 밝기를 90%로 줄여 살짝 어둡게 */
  }
`