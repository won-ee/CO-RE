import { CreatePRPageLayout, CreatePRPageHeader } from './CreatePRPage.styled'
import { useState } from 'react'
import { useBranchStore } from '../store/branchStore'

import SectionSelectBranch from '../components/section/SectionSelectBranch'
import SectionCreateBranch from '../components/section/SectionCreateBranch'

function CreatePRPage() {
  const [isSelect,setIsSelect] = useState(true)
  const sourceBranch = useBranchStore((state) => state.sourceBranch);
  const targetBranch = useBranchStore((state) => state.targetBranch);
  const setSourceBranch = useBranchStore((state) => state.setSourceBranch);
  const setTargetBranch = useBranchStore((state) => state.setTargetBranch);

  const handleIsSelect = ()=>{
    setIsSelect(isSelect=>!isSelect)
  }

  return (
    <CreatePRPageLayout>
      <CreatePRPageHeader>New Pull Request</CreatePRPageHeader>
      {isSelect ? <SectionSelectBranch
      BtnAction={handleIsSelect}
      sourceBranch={sourceBranch}
      targetBranch={targetBranch}
      setSourceBranch={setSourceBranch}
      setTargetBranch={setTargetBranch}/>:

      <SectionCreateBranch
      sourceBranch={sourceBranch}
      targetBranch={targetBranch}/>}
    </CreatePRPageLayout>
  )
}

export default CreatePRPage