import { CreatePRPageLayout, CreatePRPageHeader, IsBranchNullBox, AlertImg } from './CreatePRPage.styled'
import { useState } from 'react'
import { useBranchStore } from '../store/branchStore'

import SectionSelectBranch from '../components/section/SectionSelectBranch'
import SectionCreateBranch from '../components/section/SectionCreateBranch'
import AlertIcon from '../assets/icon_Alert.png'

function CreatePRPage() {
  const [isSelect,setIsSelect] = useState(true)
  const sourceBranch = useBranchStore((state) => state.sourceBranch);
  const targetBranch = useBranchStore((state) => state.targetBranch);
  const setSourceBranch = useBranchStore((state) => state.setSourceBranch);
  const setTargetBranch = useBranchStore((state) => state.setTargetBranch);
  const [isBranchNull,setIsBranchNull] = useState(false);

  const handleIsSelect = ()=>{
    if(sourceBranch === null || targetBranch===null){
      setIsBranchNull(true)
      return
    }
    setIsSelect(isSelect=>!isSelect)
  }

  return (
    <CreatePRPageLayout>
      <CreatePRPageHeader>New Pull Request
      </CreatePRPageHeader>
      {isSelect ? <>
      <SectionSelectBranch
      BtnAction={handleIsSelect}
      sourceBranch={sourceBranch}
      targetBranch={targetBranch}
      setSourceBranch={setSourceBranch}
      setTargetBranch={setTargetBranch}/>
      {isBranchNull && <IsBranchNullBox>
        <AlertImg src={AlertIcon}/>You must select source and target branch
        </IsBranchNullBox>}
      </>
      :
      <SectionCreateBranch
      sourceBranch={sourceBranch}
      targetBranch={targetBranch}/>}
    </CreatePRPageLayout>
  )
}

export default CreatePRPage