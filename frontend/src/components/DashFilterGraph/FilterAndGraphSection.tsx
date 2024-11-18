import React, { useState, useEffect } from "react";
import {
  FilterAndGraphLayout,
  FilterBox,
  FilterGroupRow,
  FilterIconWrapper,
  FilterLabel,
  DropdownSelect,
  GraphContainer,
} from "./FilterAndGraphSection.styled";
import { FaFilter } from "react-icons/fa";
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
import NoteSection from "./NoteSection";
import { useProjectStore } from "../../store/userStore";
import { useVersionList, useVersionStats } from "../../hooks/useDashboard";
import {
  // VersionStatsDataType,
  CategoryDataType,
} from "../../Types/dashboardType";

const CustomDot: React.FC<DotProps & { index?: number }> = (props) => {
  const { cx, cy, index } = props;
  if (index && index % 2 === 0 && cx && cy) {
    return <circle cx={cx} cy={cy} r={4} fill="#3f51b5" />;
  }
  return null;
};

export type DropdownOption = "commits" | "pullRequests" | "reviews";

const FilterAndGraphSection: React.FC = () => {
  const { selectedOwner, selectedRepo } = useProjectStore();
  const [selectedVersion, setSelectedVersion] = useState<string>("");
  const [selectedData, setSelectedData] = useState<CategoryDataType[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<DropdownOption>("commits");

  const [isEditing, setIsEditing] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option)) {
        return prev.filter((opt) => opt !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  //선택된 버젼

  const {
    data: versionList,
    error: versionListError,
    isLoading: versionListLoading,
  } = useVersionList({
    owner: selectedOwner,
    repo: selectedRepo,
  });
  if (versionListError) {
    <p>Loading...</p>;
  }
  if (versionListLoading) {
    <p>Error</p>;
  }

  const {
    data: VersionStats,
    error: VersionStatsError,
    isLoading: VersionStatsLoading,
  } = useVersionStats(selectedVersion);
  if (VersionStatsError) {
    <p>Version Stats Loading...</p>;
  }
  if (VersionStatsLoading) {
    <p>Version Stats Error</p>;
  }

  useEffect(() => {
    if (versionList && versionList?.length > 0 && !selectedVersion) {
      setSelectedVersion(versionList[0].id); // 첫 번째 버전 설정
    }
  }, [versionList, selectedVersion]);

  //전달할 데이터 설정
  useEffect(() => {
    if (VersionStats && selectedCategory) {
      const filteredData = VersionStats[selectedCategory];
      setSelectedData(filteredData || []);
    }
  }, [VersionStats, selectedCategory]);

  //버젼
  const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const version = e.target.value;
    setSelectedVersion(version);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value as DropdownOption);
  };

  const processedData = selectedData
    .map((item) => ({
      ...item,
      day: `20${item.day}`,
    }))
    .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());

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
            value={selectedVersion || (versionList?.[0]?.id ?? "")}
          >
            {versionList?.map((version, index: number) => (
              <option key={index}>{version.id}</option>
            ))}
          </DropdownSelect>
          <DropdownSelect
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="commits">Commit</option>
            <option value="pullRequests">Pull Requests</option>
            <option value="reviews">Reviews</option>
          </DropdownSelect>
        </FilterGroupRow>
      </FilterBox>

      <GraphContainer>
        <ResponsiveContainer width="100%" height={230}>
          <AreaChart
            key={`${selectedVersion}-${selectedCategory}`}
            data={processedData}
            margin={{ left: -10, right: 10, top: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E7EEFD" stopOpacity={1} />
                <stop offset="50%" stopColor="#E7EEFD" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#E7EEFD" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              tickLine={false}
              interval="preserveStartEnd"
              tickFormatter={(tick) => tick}
              tick={{ fontSize: 10, fill: "#555" }}
            />
            <YAxis
              domain={["auto", "auto"]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#555" }}
            />
            <Tooltip />
            <CartesianGrid vertical={false} stroke="#EAEAEA" />
            <Area
              type="linear"
              dataKey="count"
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

      <NoteSection
        isEditing={isEditing}
        showNote={showNote}
        expandedSections={expandedSections}
        selectedOptions={selectedOptions}
        selectedVersion={selectedVersion}
        selectedMonth=""
        selectedCategory={selectedCategory}
        defaultVersionNotes={{}}
        selectedNoteVersion={selectedVersion}
        setShowNote={setShowNote}
        setIsEditing={setIsEditing}
        toggleSection={toggleSection}
        handleOptionChange={handleOptionChange}
      />
    </FilterAndGraphLayout>
  );
};

export default FilterAndGraphSection;
