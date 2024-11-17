import React, { useEffect, useState } from "react";
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
import { useVersionNote, useEditVersion } from "../../hooks/useDashboard";

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
  selectedNoteVersion: string;
  setShowNote: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSection: (section: string) => void;
  handleOptionChange: (option: string, subOptions?: string[]) => void;
};

const fieldMappings: { [key: string]: string } = {
  mixingKneading: "믹싱/극판",
  assembly: "조립",
  modulePack: "모듈/팩",
  chemicalProcessing: "화성",
  ess: "ESS",
  ulsan: "울산",
  hungary1: "헝가리1",
  hungary2: "헝가리2",
  xian: "시안",
  spe: "SPE",
  cheonan: "천안",
};

const NoteSection: React.FC<NoteSectionProps> = ({
  isEditing,
  showNote,
  expandedSections,
  // selectedOptions,
  setShowNote,
  setIsEditing,
  toggleSection,
  // handleOptionChange,
  selectedNoteVersion,
}) => {
  const { data, isLoading, error } = useVersionNote(selectedNoteVersion);
  const { mutate: editVersion, isLoading: isSaving } =
    useEditVersion(selectedNoteVersion);
  const [noteContent, setNoteContent] = useState<string>("");
  const [selectedOptionsState, setSelectedOptionsState] = useState<string[]>(
    [],
  );

  // 데이터 가져온 후 초기화
  useEffect(() => {
    if (data) {
      // Note content 초기화
      setNoteContent(data.content || "");

      // Checkbox 상태 초기화
      const selected = Object.entries(data)
        .filter(([key, value]) => value === true && key in fieldMappings)
        .map(([key]) => fieldMappings[key]);
      setSelectedOptionsState(selected);
    }
  }, [data]);

  // 편집 모드 활성화/비활성화
  const toggleEditing = () => {
    if (isEditing) {
      const updatedData = {
        content: noteContent,
        ...Object.fromEntries(
          Object.entries(fieldMappings).map(([key, label]) => [
            key,
            selectedOptionsState.includes(label), // true/false로 변환
          ]),
        ),
      };

      console.log("Sending data to server:", updatedData);

      editVersion(updatedData, {
        onSuccess: () => {
          setIsEditing(false);
          alert("Version note updated successfully.");
        },
        onError: () => {
          alert("Failed to update version note.");
        },
      });
    } else {
      setIsEditing(true);
    }
  };

  // Note 텍스트 변경
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
  };

  // 체크박스 선택/해제
  const handleCheckboxOptionChange = (option: string) => {
    setSelectedOptionsState((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter((selected) => selected !== option); // 선택 해제
      } else {
        return [...prevSelectedOptions, option]; // 선택 추가
      }
    });
  };

  // Label 체크박스 상태 변경
  const handleLabelOptionChange = (subOptions: string[]) => {
    const isLabelSelected = subOptions.every((sub) =>
      selectedOptionsState.includes(sub),
    );
    if (isLabelSelected) {
      // 전체 해제
      subOptions.forEach((subOption) => handleCheckboxOptionChange(subOption));
    } else {
      // 전체 선택
      subOptions.forEach((subOption) => {
        if (!selectedOptionsState.includes(subOption)) {
          handleCheckboxOptionChange(subOption);
        }
      });
    }
  };

  // Note 섹션 열기/닫기
  const toggleNote = () => setShowNote((prev) => !prev);

  if (isLoading) return <p>Loading note...</p>;
  if (error) return <p>Error loading note</p>;

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
                  disabled={isSaving}
                />
              ) : (
                <NotePre>{noteContent}</NotePre>
              )}
            </NoteContent>

            <OptionListContainer>
              {[
                {
                  label: "업무별",
                  subOptions: [
                    fieldMappings.mixingKneading,
                    fieldMappings.assembly,
                    fieldMappings.chemicalProcessing,
                    fieldMappings.modulePack,
                    fieldMappings.ess,
                  ],
                },
                {
                  label: "사이트별(중대형)",
                  subOptions: [
                    fieldMappings.ulsan,
                    fieldMappings.hungary1,
                    fieldMappings.hungary2,
                    fieldMappings.xian,
                    fieldMappings.spe,
                    fieldMappings.cheonan,
                  ],
                },
              ].map((option) => {
                const subOptionsSet = new Set(option.subOptions || []);
                const areAllSelected = option.subOptions.every((subOption) =>
                  selectedOptionsState.includes(subOption),
                );

                return (
                  <OptionContainer key={option.label}>
                    <OptionHeader onClick={() => toggleSection(option.label)}>
                      <Checkbox
                        type="checkbox"
                        checked={areAllSelected}
                        onChange={() =>
                          handleLabelOptionChange(option.subOptions)
                        }
                        disabled={!isEditing}
                      />

                      <OptionLabel $isSelected={areAllSelected}>
                        {option.label}
                      </OptionLabel>
                      <SelectedTagsContainer>
                        {selectedOptionsState
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
                                checked={selectedOptionsState.includes(
                                  subOption,
                                )}
                                onChange={() =>
                                  handleCheckboxOptionChange(subOption)
                                }
                                disabled={!isEditing}
                              />
                              <SubOptionLabel
                                $isSelected={selectedOptionsState.includes(
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
