import styled from "styled-components";

interface ChoicedBoxProps{
    $ischoiced :boolean;
}

export const NameBox = styled.div`
    
`

export const ContentBox = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    padding: 16px;
    padding-left: 43px;
    margin-left: 12px;
    margin-right: 12px;
    background-color: #4880FF;
    border-radius: 5px;
    justify-content: start;
    align-items: center;
    font-weight: bold;
`

export const ChoicedBox = styled.div<ChoicedBoxProps>`
    width:7px;
    background-color: #4880FF;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    opacity: ${(props) => (props.$ischoiced==true ? 1 : 0)};
`

export const WholeLayout = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    cursor: pointer;
    &:hover{
        color: white;
    }
    transition: color 0.4s ease;
`
export const IconImg = styled.img`
    transition: filter 0.4s ease;

    /* 호버 시 이미지 색상을 흰색으로 변경 */
    ${WholeLayout}:hover & {
    filter: brightness(0) invert(1);
    }
`