import { SectionCreateBranchLayout, TitleInput, DescriptionTextArea, SelectBox, MergeDirectionBox, HighLightBox } from "./SectionCreateBranch.styled";
import Select, { MultiValue, StylesConfig } from "react-select";
import { OptionType } from "../../Types/SelectType";
import { useState } from "react";

// 옵션 예시
const TempOption: OptionType[] = [
    { value: 'Alice', label: 'Alice' },
    { value: 'Bob', label: 'Bob' },
    { value: 'Elizabeth', label: 'Elizabeth' },
    { value: 'Claerk', label: 'Claerk' },
    { value: 'Volibear', label: 'Volibear' },
];

interface SectionCreateBranchProps {
    sourceBranch: OptionType | null;
    targetBranch: OptionType | null;
}

function SectionCreateBranch({ sourceBranch, targetBranch }: SectionCreateBranchProps) {
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);

  // 다중 선택 onChange 핸들러
  const handleChange = (options: MultiValue<OptionType>) => {
    setSelectedOptions(options as OptionType[]);
  };

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
    </SectionCreateBranchLayout>
  );
}

export default SectionCreateBranch;
