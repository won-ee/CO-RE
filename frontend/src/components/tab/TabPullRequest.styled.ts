import styled from "styled-components";

interface TabButtonProps{
    $isSeleted:boolean
}
export const TabLayout = styled.div`
`

export const TabBox = styled.div`
    display: flex;
    flex-direction: row;
    height: 54px;
    width: 402px;
`

export const TabButton = styled.button<TabButtonProps>`
    width: 130px;
    border-radius: 10px 10px 0 0;
    border: none;
    background-color: ${({ $isSeleted }) => $isSeleted ? 'white' : '#E7E7E7'};
    cursor: pointer;
`

