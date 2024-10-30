import React from 'react'
import { FormLayout, FormRow, Input, Label, LabelBox, SaveButton, TemplateInput } from './SectionProjectSetting.styled'

const SectionProjectSetting:React.FC = () => {
  return (
    <>
        <FormLayout>
            <FormRow>
                <div>
                    <Label>PR target score</Label>
                    <Input type="text" defaultValue="Default" />
                </div>
                <LabelBox>
                    <Label>Number of auto assign</Label>
                    <Input type="text" defaultValue="Default" />
                </LabelBox>
            </FormRow>
            <Label style={{ gridColumn: 'span 2' }}>Template</Label>
            <TemplateInput type="text" defaultValue="Type your Message..." style={{ height: '100px' }} />
            <SaveButton>Save</SaveButton>
        </FormLayout>
    </>
    )
}

export default SectionProjectSetting