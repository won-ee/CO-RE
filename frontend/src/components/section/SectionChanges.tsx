import React, { useState } from 'react';
import {
  ChangeCard,
  Header,
  StatusBadge,
  FileInfo,
  PatchContent,
  LineContainer,
  LineNumber,
  LineContent,
  CollapsedLinesContent,
  HeaderToggle,
  VectorImg,
} from './SectionChanges.styled';
import Vector from '../../assets/low.png'

interface SectionChangesProps {
  changes: {
    file: {
      filename: string;
      status: string;
      additions: number;
      deletions: number;
      patch: string;
    };
    content: string;
  }[];
}

type LineType = 'add' | 'remove' | 'context' | 'collapsed';

interface Line {
  type: LineType;
  content: string;
  originalLineNumber: number | null;
  modifiedLineNumber: number | null;
  id?: number;
  count?: number;
}

const parsePatchWithCollapsedContent = (patch: string, content: string): Line[] => {
  const patchLines = patch ? patch.split('\n') : [];
  const contentLines = content.split('\n');
  const result: Line[] = [];
  let originalLineNumber = 0;
  let modifiedLineNumber = 0;
  let currentContentLine = 0;

  const addCollapsedGroup = (start: number, end: number) => {
    const collapsedContent = contentLines.slice(start, end).join('\n');
    result.push({
      type: 'collapsed',
      content: collapsedContent,
      originalLineNumber: null,
      modifiedLineNumber: start,
      count: end - start,
      id: result.length,
    });
  };

  patchLines.forEach((line) => {
    if (line.startsWith('@@')) {
      const match = line.match(/@@ -(\d+),\d+ \+(\d+),(\d+) @@/);
      if (match) {
        const newOriginalLineNumber = parseInt(match[1], 10) - 1;
        const newModifiedLineNumber = parseInt(match[2], 10) - 1;
        const modifiedLength = parseInt(match[3], 10);

        if (currentContentLine < newModifiedLineNumber) {
          addCollapsedGroup(currentContentLine, newModifiedLineNumber);
          currentContentLine = newModifiedLineNumber;
        }

        originalLineNumber = newOriginalLineNumber;
        modifiedLineNumber = newModifiedLineNumber;
        currentContentLine += modifiedLength;
      }
      result.push({ type: 'context', content: line, originalLineNumber: null, modifiedLineNumber: null });
    } else if (line.startsWith('+')) {
      result.push({ type: 'add', content: line, originalLineNumber: null, modifiedLineNumber: modifiedLineNumber++ });
    } else if (line.startsWith('-')) {
      result.push({ type: 'remove', content: line, originalLineNumber: originalLineNumber++, modifiedLineNumber: null });
    } else {
      result.push({
        type: 'context',
        content: contentLines[modifiedLineNumber] || line,
        originalLineNumber: originalLineNumber++,
        modifiedLineNumber: modifiedLineNumber++,
      });
    }
  });

  return result;
};

const SectionChanges: React.FC<SectionChangesProps> = ({ changes }) => {
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({});
  const [expandedGroups, setExpandedGroups] = useState<{ [key: number]: boolean }>({});

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleCollapse = (id: number) => {
    setExpandedGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      {changes.map((change, index) => (
        <ChangeCard key={index}>
          <Header onClick={() => toggleCard(index)} style={{ cursor: 'pointer' }}>
            <HeaderToggle>
            <span>{expandedCards[index] ? <VectorImg src={Vector} isExpanded={expandedCards[index]}/> : <VectorImg src={Vector} isExpanded={expandedCards[index]}/> } </span>
            <span>{change.file.filename}</span>
            </HeaderToggle>
            <StatusBadge status={change.file.status}>{change.file.status.toUpperCase()}</StatusBadge>
          </Header>

          {expandedCards[index] && (
            <>
              <FileInfo>
                <span>+{change.file.additions} additions</span>, <span>-{change.file.deletions} deletions</span>
              </FileInfo>

              <PatchContent>
                {parsePatchWithCollapsedContent(change.file.patch, change.content).map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line.type === 'collapsed' ? (
                      <LineContainer onClick={() => toggleCollapse(line.id!)} style={{ flexDirection: 'column', alignItems: 'start' }}>
                        <LineContent className={line.type}>
                          {expandedGroups[line.id!]
                            ? `▲ Hide ${line.count} hidden lines`
                            : `▼ Show ${line.count} hidden lines`}
                        </LineContent>
                        {expandedGroups[line.id!] && (
                          <CollapsedLinesContent>
                            {line.content.split('\n').map((collapsedLine, collapsedIdx) => (
                              <LineContainer key={collapsedIdx}>
                                <LineNumber>{line.originalLineNumber !== null ? line.originalLineNumber + collapsedIdx + 1 : ''}</LineNumber>
                                <LineNumber>{line.modifiedLineNumber !== null ? line.modifiedLineNumber + collapsedIdx + 1 : ''}</LineNumber>
                                <LineContent>{collapsedLine}</LineContent>
                              </LineContainer>
                            ))}
                          </CollapsedLinesContent>
                        )}
                      </LineContainer>
                    ) : (
                      <LineContainer className={line.type}>
                        <LineNumber>{line.originalLineNumber !== null ? line.originalLineNumber + 1 : ''}</LineNumber>
                        <LineNumber>{line.modifiedLineNumber !== null ? line.modifiedLineNumber + 1 : ''}</LineNumber>
                        <LineContent className={line.type}>{line.content}</LineContent>
                      </LineContainer>
                    )}
                  </React.Fragment>
                ))}
              </PatchContent>
            </>
          )}
        </ChangeCard>
      ))}
    </div>
  );
};

export default SectionChanges;
