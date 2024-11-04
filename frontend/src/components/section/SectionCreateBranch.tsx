import { SectionCreateBranchLayout, TitleInput, DescriptionTextArea, SelectBox, MergeDirectionBox, HighLightBox, DateInputContainer, DatePickerImg, DeadLineBox, DatePickerBox, UrgentBox, UrgentButton, PriorityBox, CreateButtonBox  } from "./SectionCreateBranch.styled";
import Select, { MultiValue, SingleValue, StylesConfig } from "react-select";
import { OptionType } from "../../Types/SelectType";
import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '../../assets/icon_calender.png'
// import ButtonCreateNewPR from "../buttons/ButtonCreateNewPR";

// 옵션 예시
const TempOption: OptionType[] = [
    { value: 'Alice', label: 'Alice' },
    { value: 'Bob', label: 'Bob' },
    { value: 'Elizabeth', label: 'Elizabeth' },
    { value: 'Claerk', label: 'Claerk' },
    { value: 'Volibear', label: 'Volibear' },
];

const PriorityOption: OptionType[] = [
  { value: 'low', label:'Low'},
  { value: 'medium', label:'Medium'},
  { value: 'high', label:'High'},
]

interface SectionCreateBranchProps {
    sourceBranch: OptionType | null;
    targetBranch: OptionType | null;
}

function SectionCreateBranch({ sourceBranch, targetBranch }: SectionCreateBranchProps) {
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isUrgent,setIsUrgent] = useState(false);
  const [priority,setPriority] = useState<string | null>(null)

  // 다중 선택 onChange 핸들러
  const handleChange = (options: MultiValue<OptionType>) => {
    setSelectedOptions(options as OptionType[]);
  };

  const handleIsUrgent = ()=>{
    setIsUrgent((isUrgent=>!isUrgent))
  }

  const handlePriority = (option: SingleValue<OptionType>)=>{
    setPriority(option ? option.value : null)
  }

  return (
    <SectionCreateBranchLayout>
        <MergeDirectionBox>
            From <HighLightBox>{sourceBranch?.label}</HighLightBox> into <HighLightBox>{targetBranch?.label}</HighLightBox>
        </MergeDirectionBox>
        Title
        <TitleInput type="text" placeholder="Type your title..." />
        Description
        <DescriptionTextArea placeholder="Type your Details..." />
        Reviewers
        <Select<OptionType, true>  // 타입을 명시하여 isMulti가 true임을 지정
            styles={SelectBox as StylesConfig<OptionType, true>}
            options={TempOption}
            value={selectedOptions}
            onChange={handleChange}
            isMulti={true}          // 다중 선택 가능
            isClearable
        />
        <DeadLineBox>
          <DatePickerBox>
            Deadline
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              customInput={
              <DateInputContainer >
                <DatePickerImg src={CalendarIcon}/>
                {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
              </DateInputContainer>}
              dateFormat="yyyy/MM/dd" // 날짜 포맷 설정
              portalId="root-portal"  // Portal을 사용하여 날짜 선택 창이 body에 직접 렌더링됨
              popperPlacement="bottom-start" // 창이 날짜 선택 필드 아래에 표시되도록 위치 지정
            />
          </DatePickerBox>
          <UrgentBox>
              Is it Urgent?
              <UrgentButton onClick={handleIsUrgent} isUrgent={isUrgent}>
                {isUrgent ? 'Yes':'No'}
              </UrgentButton>
              *If you check this box, this request will not need approval.
          </UrgentBox>
        </DeadLineBox>
        Priority
        <Select
          styles={PriorityBox as StylesConfig<OptionType,false>}
          onChange={handlePriority}
          options={PriorityOption}
          isSearchable={false}
          />
        {priority}
        <CreateButtonBox>
          {/* <ButtonCreateNewPR text="Create New Request"/> */}
        </CreateButtonBox>
    </SectionCreateBranchLayout>  
  );
}

export default SectionCreateBranch;
