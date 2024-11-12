import styled from "styled-components";

export const ContainerLayout = styled.div`
    margin: 0;
    width: 100%;
    height: 100%;
    background-color: white;
`

export const OverviewHeaderBox = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 20px;

`

export const DeadLineBox = styled.div`
    margin-left: 20px;
    margin-top: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 43px;
    height: 20px;
    background-color: #FCD7D4;
    color: #EF3826;
    border-radius: 3px;

`

export const OverviewHeaderText = styled.div`
    margin-left: 20px;
    margin-top: 10px;
    font-size: 28px;
    font-weight: bold;
`

export const OverviewInfoBox = styled.div`
    display: flex;
    flex-direction: row;
`

export const OverviewProfileImg = styled.img`
    margin-top: 10px;
    margin-left: 40px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
`

export const OverviewName = styled.div`
    margin-top: 17px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
`

export const OverviewDayText = styled.div`
    margin-top: 17px;
    margin-left: 10px;
    font-size: 14px;
`
export const OverviewSourceText = styled.div`
    margin-top: 17px;
    margin-left: 10px;
    font-size: 14px;
    color: #0730D5;
`
export const OverviewTargetText = styled.div`
    margin-top: 17px;
    margin-left: 5px;
    font-size: 14px;
    color: #0730D5;
`

export const OverviewText = styled.div`
    margin-top: 17px;
    margin-left: 5px;
    font-size: 14px;
`
export const OverviewContentBox = styled.div`
    margin-top: 17px;
    margin-left: 40px;
`
export const OverviewContent = styled.div`
    font-size: 14px;
    line-height: 1.6;
`
export const OverviewCoreBox = styled.div`
    width: 90%;
    height: 30%;
    margin-top: 17px;
    margin-left: 40px;
    display: flex;
    flex-direction: row;
    border: solid 1px #C2C2C2;
    border-radius: 10px;
`

export const OverviewCoreImg = styled.img`
    padding: 10px;
`

export const OverviewCoreContentBox = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`

export const OverviewCoreHeader = styled.div`
    font-size: 16px;
    font-weight: bold;
`

export const OverviewCoreText = styled.div`
    font-size: 14px;
`

export const OverviewApproveBox = styled.div`
    width: 90%;
    height: 30%;
    margin-top: 17px;
    margin-left: 40px;
    background-color: #E7F6F7;  
    padding-bottom: 20px;
` 

export const OverviewApproveButton= styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    margin-left: 20px;
    background-color: rgba(0,182,155,0.2);
    color: #00B69B;
    width: 80px;
    height: 30px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: bold;
    
` 

export const OverviewApproveHeader = styled.div`
    display: flex;
    flex-direction: row;
`

export const OverviewApproveContent = styled.div`
    margin-top: 10px;
    margin-left: 60px;
    font-size: 14px;
`

export const OverviewInput = styled.textarea`
    width: 88.5%;
    height: 190px;
    margin-top: 20px;
    margin-left: 40px;
    border-radius: 5px;
    resize: none;
    padding: 10px;
`

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
`

export const RadioGroup = styled.div`
    display: flex;
    gap: 8px;
    margin-right: 16px;
`
export const RadioCol = styled.div`
    display: flex;
    flex-direction: column;
`

export const RadioText = styled.div`
`

export const RadioButton = styled.input.attrs({ type: 'radio' })`
    appearance: none;
    width: 10px;
    height: 10px;
    border: 2px solid #000;
    border-radius: 50%;
    background-color: white;
    transition: background-color 0.3s ease;
    margin-bottom: 23px;
    &:checked {
        background-color: black;
    }
`

export const Text = styled.span`
    margin-right: 16px;
    color: #666;
`

export const Button = styled.button<{ $approve?: string }>`
    padding: 8px 16px;
    border-radius: 5px;
    margin-left: 10px;
    font-weight: bold;
    color: white;
    border: none;
    cursor: pointer;
    background-color: ${(props) => (props.$approve ? '#7667FF' : '#FF5F5F')};
    
    &:hover {
        opacity: 0.8;
    }
`