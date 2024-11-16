import React, { useEffect, useCallback } from "react";
import {
  VersionNoteWrapper,
  NoteToggleButton,
  NoteContainer,
  NoteContent,
  NoteTitle,
  NoteTextarea,
  NotePre,
  EditIconImage,
  OptionContainer,
  OptionHeader,
  Checkbox,
  OptionLabel,
  SubOptionsContainer,
  SubOptionLabel,
  ChevronIcon,
  SelectedTagsContainer,
  Tag,
  OptionListContainer,
} from "./FilterAndGraphSection.styled";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import EditIcon from "../../assets/DashboardEditButton.png";
import { VersionDataType } from "../../Types/dashboardType";

type NoteSectionProps = {
  isEditing: boolean;
  selectedOptions: string[];
  showNote: boolean;
  expandedSections: string[];
  selectedVersion: string;
  versionDetails: VersionDataType | null;
  selectedCategory: string;
  setVersionDetails: React.Dispatch<
    React.SetStateAction<VersionDataType | null>
  >;
  setShowNote: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSection: (section: string) => void;
  handleOptionChange: (option: string, subOptions?: string[]) => void;
};

const NoteSection: React.FC<NoteSectionProps> = ({
  isEditing,
  showNote,
  selectedOptions,
  expandedSections,
  selectedVersion,
  versionDetails,
  setVersionDetails,
  setShowNote,
  setIsEditing,
  toggleSection,
  handleOptionChange,
  // selectedCategory,
}) => {
  const initialSelectedOptions = useCallback(() => {
    if (!versionDetails) return [];
    return Object.entries(versionDetails)
      .filter(([value]) => typeof value === "boolean" && value)
      .map(([key]) => key);
  }, [versionDetails]);

  useEffect(() => {
    console.log("Initial selected options:", initialSelectedOptions());
  }, [versionDetails, initialSelectedOptions]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (versionDetails) {
      setVersionDetails({ ...versionDetails, content: e.target.value });
    }
  };

  const toggleNote = () => setShowNote((prev) => !prev);
  const toggleEditing = () => setIsEditing((prev) => !prev);

  return (
    <>
      <NoteToggleButton onClick={toggleNote}>
        {showNote ? <FaChevronUp /> : <FaChevronDown />}
        <span>Version Note</span>
      </NoteToggleButton>

      {showNote && versionDetails && (
        <VersionNoteWrapper>
          <EditIconImage
            src={EditIcon}
            alt="Edit Icon"
            onClick={toggleEditing}
          />
          <NoteContainer>
            <NoteContent>
              <NoteTitle>Version Note for {selectedVersion}</NoteTitle>
              {isEditing ? (
                <NoteTextarea
                  value={versionDetails.content || ""}
                  onChange={handleNoteChange}
                  rows={10}
                />
              ) : (
                <NotePre>{versionDetails.content}</NotePre>
              )}
            </NoteContent>

            <OptionListContainer>
              {[
                {
                  label: "업무별",
                  subOptions: [
                    "mixingKneading",
                    "assembly",
                    "modulePack",
                    "chemicalProcessing",
                    "ess",
                  ],
                },
                {
                  label: "사이트별(중대형)",
                  subOptions: [
                    "ulsan",
                    "hungary1",
                    "hungary2",
                    "xian",
                    "spe",
                    "cheonan",
                  ],
                },
              ].map((option) => {
                const subOptionsSet = new Set(option.subOptions || []);
                const isSelected = selectedOptions.includes(option.label);

                return (
                  <OptionContainer key={option.label}>
                    <OptionHeader onClick={() => toggleSection(option.label)}>
                      <Checkbox
                        type="checkbox"
                        checked={
                          isSelected ||
                          option.subOptions.every((sub) =>
                            selectedOptions.includes(sub),
                          )
                        }
                        onChange={() =>
                          handleOptionChange(option.label, option.subOptions)
                        }
                        disabled={!isEditing}
                      />
                      <OptionLabel $isSelected={isSelected}>
                        {option.label}
                      </OptionLabel>
                      <SelectedTagsContainer>
                        {selectedOptions
                          .filter((opt) => subOptionsSet.has(opt))
                          .map((selected) => (
                            <Tag key={selected}>{selected}</Tag>
                          ))}
                      </SelectedTagsContainer>
                      {option.subOptions.length > 0 && (
                        <ChevronIcon>
                          {expandedSections.includes(option.label) ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </ChevronIcon>
                      )}
                    </OptionHeader>
                    {expandedSections.includes(option.label) &&
                      option.subOptions.length > 0 && (
                        <SubOptionsContainer>
                          {option.subOptions.map((subOption) => (
                            <OptionHeader key={subOption}>
                              <Checkbox
                                type="checkbox"
                                checked={selectedOptions.includes(subOption)}
                                onChange={() =>
                                  handleOptionChange(subOption, undefined)
                                }
                                disabled={!isEditing}
                              />
                              <SubOptionLabel
                                $isSelected={selectedOptions.includes(
                                  subOption,
                                )}
                              >
                                {subOption}
                              </SubOptionLabel>
                            </OptionHeader>
                          ))}
                        </SubOptionsContainer>
                      )}
                  </OptionContainer>
                );
              })}
            </OptionListContainer>
          </NoteContainer>
        </VersionNoteWrapper>
      )}
    </>
  );
};

export default NoteSection;
