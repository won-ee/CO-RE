import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  margin-left: 30px;
  margin-top: 30px;
`;

export const StyledSelect = styled.select`
  appearance: none;
  width: 150px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;

  &:hover {
    border-color: #bbb;
  }

  &:focus {
    outline: none;
    border-color: #3f51b5;
    box-shadow: 0 0 5px rgba(63, 81, 181, 0.5);
  }

  background-image: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
`;
