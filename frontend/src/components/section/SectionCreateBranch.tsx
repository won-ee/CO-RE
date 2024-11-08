import { SectionCreateBranchLayout, TitleInput, DescriptionTextArea, SelectBox, MergeDirectionBox, HighLightBox, DateInputContainer, DatePickerImg, DeadLineBox, DatePickerBox, UrgentBox, UrgentButton, PriorityBox, CreateButtonBox, TabBox  } from "./SectionCreateBranch.styled";
import Select, { MultiValue, SingleValue, StylesConfig } from "react-select";
import { OptionType } from "../../Types/SelectType";
import { useState, ChangeEvent } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '../../assets/icon_calender.png'
import TabChange from "../tab/TabChange";
import SectionChanges from "./SectionChanges";
// import SectionCommits from "./SectionCommits";
import ButtonCreateNewPR from "../buttons/ButtonCreateNewPR";
import { useMutationCreatePR, useMutationpostPRReview } from "../../hooks/useMutationCreatePR";
import ButtonSimpleSquare from "../buttons/ButtonSimpleSquare";
import { TotalReviewsType, ReviewType } from "../../Types/pullRequestType";
import CardFinalCodeReview from "../card/CardFinalCodeReview";

// 옵션 예시
const TempOption: OptionType[] = [
    { value: 'Alice', label: 'Alice' },
    { value: 'Bob', label: 'Bob' },
    { value: 'Elizabeth', label: 'Elizabeth' },
    { value: 'Claerk', label: 'Claerk' },
    { value: 'Volibear', label: 'Volibear' },
];

const PriorityOption: OptionType[] = [
  { value: 'low', label:'Low'},
  { value: 'medium', label:'Medium'},
  { value: 'high', label:'High'},
]

enum TabsEnum {
  Commit = 'Commit',
  Change = 'Change',
}

interface SectionCreateBranchProps {
    sourceBranch: OptionType | null;
    targetBranch: OptionType | null;
}

