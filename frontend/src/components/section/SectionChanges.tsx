import React, { useState,useEffect } from 'react';
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
  LineNumberBox,
  LineSymbol,
  CardCodeReviewReadBox,
} from './SectionChanges.styled';
import Vector from '../../assets/low.png'
import ButtonReview from '../buttons/ButtonReview';
import CardCodeReview from '../card/CardCodeReview';
import { ReviewType } from '../../Types/pullRequestType';
import CardCodeReviewRead from '../card/CardCodeReviewRead';

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
  onUpdateReviews: (reviews: ReviewType[]) => void;
}

type LineType = 'add' | 'remove' | 'context' | 'collapsed'|'hunkHeader';

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
      
      // 기존 'context' 대신 'hunkHeader' 타입으로 구분
      result.push({ type: 'hunkHeader', content: line, originalLineNumber: null, modifiedLineNumber: null });
    } else if (line.startsWith('+')) {
      // "+" 기호를 제거하고 content에 저장
      result.push({ type: 'add', content: line.slice(1), originalLineNumber: null, modifiedLineNumber: modifiedLineNumber++ });
    } else if (line.startsWith('-')) {
      // "-" 기호를 제거하고 content에 저장
      result.push({ type: 'remove', content: line.slice(1), originalLineNumber: originalLineNumber++, modifiedLineNumber: null });
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

const SectionChanges: React.FC<SectionChangesProps> = ({ changes, onUpdateReviews }) => {
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>(
    () => changes.reduce((acc, _, index) => ({ ...acc, [index]: true }), {})
  );
  const [expandedGroups, setExpandedGroups] = useState<{ [key: number]: boolean }>({});
  const [hoveredLineId, setHoveredLineId] = useState<number | null>(null); // 현재 호버된 줄의 ID 상태
  const [reviewLineIndex, setReviewLineIndex] = useState<number | null>(null); // 리뷰가 표시될 줄의 인덱스
  const [reviews,setReviews] = useState<ReviewType[]>([])
  const [path, setPath] = useState<string>('');
  const [startLine, setStartLine] = useState<number>(0);
  const [endLine, setEndLine] = useState<number>(0);
  const [commitId, setCommitId] = useState("123abc456");
  const [body, setBody] = useState(""); 
  if (body) {
    //null
    }

  // 리뷰가 업데이트될 때마다 onUpdateReviews 호출
useEffect(() => {
  onUpdateReviews(reviews);
}, [reviews, onUpdateReviews]);

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleCollapse = (id: number) => {
    setExpandedGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReviewIndex = (index:number, filename:string)=>{
    setReviewLineIndex((prevIndex) => (prevIndex === index ? null : index)); // 동일 줄 클릭 시 닫힘
    setStartLine(index);
    setEndLine(index+1)
    setPath(filename)
  }

  const handleCancel = () => {
    setReviewLineIndex(null); // 리뷰 창 닫기
  };
  
 const handleAddReview = (content: string) => {
  const newReview: ReviewType = {
    path,
    startLine,
    endLine,
    commitId,
    body:content,
  };
  
  setReviews((prevReviews) => prevReviews ? [...prevReviews, newReview] : [newReview]);
  setBody(""); // body 초기화
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
                      <LineContainer onClick={() => toggleCollapse(line.id!)} style={{ flexDirection: 'column', alignItems: 'start', cursor:'pointer' }} className={line.type}>
                        <LineContent className={line.type}>
                          {expandedGroups[line.id!]
                            ? `▲ Hide ${line.count} hidden lines`
                            : `▼ Show ${line.count} hidden lines`}
                        </LineContent>
                        {expandedGroups[line.id!] && (
                          <CollapsedLinesContent>
                            {line.content.split('\n').map((collapsedLine, collapsedIdx) => (
                              <LineContainer key={collapsedIdx} style={{backgroundColor:'#F6F8FA'}}>
                                <LineNumber>{line.originalLineNumber !== null ? line.originalLineNumber + collapsedIdx + 1 : ''}</LineNumber>
                                <LineNumber>{line.modifiedLineNumber !== null ? line.modifiedLineNumber + collapsedIdx + 1 : ''}</LineNumber>
                                <LineSymbol/>
                                <LineContent>{collapsedLine}</LineContent>
                              </LineContainer>
                            ))}
                          </CollapsedLinesContent>
                        )}
                      </LineContainer>
                    ) : line.type === 'hunkHeader' ? (
                      <LineContainer className="hunkHeader">
                        <LineNumberBox className={line.type}>
                          <LineNumber>{line.originalLineNumber !== null ? line.originalLineNumber + 1 : ''}</LineNumber>
                          <LineNumber>{line.modifiedLineNumber !== null ? line.modifiedLineNumber + 1 : ''}</LineNumber>
                          <LineSymbol/>
                        </LineNumberBox>
                        <LineContent>{line.content}</LineContent>
                      </LineContainer>
                    ) : (
                      <>
                      <LineContainer className={line.type}
                        onMouseEnter={() => setHoveredLineId(idx)}
                        onMouseLeave={() => setHoveredLineId(null)}>        
                        <LineNumberBox className={line.type}>
                          <LineNumber>{line.originalLineNumber !== null ? line.originalLineNumber + 1 : ''}</LineNumber>
                          <LineNumber>{line.modifiedLineNumber !== null ? line.modifiedLineNumber + 1 : ''}</LineNumber>
                        </LineNumberBox>
                        <LineSymbol className={line.type}>
                          {hoveredLineId === idx ? (<ButtonReview btnEvent={() => handleReviewIndex(idx, change.file.filename)} />):
                          line.type === 'add' ? '+' : line.type === 'remove' ? '-' : ''}
                        </LineSymbol>
                        <LineContent className={line.type}>{line.content}</LineContent>
                      </LineContainer>
                      {reviews.length > 0 ? (reviews.filter((review) => review.startLine === idx).map((review, index) => (
                              <CardCodeReviewReadBox>
                                <CardCodeReviewRead key={index} review={review}/>
                              </CardCodeReviewReadBox>
                            ))
                        ) : null}
                      {reviewLineIndex === idx && <CardCodeReview onCancel={handleCancel} onAdd={handleAddReview}/>}
                      </>
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
