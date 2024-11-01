import { CardSelectBranchLayout, CardSelectBranchHeader, ChoiceStyles, BranchBox } from "./CardSelectBranch.styled";
import Select, { OptionsOrGroups, GroupBase, SingleValue } from 'react-select'
import { OptionType } from "../../Types/SelectType";

interface Props{
    name:string;
    selectedOp:SingleValue<OptionType>;
    handleChange: (option: SingleValue<OptionType>) => void;
    option: OptionsOrGroups<OptionType, GroupBase<OptionType>>
}

function CardSelectBranch({ name, selectedOp, handleChange, option }: Props) {
  const isSingleOption = (option: typeof selectedOp): option is OptionType => {
    return !!option && typeof option === 'object' && 'label' in option;
  };

  const commitInfo = isSingleOption(selectedOp) ? JSON.parse(selectedOp.value) : null;

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
            placeholder={`Select ${name}`}
            getOptionLabel={(option) => option.label} // label을 표시하도록 설정
            getOptionValue={(option) => option.value}
        />
        <BranchBox>
          {commitInfo ? (
            <>
              <div>커밋 이름: {commitInfo.commitName}</div>
              <div>작성자: {commitInfo.author}</div>
              <div>날짜: {commitInfo.date}</div>
            </>
          ) : (
            'Select a branch to compare'
          )}
        </BranchBox>
    </CardSelectBranchLayout>
  )
}

export default CardSelectBranch
