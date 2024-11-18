import React, { forwardRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useQueryEpicList } from "../../hooks/useIssueList";
import { useProjectStore } from "../../store/userStore";
import {
  ErrorIcon,
  ErrorMessageBox,
  FormLabel,
  FormRow,
  RightSectionLayout,
  SelectInput,
  SubmitButton,
  TextInput,
} from "./SectionErrorInquiry.styled";
import { useMutationEpic, useMutationNoEpic } from "../../hooks/useMutationCreatePR";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { EpicFieldsType } from "../../Types/IssueType";

export const StyledDatePicker = styled.div`
  width: 250px;
  padding: 10px;
  font-size: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ExampleCustomInput00 = forwardRef<HTMLDivElement, { value?: string; onClick?: () => void }>(
  ({ value, onClick }, ref) => (
    <StyledDatePicker onClick={onClick} ref={ref}>
      {value || "Select Date"}
    </StyledDatePicker>
  )
);
interface SectionErrorInquiryProps{
  selectedTeamId:string;
  setSelectedTeamId:React.Dispatch<React.SetStateAction<string>>;
  selectedProjectId:number;
}
const SectionErrorInquiry: React.FC<SectionErrorInquiryProps> = ({selectedTeamId,setSelectedTeamId,selectedProjectId}) => {
  const {  selectedProjectUserId } = useProjectStore();
  const { data } = useQueryEpicList(selectedProjectId);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [selectedEpic, setSelectedEpic] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const { mutate: mutateEpic } = useMutationEpic();
  const { mutate: mutateNoEpic } = useMutationNoEpic();

  const handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriority(event.target.value);
  };

  const handleEpicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEpic(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value); 
  };

  const handleSubmit = () => {
    const epicFields: EpicFieldsType = {
      fields: {
        project: {
          key: selectedTeamId,
        },
        summary: title,
        issuetype: {
          name: "Task",
        },
        priority: {
          name: selectedPriority,
        },
        assignee: {
          accountId: "",
        },
      },
    };
    
    // noEpicFields에 맞는 타입
    const noEpicFields: EpicFieldsType = {
      fields: {
        project: {
          key: selectedTeamId,
        },
        summary: title,
        issuetype: {
          name: "Task",
        },
        parent: {
          key: selectedEpic,
        },
        priority: {
          name: selectedPriority,
        },
        assignee: {
          accountId: "",
        },
      },
    };
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString("en-CA"); 
      if (selectedEpic) {
        mutateEpic({
          projectUserId: selectedProjectUserId,
          deadline: formattedDate,
          fields: epicFields,
        });
      } else {
        mutateNoEpic({
          projectUserId: selectedProjectUserId,
          deadline: formattedDate,
          fields: noEpicFields,
        });
      }
    }
    setSelectedPriority("");
    setSelectedEpic("");
    setSelectedDate(new Date());
    setTitle(""); 
    setSelectedTeamId("");
  };
  
  return (
    <RightSectionLayout>
      <ErrorMessageBox>
        <ErrorIcon>❗</ErrorIcon>
        시스템에 오류가 있어요
      </ErrorMessageBox>

      <FormRow>
        <div>
          <FormLabel>[필수] 우선도를 알려주세요</FormLabel>
          <SelectInput value={selectedPriority} onChange={handlePriorityChange}>
            <option>옵션선택</option>
            <option value="HIGHEST">HIGHEST</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
            <option value="LOWEST">LOWEST</option>
          </SelectInput>
        </div>
        <div>
          <FormLabel>[필수] 마감일자를 선택해주세요</FormLabel>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            customInput={<ExampleCustomInput00 />}
            dateFormat="yyyy-MM-dd"
            popperPlacement="bottom-start"
          />
        </div>
      </FormRow>

      <FormRow>
        <div>
          <FormLabel>[선택] 에픽을 선택해주세요</FormLabel>
          <SelectInput value={selectedEpic} onChange={handleEpicChange}>
            <option>옵션선택</option>
            {data &&
              data.map((epic) => (
                <option key={epic.id} value={epic.key}>
                  {epic.name}
                </option>
              ))}
          </SelectInput>
        </div>
      </FormRow>

      <FormLabel>[필수] 제목을 입력해 주세요</FormLabel>
      <FormRow>
        <TextInput
          rows={4}
          value={title}
          onChange={handleTitleChange} 
        />
        <div style={{ textAlign: "right", marginLeft: "32px" }}>
          <SubmitButton onClick={handleSubmit}>SEND</SubmitButton>
        </div>
      </FormRow>
    </RightSectionLayout>
  );
};

export default SectionErrorInquiry;
