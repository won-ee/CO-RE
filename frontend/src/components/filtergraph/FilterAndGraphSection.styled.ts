import styled from "styled-components";

export const FilterAndGraphLayout = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: -20px auto 20px;
  width: 93%;
`;

export const FilterBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #f9fafc;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const FilterGroupRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const FilterIconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

export const ResetButtonBox = styled.button`
  background: none;
  color: red;
  border: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const FilterLabel = styled.span`
  font-weight: bold;
`;

export const DropdownSelect = styled.select`
  appearance: none;
  width: 130px;
  border: 1px solid #ddd;
  padding: 10px 15px;
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
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
`;

export const GraphContainer = styled.div`
  height: 200px;
  width: 100%;
  border-radius: 10px;
  padding: 5px;
`;

export const VersionNoteWrapper = styled.div`
  background-color: #e7eefc;
  padding: 20px;
  border-radius: 10px;
  margin-top: 10px;
  font-family: "Pretendard";

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .edit-icon {
    cursor: pointer;
    width: 24px;
    height: 24px;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const NoteToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  background-color: transparent;
  border: none;
  color: #3f51b5;
  cursor: pointer;
  font-size: 16px;
  gap: 5px;
  padding: 10px;

  &:hover {
    color: #2c3a9e;
  }
`;
