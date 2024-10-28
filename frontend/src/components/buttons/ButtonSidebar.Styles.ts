import styled from "styled-components";

interface ChoicedBoxProps{
    $ischoiced :boolean;
}

export const NameBox = styled.div`
    
`

export const ContentBox = styled.div<ChoicedBoxProps>`
    display: flex;
    gap: 10px;
    width: 100%;
    padding: 16px;
    padding-left: 43px;
    margin-left: 12px;
    margin-right: 12px;
    background-color: ${(props) => (props.$ischoiced==true ? '#4880FF' : 'white')};
    color: ${(props) => (props.$ischoiced === true ? "white" : "black")};
    border-radius: 5px;
    font-size:14px;
    justify-content: start;
    align-items: center;
    font-weight: bold;
    transition: color 0.2s ease, background-color 0.2s ease, z-index 0.2s ease,box-shadow 0.2s ease;
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
    &:hover ${ContentBox} { /* WholeLayout의 hover 상태에서 ContentBox에 스타일 적용 */
        color: white;
        background-color: #4880FF;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        z-index: 1;
    }  
`

export const IconImg = styled.img<ChoicedBoxProps>`
    transition: filter 0.4s ease;
    width: 20px;
    height: auto;
    /* props에 따라 필터 적용 */
    filter: ${(props) => (props.$ischoiced ? 'brightness(0) invert(1)' : 'brightness(1)')};
    
    /* WholeLayout hover 시 $ischoiced 값에 따라 필터 적용 */
    ${WholeLayout}:hover & {
        filter: ${(props) => (props.$ischoiced ? 'brightness(0) invert(1)' : 'brightness(0) invert(1)')};
    }
`;
