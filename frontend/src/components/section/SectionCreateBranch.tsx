import { SectionCreateBranchLayout, TitleInput, DescriptionTextArea, SelectBox, MergeDirectionBox, HighLightBox } from "./SectionCreateBranch.styled"
import Select from "react-select"
import { OptionType } from "../../Types/SelectType";

const TempOption = [
    { value: 'Alice', label: 'Alice' },
    { value: 'Bob', label: 'Bob' },
];

interface SectionCreateBranchProps{
    sourceBranch: OptionType | null;
    targetBranch: OptionType | null;
    // setSourceBranch: (branch: OptionType | null) => void;
    // setTargetBranch: (branch: OptionType | null) => void;
}

function SectionCreateBranch({sourceBranch,targetBranch}:SectionCreateBranchProps) {
  return (
    <SectionCreateBranchLayout>
        <MergeDirectionBox>From <HighLightBox>{sourceBranch?.label}</HighLightBox> into <HighLightBox>{targetBranch?.label}</HighLightBox></MergeDirectionBox>
        Title
        <TitleInput type="text" placeholder="Type your title..."/>
        Description
        <DescriptionTextArea placeholder="Type your Details..."/>
        Reviewers
        <Select
            styles={SelectBox}
            options={TempOption}/>
    </SectionCreateBranchLayout>
  )
}

export default SectionCreateBranch