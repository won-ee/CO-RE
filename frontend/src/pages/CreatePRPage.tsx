import { CreatePRPageLayout, CreatePRPageHeader,CreatePRPageContentLayout, ProgressIMG } from './CreatePRPage.styled'
import CardSelectBranch from '../components/card/CardSelectBranch'
import { useState } from 'react'
import { SingleValue } from 'react-select'
import { OptionType } from '../Types/SelectType'
import ProgressImage from '../assets/icon_Progress.png'

const tempOption = [
  { value: 'Projec01',label:'Project01'},
  { value: 'Projec02',label:'Project02'},
  { value: 'Projec03',label:'Project03'}
]

function CreatePRPage() {
  const [sourceBranch,setSourceBranch] = useState<SingleValue<OptionType>>(null);
  const [targetBranch,setTargetBranch] = useState<SingleValue<OptionType>>(null);

  const handleSourceBranch=(option: SingleValue<OptionType>)=>{
    setSourceBranch(option)
  }

  const handleTargetBranch=(option: SingleValue<OptionType>)=>{
    setTargetBranch(option)
  }

  return (
    <CreatePRPageLayout>
      <CreatePRPageHeader>New Pull Request</CreatePRPageHeader>
      <CreatePRPageContentLayout>
        <CardSelectBranch name="Source Branch" selectedOp={sourceBranch} handleChange={handleSourceBranch} option={tempOption}/>
        <ProgressIMG src={ProgressImage} alt='Progress'/>
        <CardSelectBranch name="Target Branch" selectedOp={targetBranch} handleChange={handleTargetBranch} option={tempOption}/>
      </CreatePRPageContentLayout>
    </CreatePRPageLayout>
  )
}

export default CreatePRPage