import styled from 'styled-components';

export const ContainerLayout = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #FFFFFF;
  margin-top: 30px;
`;

export const TabMenu = styled.div`
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 20px;
`;

export const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  font-weight: ${(props) => (props.active ? 'bold' : '')};
  color: ${(props) => (props.active ? '#3a49f9' : '#757575')};
  border: none;
  border-bottom: ${(props) => (props.active ? '2px solid #3a49f9' : 'none')};
  background-color: transparent;
  cursor: pointer;
`;
