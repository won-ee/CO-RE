import React from "react";
import useNoteStore from "../../store/noteStore";
import EditIcon from "../../assets/DashboardEditButton.png";
import {
  VersionNoteWrapper,
  NoteToggleButton,
  SelectedTagsContainer,
  Tag,
  OptionContainer,
  OptionHeader,
  Checkbox,
  OptionLabel,
  SubOptionsContainer,
  SubOptionLabel,
  ChevronIcon,
  EditIconImage,
  NoteContainer,
  NoteContent,
  NoteTitle,
  NoteTextarea,
  NotePre,
  OptionListContainer,
} from "./FilterAndGraphSection.styled";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type VersionNotes = { [version: string]: string };

type NoteSectionProps = {
  isEditing: boolean;
  showNote: boolean;
  expandedSections: string[];
  selectedOptions: string[];
  selectedVersion: string;
  selectedMonth: string;
  selectedCategory: string;
  defaultVersionNotes: VersionNotes;
  setShowNote: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSection: (section: string) => void;
  handleOptionChange: (option: string, subOptions?: string[]) => void;
};

const NoteSection: React.FC<NoteSectionProps> = ({
  isEditing,
  showNote,
  expandedSections,
  selectedOptions,
  setShowNote,
  setIsEditing,
  toggleSection,
  handleOptionChange,
}) => {
  const { noteContent, setNoteContent } = useNoteStore();

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
  };

  const toggleNote = () => setShowNote((prev) => !prev);
  const toggleEditing = () => setIsEditing((prev) => !prev);

  return (
    <>
      <NoteToggleButton onClick={toggleNote}>
        {showNote ? <FaChevronUp /> : <FaChevronDown />}
        <span>Version Note</span>
      </NoteToggleButton>

      {showNote && (
        <VersionNoteWrapper>
          <EditIconImage
            src={EditIcon}
            alt="Edit Icon"
            onClick={toggleEditing}
          />
          <NoteContainer>
            <NoteContent>
              <NoteTitle>Version Note</NoteTitle>
              {isEditing ? (
                <NoteTextarea
                  value={noteContent}
                  onChange={handleNoteChange}
                  rows={10}
                />
              ) : (
                <NotePre>{noteContent}</NotePre>
              )}
            </NoteContent>

            <OptionListContainer>
              {[
                {
                  label: "업무별",
                  subOptions: ["믹싱/극판", "조립", "화성", "모듈/팩", "ESS"],
                },
                {
                  label: "사이트별(중대형)",
                  subOptions: [
                    "울산",
                    "헝가리1",
                    "헝가리2",
                    "시안",
                    "SPE",
                    "천안",
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
                          (option.subOptions.length > 0 &&
                            option.subOptions.every((sub) =>
                              selectedOptions.includes(sub),
                            ))
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
                                onChange={() => handleOptionChange(subOption)}
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
