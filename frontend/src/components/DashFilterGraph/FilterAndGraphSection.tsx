import React, { useState, useEffect } from "react";
import EditIcon from "../../assets/DashboardEditButton.png";
import {
  FilterAndGraphLayout,
  FilterBox,
  FilterGroupRow,
  FilterIconWrapper,
  ResetButtonBox,
  FilterLabel,
  DropdownSelect,
  GraphContainer,
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
} from "./FilterAndGraphSection.styled";
import { FaFilter, FaRedo, FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  DotProps,
} from "recharts";

type CategoryData = { day: number; value: number }[];
type MonthlyData = { [month: string]: { [category: string]: CategoryData } };
type VersionData = { [version: string]: string[] };
type VersionNotes = { [version: string]: string };

const CustomDot: React.FC<DotProps & { index?: number }> = (props) => {
  const { cx, cy, index } = props;
  if (index && index % 2 === 0 && cx && cy) {
    return <circle cx={cx} cy={cy} r={4} fill="#3f51b5" />;
  }
  return null;
};

const FilterAndGraphSection: React.FC = () => {
  const [versionData, setVersionData] = useState<VersionData>({});
  const [monthlyData, setMonthlyData] = useState<MonthlyData>({});
  const [defaultVersionNotes, setDefaultVersionNotes] = useState<VersionNotes>(
    {},
  );
  const [showNote, setShowNote] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [selectedVersion, setSelectedVersion] = useState(() => {
    const savedVersion = localStorage.getItem("lastSelectedVersion");
    return savedVersion ? savedVersion : "1.9.1";
  });

  const [selectedOptions, setSelectedOptions] = useState<string[]>(() => {
    const savedOptions = localStorage.getItem(
      `selectedOptions-${selectedVersion}`,
    );
    return savedOptions ? JSON.parse(savedOptions) : [];
  });

  const [selectedMonth, setSelectedMonth] = useState("Oct");
  const [selectedCategory, setSelectedCategory] = useState("Commit");
  const [graphData, setGraphData] = useState<CategoryData>([]);
  const [noteContent, setNoteContent] = useState<string>("");

  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/version_data.json");
        const data = await response.json();
        setVersionData(data.versionData);
        setMonthlyData(data.monthlyData);
        setDefaultVersionNotes(data.defaultVersionNotes);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const savedOptions = localStorage.getItem(
      `selectedOptions-${selectedVersion}`,
    );
    setSelectedOptions(savedOptions ? JSON.parse(savedOptions) : []);
    localStorage.setItem("lastSelectedVersion", selectedVersion);
  }, [selectedVersion]);

  useEffect(() => {
    if (defaultVersionNotes[selectedVersion]) {
      const savedNote = localStorage.getItem(`${selectedVersion}-note`);
      setNoteContent(savedNote ?? defaultVersionNotes[selectedVersion]);
    }
  }, [selectedVersion, defaultVersionNotes]);

  useEffect(() => {
    const categoryData = monthlyData[selectedMonth]?.[selectedCategory] || [];
    setGraphData(categoryData);
  }, [selectedMonth, selectedCategory, monthlyData]);

  useEffect(() => {
    localStorage.setItem(
      `selectedOptions-${selectedVersion}`,
      JSON.stringify(selectedOptions),
    );
  }, [selectedOptions, selectedVersion]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedNote = e.target.value;
    setNoteContent(updatedNote);
    localStorage.setItem(`${selectedVersion}-note`, updatedNote);
  };

  const toggleNote = () => setShowNote((prev) => !prev);

  const toggleEditing = () => setIsEditing((prev) => !prev);

  const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const version = e.target.value;
    setSelectedVersion(version);
    setSelectedMonth(versionData[version][0]);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  const handleOptionChange = (option: string, subOptions?: string[]) => {
    if (subOptions) {
      if (selectedOptions.includes(option)) {
        setSelectedOptions((prev) =>
          prev.filter((opt) => ![option, ...subOptions].includes(opt)),
        );
      } else {
        setSelectedOptions((prev) => {
          const newOptions = [...prev, option, ...subOptions];
          return Array.from(new Set(newOptions));
        });
      }
    } else {
      if (selectedOptions.includes(option)) {
        setSelectedOptions((prev) => prev.filter((opt) => opt !== option));
      } else {
        setSelectedOptions((prev) => {
          const newOptions = [...prev, option];
          return Array.from(new Set(newOptions));
        });
      }
    }
  };

  return (
    <FilterAndGraphLayout>
      <FilterBox>
        <FilterGroupRow>
          <FilterIconWrapper>
            <FaFilter />
          </FilterIconWrapper>
          <FilterLabel>Filter By</FilterLabel>
          <DropdownSelect
            onChange={handleVersionChange}
            value={selectedVersion}
          >
            {Object.keys(versionData).map((version) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </DropdownSelect>
          <DropdownSelect onChange={handleMonthChange} value={selectedMonth}>
            {versionData[selectedVersion]?.map((month) => (
              <option key={month} value={month}>
                {month} 2024
              </option>
            ))}
          </DropdownSelect>
          <DropdownSelect
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="Commit">Commit</option>
            <option value="Comment">Comment</option>
            <option value="Issue">Issue</option>
            <option value="PR">Pull Requests</option>
            <option value="HotFix">HotFix</option>
          </DropdownSelect>
        </FilterGroupRow>
        <ResetButtonBox
          onClick={() => {
            setSelectedVersion("1.9.1");
            setSelectedMonth("Sep");
            setSelectedCategory("Commit");
            setSelectedOptions([]);
          }}
        >
          <FaRedo /> Reset Filter
        </ResetButtonBox>
      </FilterBox>

      <GraphContainer>
        <ResponsiveContainer width="100%" height={230}>
          <AreaChart
            key={`${selectedMonth}-${selectedCategory}-${graphData.length}`}
            data={graphData}
            margin={{ left: -10, right: 10, top: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E7EEFD" stopOpacity={1} />
                <stop offset="50%" stopColor="#E7EEFD" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#E7EEFD" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tickLine={false} interval={4} />
            <YAxis
              domain={["auto", "auto"]}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip />
            <CartesianGrid vertical={false} stroke="#EAEAEA" />
            <Area
              type="linear"
              dataKey="value"
              stroke="#3f51b5"
              strokeWidth={2}
              fill="url(#colorGradient)"
              connectNulls
              dot={<CustomDot />}
              isAnimationActive={true}
              animationDuration={2500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </GraphContainer>

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

          <div style={{ display: "flex", gap: "40px" }}>
            <div style={{ flex: 1 }}>
              <div className="header">
                <h2>Version Note</h2>
              </div>
              {isEditing ? (
                <textarea
                  value={noteContent}
                  onChange={handleNoteChange}
                  rows={10}
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                />
              ) : (
                <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                  {noteContent}
                </pre>
              )}
            </div>

            <div style={{ flex: 1, marginTop: "40px" }}>
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
                const isExpanded = expandedSections.includes(option.label);
                const subOptions = option.subOptions || [];
                const isSelected = selectedOptions.includes(option.label);

                return (
                  <OptionContainer key={option.label}>
                    <OptionHeader onClick={() => toggleSection(option.label)}>
                      <Checkbox
                        type="checkbox"
                        checked={
                          isSelected ||
                          (subOptions.length > 0 &&
                            subOptions.every((sub) =>
                              selectedOptions.includes(sub),
                            ))
                        }
                        onChange={() =>
                          handleOptionChange(option.label, subOptions)
                        }
                        disabled={!isEditing}
                      />
                      <OptionLabel isSelected={isSelected}>
                        {option.label}
                      </OptionLabel>
                      <SelectedTagsContainer>
                        {selectedOptions
                          .filter((opt) => subOptions.includes(opt))
                          .map((selected) => (
                            <Tag key={selected}>{selected}</Tag>
                          ))}
                      </SelectedTagsContainer>
                      {subOptions.length > 0 && (
                        <ChevronIcon>
                          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                        </ChevronIcon>
                      )}
                    </OptionHeader>
                    {isExpanded && subOptions.length > 0 && (
                      <SubOptionsContainer>
                        {subOptions.map((subOption) => (
                          <OptionHeader key={subOption}>
                            <Checkbox
                              type="checkbox"
                              checked={selectedOptions.includes(subOption)}
                              onChange={() => handleOptionChange(subOption)}
                              disabled={!isEditing}
                            />
                            <SubOptionLabel
                              isSelected={selectedOptions.includes(subOption)}
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
            </div>
          </div>
        </VersionNoteWrapper>
      )}
    </FilterAndGraphLayout>
  );
};

export default FilterAndGraphSection;
