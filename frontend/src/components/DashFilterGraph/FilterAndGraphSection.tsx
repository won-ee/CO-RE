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

type MonthlyData = {
  [month: string]: {
    [category: string]: CategoryData;
  };
};

type VersionData = {
  [version: string]: string[];
};

type VersionNotes = {
  [version: string]: string;
};

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
  const [selectedMonth, setSelectedMonth] = useState("Oct");
  const [selectedCategory, setSelectedCategory] = useState("Commit");
  const [selectedVersion, setSelectedVersion] = useState("1.9.1");
  const [graphData, setGraphData] = useState<CategoryData>([]);
  const [noteContent, setNoteContent] = useState<string>("");

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

  // 선택된 버전의 노트 로드
  useEffect(() => {
    if (defaultVersionNotes[selectedVersion]) {
      const savedNote = localStorage.getItem(`${selectedVersion}-note`);
      setNoteContent(savedNote ?? defaultVersionNotes[selectedVersion]);
    }
  }, [selectedVersion, defaultVersionNotes]);

  // 그래프 데이터 업데이트
  useEffect(() => {
    const categoryData = monthlyData[selectedMonth]?.[selectedCategory] || [];
    setGraphData(categoryData);
  }, [selectedMonth, selectedCategory, monthlyData]);

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
            <CartesianGrid
              vertical={false}
              stroke="#EAEAEA"
              // strokeDasharray="3 3"
            />
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
          <div className="header">
            <h2>Version Note</h2>
            <img
              src={EditIcon}
              alt="Edit Icon"
              className="edit-icon"
              onClick={toggleEditing}
            />
          </div>
          {isEditing ? (
            <textarea
              value={noteContent}
              onChange={handleNoteChange}
              rows={10}
              style={{ width: "100%", borderRadius: "10px", padding: "10px" }}
            />
          ) : (
            <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
              {noteContent}
            </pre>
          )}
        </VersionNoteWrapper>
      )}
    </FilterAndGraphLayout>
  );
};

export default FilterAndGraphSection;
