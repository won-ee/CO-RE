import React, { useState, useEffect } from "react";
import {
  FilterAndGraphLayout,
  FilterBox,
  FilterGroupRow,
  FilterIconWrapper,
  ResetButtonBox,
  FilterLabel,
  DropdownSelect,
  GraphContainer,
} from "./FilterAndGraphSection.styled";
import { FaFilter, FaRedo } from "react-icons/fa";
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

import {
  DashVersionDataType,
  VersionDataType,
  CategoryDataType,
  VersionStatsDataType,
} from "../../Types/dashboardType";

type StatusData = { [key: string]: CategoryDataType[] };

const CustomDot: React.FC<DotProps & { index?: number }> = (props) => {
  const { cx, cy, index } = props;
  if (index && index % 2 === 0 && cx && cy) {
    return <circle cx={cx} cy={cy} r={4} fill="#3f51b5" />;
  }
  return null;
};

interface MainGraphProps {
  versiondata: DashVersionDataType[];
  versionkeysdata: VersionStatsDataType[];
  graphdata: CategoryDataType[];
  notedata: VersionDataType[];
}

const FilterAndGraphSection: React.FC<MainGraphProps> = ({
  versiondata,
  versionkeysdata,
}) => {
  const [versionData] = useState<DashVersionDataType[]>(versiondata || []);
  const [statusData] = useState<StatusData>({});
  const [versionDetails, setVersionDetails] = useState<VersionDataType | null>(
    null,
  );
  const [graphData, setGraphData] = useState<CategoryDataType[]>([]);

  const [selectedVersion, setSelectedVersion] = useState<string>("");
  const [selectedKey, setSelectedKey] = useState<string>("");

  const [showNote, setShowNote] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const updateOptions = (option: string, subOptions: string[] = []) => {
    if (selectedOptions.includes(option)) {
      return selectedOptions.filter(
        (opt) => ![option, ...subOptions].includes(opt),
      );
    }
    return Array.from(new Set([...selectedOptions, option, ...subOptions]));
  };

  const handleOptionChange = (option: string, subOptions?: string[]) => {
    setSelectedOptions(updateOptions(option, subOptions || []));
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  useEffect(() => {
    if (versiondata.length > 0) {
      setSelectedVersion(versiondata[0].id);
    }
  }, [versiondata]);

  useEffect(() => {
    const keys = Object.keys(versionkeysdata);
    if (keys.length > 0) {
      setSelectedKey(keys[0]);
    }
  }, [versionkeysdata]);

  useEffect(() => {
    const data = selectedKey ? statusData[selectedKey] : undefined;
    setGraphData(data || []);
  }, [selectedKey, statusData]);

  return (
    <FilterAndGraphLayout>
      <FilterBox>
        <FilterGroupRow>
          <FilterIconWrapper>
            <FaFilter />
          </FilterIconWrapper>
          <FilterLabel>Filter By</FilterLabel>
          <DropdownSelect
            onChange={(e) => setSelectedVersion(e.target.value)}
            value={selectedVersion}
          >
            {versionData.map((version) => (
              <option key={version.id} value={version.id}>
                {version.name || version.id}
              </option>
            ))}
          </DropdownSelect>
          <DropdownSelect
            onChange={(e) => setSelectedKey(e.target.value)}
            value={selectedKey}
          >
            {Object.keys(statusData).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </DropdownSelect>
        </FilterGroupRow>
        <ResetButtonBox
          onClick={() => {
            setSelectedVersion(versionData[0]?.id || "");
            setSelectedKey(Object.keys(statusData)[0] || "");
            setGraphData([]);
          }}
        >
          <FaRedo /> Reset Filter
        </ResetButtonBox>
      </FilterBox>

      <GraphContainer>
        <ResponsiveContainer width="100%" height={230}>
          <AreaChart
            key={`${selectedVersion}-${selectedKey}`}
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
              dataKey="count"
              stroke="#3f51b5"
              strokeWidth={2}
              fill="url(#colorGradient)"
              connectNulls
              dot={<CustomDot />}
              isAnimationActive
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
        setShowNote={setShowNote}
        selectedVersion={selectedVersion || ""}
        versionDetails={versionDetails}
        setVersionDetails={setVersionDetails}
        toggleSection={toggleSection}
        handleOptionChange={handleOptionChange}
        setIsEditing={setIsEditing}
        selectedCategory="Commit"
      />
    </FilterAndGraphLayout>
  );
};

export default FilterAndGraphSection;
