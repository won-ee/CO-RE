import styled from "styled-components";

interface Props {
    $ischoiced: boolean; // 선택 여부를 나타내는 boolean 값 추가
}

export const TabLayout = styled.div`
    display: flex;
    gap: 13px;
`;

export const ContentBox = styled.div<Props>`
    font-weight: ${(props) => (props.$ischoiced ? "bold" : "normal")}; /* 선택된 탭의 경우 굵은 글씨 */
    font-size: 20px;
    padding: 13px;
    color: ${(props) => (props.$ischoiced ? "#343C6A" : "#757575")}; /* 선택된 탭의 경우 색상 변경 */
    border-bottom: ${(props) => (props.$ischoiced ? "3px solid #343C6A" : "none")}; /* 선택된 탭의 경우 하단에 border */
    cursor: pointer;
`;
