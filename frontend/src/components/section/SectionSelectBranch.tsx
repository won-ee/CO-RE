import { SectionSelectBranchLayout, ProgressIMG, SourceBranchBox } from './SectionSelectBranch.styled'
import ProgressImage from '../../assets/icon_Progress.png'
import ButtonCreateNewPR from '../../components/buttons/ButtonCreateNewPR'
import CardSelectBranch from '../../components/card/CardSelectBranch'
import { SingleValue } from 'react-select'
import { OptionType } from '../../Types/SelectType'
import { useQueryBranch } from '../../hooks/usePullRequestData'

const tempOption = {
  owner: 'JEM1224',
  repo: 'github-api',
};


interface Prop{
    BtnAction:()=>void
    sourceBranch: OptionType | null;
    targetBranch: OptionType | null;
    setSourceBranch: (branch: OptionType | null) => void;
    setTargetBranch: (branch: OptionType | null) => void;
}


function SectionSelectBranch({BtnAction, sourceBranch, targetBranch, setSourceBranch, setTargetBranch}:Prop) {
  const {data,error,isLoading} = useQueryBranch(tempOption)
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // BranchType 배열을 OptionType 배열로 변환
  const branchOptions = (data || []).map((branch) => ({
    label: branch.name, // BranchType에 있는 이름을 OptionType의 label에 맞춤
    value: branch.name, // 동일한 값을 value로 사용
  }));

  const handleSourceBranch = (option: SingleValue<OptionType>) => {
    if (option) setSourceBranch(option); // `label`을 저장하거나 `value`를 저장하도록 선택
    };
  
  const handleTargetBranch = (option: SingleValue<OptionType>) => {
    if (option) setTargetBranch(option);
    };
  return (
    <SectionSelectBranchLayout>
        <SourceBranchBox>
            <CardSelectBranch name="Source Branch" selectedOp={sourceBranch ? { label: sourceBranch.label, value: sourceBranch.value } : null} handleChange={handleSourceBranch} option={branchOptions||[]}/>
            <ButtonCreateNewPR text="Continue" btnEvent={BtnAction}/>
        </SourceBranchBox>
        <ProgressIMG src={ProgressImage} alt='Progress'/>
        <CardSelectBranch name="Target Branch" selectedOp={targetBranch  ? { label: targetBranch.label , value: targetBranch.value  } : null} handleChange={handleTargetBranch} option={branchOptions||[]}/>
    </SectionSelectBranchLayout>
  )
}

export default SectionSelectBranch