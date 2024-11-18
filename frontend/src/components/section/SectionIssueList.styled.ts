import styled from "styled-components";

export const ContainerLayout = styled.div`
  width: 100%;
`;

export const HeaderBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0; 
  margin-bottom: 20px;
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 50%;
  max-width: 400px;
`;

export const SearchInput = styled.input`
  padding: 8px 40px 8px 40px;
  width: 80%;
  border: 1px solid #ccc;
  border-radius: 19px;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s;
  text-align: center;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Icon = styled.img`
  position: absolute;
  left: 10px; 
  top: 50%; 
  transform: translateY(-50%);
  width: 20px; 
  height: 20px;
`;