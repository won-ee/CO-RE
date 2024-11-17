import React, { useState } from "react";
import {
  FormLayout,
  FormRow,
  Input,
  Label,
  LabelBox,
  SaveButton,
  TemplateInput,
} from "./SectionProjectSetting.styled";
import { useProjectData } from "../../hooks/useUser";
import { useProjectStore } from "../../store/userStore";
import { ProjectSettingType } from "../../Types/userType";
import { useMutationPatchProjectSetting } from "../../hooks/useMutationCreatePR";

const SectionProjectSetting: React.FC = () => {
  const { selectedProjectId } = useProjectStore();
  const { data } = useProjectData(selectedProjectId);
  const [targetScore, setTargetScore] = useState(data?.targetScore || 0);
  const [reviewerCount, setReviewerCount] = useState(data?.reviewerCount || 0);
  const [template, setTemplate] = useState(data?.template || "");

  const { mutate } = useMutationPatchProjectSetting({
    onSuccess: (responseData) => {
      setTargetScore(responseData.targetScore);
      setReviewerCount(responseData.reviewerCount);
      setTemplate(responseData.template);
    },
  });

  const handleTargetScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetScore(Number(e.target.value));
  };

  const handleReviewerCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewerCount(Number(e.target.value));
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTemplate(e.target.value);
  };

  const saveProjectSettings = () => {
    mutate({
      selectedProjectId,
      projectData: {
        targetScore,
        reviewerCount,
        template,
      } as ProjectSettingType,
    });
  };

  return (
    <FormLayout>
      <FormRow>
        <div>
          <Label>PR target score</Label>
          <Input
            type="number"
            defaultValue={data?.targetScore}
            onChange={handleTargetScoreChange}
          />
        </div>
        <LabelBox>
          <Label>Number of auto assign</Label>
          <Input
            type="number"
            defaultValue={data?.reviewerCount}
            onChange={handleReviewerCountChange}
          />
        </LabelBox>
      </FormRow>
      <Label style={{ gridColumn: "span 2" }}>Template</Label>
      <TemplateInput
        placeholder="Type your Message..."
        style={{ height: "100px" }}
        defaultValue={data?.template}
        onChange={handleTemplateChange}
      />
      <SaveButton onClick={saveProjectSettings}>Save</SaveButton>
    </FormLayout>
  );
};

export default SectionProjectSetting;
