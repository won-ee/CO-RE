import { CardSelectBranchLayout, CardSelectBranchHeader, ChoiceStyles, BranchBox } from "./CardSelectBranch.styled";
import Select, { OptionsOrGroups, GroupBase, PropsValue, SingleValue } from 'react-select'
import { OptionType } from "../../Types/SelectType";

interface Props{
    name:string;
    selectedOp: PropsValue<OptionType>;
    handleChange: (option: SingleValue<OptionType>) => void;
    option: OptionsOrGroups<OptionType, GroupBase<OptionType>>
}

function CardSelectBranch({ name, selectedOp, handleChange, option }: Props) {
  return (
    <CardSelectBranchLayout>
        <CardSelectBranchHeader>
        {name}
        </CardSelectBranchHeader>
        <Select
            styles={ChoiceStyles}
            value={selectedOp}
            onChange={handleChange}
            options={option}
            placeholder={`Select ${name}`}/>
        <BranchBox>
            {/* {selectedOp ? selectedOp.label : 'Select a branch to compare'} */}
        </BranchBox>
    </CardSelectBranchLayout>
  )
}

export default CardSelectBranch