function SectionCreateBranch({ sourceBranch, targetBranch }: SectionCreateBranchProps) {
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isUrgent,setIsUrgent] = useState(false);
  const [priority,setPriority] = useState<string | null>(null)
  const [selectedTab, setSelectedTab] = useState<TabsEnum>(TabsEnum.Commit);
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [commit_id,setCommit_Id] = useState<string>('')
  const [body,setBody] = useState<string>('')
  const event = "COMMENT"
  const [comments,setComments] = useState<ReviewType[]>([])
  const [isFinalReviewOpen,setIsFinalReviewOpen] = useState(false)

  const handlesIsFinalReviewOpen = ()=>{
    setIsFinalReviewOpen((isFinalReviewOpen)=>!isFinalReviewOpen)
  }

  const handleUpdateComments = (updatedReviews: ReviewType[]) => {
    setComments(updatedReviews);
  };

  const handleTabChange = (tab: TabsEnum) => {
    setSelectedTab(tab);
  };

  const mutationCreatePR = useMutationCreatePR()
  const mutationpostPRReview = useMutationpostPRReview()

  const handlePostPR=()=>{
    const pullRequestData = {
      title: "Feature Update",
      body: "This update includes several feature improvements and bug fixes.",
      base: "main",
      head: "feat",
      owner: "JEM1224",
      repo: "github-api",
      description: "Detailed description of the pull request with all necessary information.",
      afterReview: false,
      deadline: "2024-12-31T23:59:59",
      priority: 1,
      writerId: "JEM1224"
    };

    mutationCreatePR.mutate(pullRequestData);
  }

  const changesData = [
    {
      file: {
        filename: "THISISFRONT-1.md",
        status: "modified",
        contents_url: "https://api.github.com/repos/JEM1224/github-api/contents/THISISFRONT-1.md?ref=1aafe0e18d189773f6fbddc5119c4a03eb3b806d",
        additions: 12,
        deletions: 14,
        changes: 26,
        patch: "@@ -1,26 +1,17 @@\n \n 천방지축 얼렁뚱땅 악동짱구\n 저\n-하늘에\n-햇님\n-달님\n-사\n-랑\n-으\n-로\n-비\n-춰\n-주\n-면\n-오\n-늘\n-은\n \n 또\n 무\n 슨\n 장\n 난\n+한\n+고통\n+절망\n+슳픔\n+분노\n 말썽\n 쟁이\n \n@@ -31,6 +22,13 @@\n 산하\n 눈\n 내린\n+사나이로\n+태어나서\n+할 일도 만다만\n+너와나 하나되어\n+\n+\n 벌판을\n 우리는 \n 간다\n+",
      },
      content: "\n천방지축 얼렁뚱땅 악동짱구\n저\n\n또\n무\n슨\n장\n난\n한\n고통\n절망\n슳픔\n분노\n말썽\n쟁이\n\n\n높은산\n깊은골\n적막한\n산하\n눈\n내린\n사나이로\n태어나서\n할 일도 만다만\n너와나 하나되어\n\n\n벌판을\n우리는 \n간다\n\n",
    },
    {
      file: {
        filename: "sds/sssddsdsd.md",
        status: "added",
        contents_url: "https://api.github.com/repos/JEM1224/github-api/contents/sds%2Fsssddsdsd.md?ref=1aafe0e18d189773f6fbddc5119c4a03eb3b806d",
        additions: 1,
        deletions: 0,
        changes: 1,
        patch: "@@ -0,0 +1 @@\n+aaasdsadasdaasd\n\\ No newline at end of file",
      },
      content: "aaasdsadasdaasd",
    }
  ];

  const tabComponents = {
    // [TabsEnum.Commit]: <SectionCommits changes={changesData} onUpdateReviews={handleUpdateComments} />,
    [TabsEnum.Commit]: <SectionChanges changes={changesData} onUpdateReviews={handleUpdateComments} />,
    [TabsEnum.Change]: <SectionChanges changes={changesData} onUpdateReviews={handleUpdateComments} />,
  };

  // 다중 선택 onChange 핸들러
  const handleChange = (options: MultiValue<OptionType>) => {
    setSelectedOptions(options as OptionType[]);
  };

  const handleIsUrgent = ()=>{
    setIsUrgent((isUrgent=>!isUrgent))
  }

  const handlePriority = (option: SingleValue<OptionType>)=>{
    setPriority(option ? option.value : null)
  }

  const handleTitle = (e:ChangeEvent<HTMLInputElement>)=>{
    setTitle(e.target.value)
  }
 
  const handleContent = (e:ChangeEvent<HTMLTextAreaElement>)=>{
    setContent(e.target.value)
  }

  const handleFinishReview = ()=>{
    const TotalReview : TotalReviewsType ={
      commit_id,
      body,
      event,
      comments,
    }
    mutationpostPRReview.mutate({
      owner:'JEM1224',
      repo:'',
      pullId:'',
      reviewData:TotalReview
    })
  }

  const handleAddReview = (content: string) => {
    setBody(content); // content를 body로 설정
    handleFinishReview(); // API 호출
};

  return (
    <SectionCreateBranchLayout>
        <MergeDirectionBox>
            From <HighLightBox>{sourceBranch?.label}</HighLightBox> into <HighLightBox>{targetBranch?.label}</HighLightBox>
        </MergeDirectionBox>
        Title
        <TitleInput type="text" placeholder="Type your title..." onChange={handleTitle} value={title}/>
        Description
        <DescriptionTextArea placeholder="Type your Details..." onChange={handleContent} value={content}/>
        Reviewers
        <Select<OptionType, true>  // 타입을 명시하여 isMulti가 true임을 지정
            styles={SelectBox as StylesConfig<OptionType, true>}
            options={TempOption}
            value={selectedOptions}
            onChange={handleChange}
            isMulti={true}          // 다중 선택 가능
            isClearable
        />
        <DeadLineBox>
          <DatePickerBox>
            Deadline
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              customInput={
              <DateInputContainer >
                <DatePickerImg src={CalendarIcon}/>
                {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
              </DateInputContainer>}
              dateFormat="yyyy/MM/dd" // 날짜 포맷 설정
              portalId="root-portal"  // Portal을 사용하여 날짜 선택 창이 body에 직접 렌더링됨
              popperPlacement="bottom-start" // 창이 날짜 선택 필드 아래에 표시되도록 위치 지정
            />
          </DatePickerBox>
          <UrgentBox>
              Is it Urgent?
              <UrgentButton onClick={handleIsUrgent} isUrgent={isUrgent}>
                {isUrgent ? 'Yes':'No'}
              </UrgentButton>
              *If you check this box, this request will not need approval.
          </UrgentBox>
        </DeadLineBox>
        Priority
        <Select
          styles={PriorityBox as StylesConfig<OptionType,false>}
          onChange={handlePriority}
          options={PriorityOption}
          isSearchable={false}
          />
        {priority}
        <CreateButtonBox>
          <ButtonCreateNewPR text="Create New Request" btnEvent={handlePostPR}/>
        </CreateButtonBox>
        <TabBox>
          <TabChange values={Object.values(TabsEnum)} 
            selectedTab={selectedTab} 
            onTabChange={handleTabChange} />
          {comments && 
          <div style={{position:'relative'}}>
          <ButtonSimpleSquare text="Finish Review" color="white" bgc="#1C8139" btnEvent={handlesIsFinalReviewOpen}/>
          {isFinalReviewOpen && <CardFinalCodeReview onAdd={handleAddReview} commentNums={comments.length}/>}
          </div>}
        </TabBox>
          {tabComponents[selectedTab]}
    </SectionCreateBranchLayout>  
  );
}

export default SectionCreateBranch;
