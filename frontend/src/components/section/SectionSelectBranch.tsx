import { SectionSelectBranchLayout, ProgressIMG, SourceBranchBox } from './SectionSelectBranch.styled'
import ProgressImage from '../../assets/icon_Progress.png'
import ButtonCreateNewPR from '../../components/buttons/ButtonCreateNewPR'
import CardSelectBranch from '../../components/card/CardSelectBranch'
import { SingleValue } from 'react-select'
import { OptionType } from '../../Types/SelectType'

const tempOption = [
    {
      value: JSON.stringify({
        commitName: 'Add feature X',
        author: 'Alice',
        date: '2024-11-01',
      }),
      label: 'FE/feat/S11CP201-18'
    },
    {
      value: JSON.stringify({
        commitName: 'Fix bug Y',
        author: 'Bob',
        date: '2024-11-02',
      }),
      label: 'FE/feat/S11CP201-56'
    },
    {
      value: JSON.stringify({
        commitName: 'Improve performance',
        author: 'Charlie',
        date: '2024-11-03',
      }),
      label: 'FE/feat/S11CP201-72'
    }
  ];

interface Prop{
    BtnAction:()=>void
    sourceBranch: OptionType | null;
    targetBranch: OptionType | null;
    setSourceBranch: (branch: OptionType | null) => void;
    setTargetBranch: (branch: OptionType | null) => void;
}


function SectionSelectBranch({BtnAction, sourceBranch, targetBranch, setSourceBranch, setTargetBranch}:Prop) {
    const handleSourceBranch = (option: SingleValue<OptionType>) => {
        if (option) setSourceBranch(option); // `label`을 저장하거나 `value`를 저장하도록 선택
      };
    
      const handleTargetBranch = (option: SingleValue<OptionType>) => {
        if (option) setTargetBranch(option);
      };
  return (
    <SectionSelectBranchLayout>
        <SourceBranchBox>
            <CardSelectBranch name="Source Branch" selectedOp={sourceBranch ? { label: sourceBranch.label, value: sourceBranch.value } : null} handleChange={handleSourceBranch} option={tempOption}/>
            <ButtonCreateNewPR text="Continue" btnEvent={BtnAction}/>
        </SourceBranchBox>
        <ProgressIMG src={ProgressImage} alt='Progress'/>
        <CardSelectBranch name="Target Branch" selectedOp={targetBranch  ? { label: targetBranch.label , value: targetBranch.value  } : null} handleChange={handleTargetBranch} option={tempOption}/>
    </SectionSelectBranchLayout>
  )
}

export default SectionSelectBranch