import { SectionCreateBranchLayout, TitleInput, DescriptionTextArea, SelectBox, MergeDirectionBox, HighLightBox, DateInputContainer, DatePickerImg, DeadLineBox, DatePickerBox, UrgentBox, UrgentButton, PriorityBox, CreateButtonBox, TabBox, RandomButton, StyledDatePickerPopper  } from "./SectionCreateBranch.styled";
import Select, { MultiValue, SingleValue, StylesConfig } from "react-select";
import { OptionType } from "../../Types/SelectType";
import { useState, ChangeEvent, forwardRef, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '../../assets/icon_calender.png'
import TabChange from "../tab/TabChange";
import SectionChangesList from "./SectionChangesList";
import SectionCommits from "./SectionCommits";
import ButtonCreateNewPR from "../buttons/ButtonCreateNewPR";
import { useMutationCreatePR, useMutationpostPRReview } from "../../hooks/useMutationCreatePR";
import ButtonSimpleSquare from "../buttons/ButtonSimpleSquare";
import { TotalReviewsType, ReviewType } from "../../Types/pullRequestType";
import CardFinalCodeReview from "../card/CardFinalCodeReview";
import {useUserStore, useProjectStore} from "../../store/userStore";
import { useQueryChangeList, useQueryCommitList, useQueryTemplate } from "../../hooks/usePullRequestData";
import { useNavigate } from "react-router-dom";
import { useMemberList, useProjectData } from "../../hooks/useUser";
import LoadingPage from "../../pages/LoadingPage";

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
  const projectInfo = useProjectStore((state)=>state)
  const navigate = useNavigate();
  const memberList = useMemberList(projectInfo.selectedProjectId)
  const projectSetting = useProjectData(projectInfo.selectedProjectId)

  const commitParams = {
    owner: projectInfo.selectedOwner,
    repo : projectInfo.selectedRepo,
    base: targetBranch?.label || "", // undefined일 경우 빈 문자열로 대체
    head: sourceBranch?.label || "", // undefined일 경우 빈 문자열로 대체
  }

  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isUrgent,setIsUrgent] = useState(false);
  const [priority,setPriority] = useState<string | null>(null)
  const [selectedTab, setSelectedTab] = useState<TabsEnum>(TabsEnum.Commit);
  const [title, setTitle] = useState<string>('')

  const [body,setBody] = useState<string>('')
  const event = "COMMENT"
  const [reviews,setReviews] = useState<ReviewType[]>([])
  const [isFinalReviewOpen,setIsFinalReviewOpen] = useState(false)
  const userInfo = useUserStore((state) => state.userInfo);
  const [postLoading,setPostLoading] = useState(false);
  if(postLoading){
    //EsLint
    }
  const mutationCreatePR = useMutationCreatePR()
  const mutationpostPRReview = useMutationpostPRReview()
  
  const changesData = useQueryChangeList(commitParams)
  const commitData = useQueryCommitList(commitParams)

  const templateData = useQueryTemplate(commitParams)
  const [content, setContent] = useState<string>("")
    useEffect(() => {
      if (templateData?.data?.template) {
          setContent(templateData?.data?.template);
          console.log('템플릿 데이터',templateData?.data?.template);
          
      }
  }, [templateData]);

  const parsedProjectMembers: OptionType[] = memberList.data ? memberList.data.filter((member) => member.userGitName && member.userGitName !== userInfo?.userInfo.gitName).map((member)=>({
    value:member.userGitName,
    label:member.userGitName
  })):[];

  const handlesIsFinalReviewOpen = ()=>{
    setIsFinalReviewOpen((isFinalReviewOpen)=>!isFinalReviewOpen)
  }

  const handleUpdateComments = (updatedReviews: ReviewType[]) => {
    setReviews(updatedReviews);
  };

  const handleTabChange = (tab: TabsEnum) => {
    setSelectedTab(tab);
  };



  const handlePostPR=()=>{
    setPostLoading(true)
    const pullRequestData = {
      title: title,
      body: body,
      base: targetBranch?.label || "", // undefined일 경우 빈 문자열로 대체
      head: sourceBranch?.label || "", // undefined일 경우 빈 문자열로 대체
      owner: projectInfo.selectedOwner,
      repo : projectInfo.selectedRepo,
      description: content,
      afterReview: false,
      deadline: selectedDate ? selectedDate.toISOString().split('T')[0] : "",
      priority: priority || "",
      // writerId: userInfo?.userInfo.id.toString() || "",
      writerId: "",
      reviewers: selectedOptions.map((idx)=>idx.value)
    };
    
    mutationCreatePR.mutate(pullRequestData,{
      onSuccess: () => {
        setPostLoading(false)
        navigate('/pullrequest'); // 성공 시 이동
      },
      onError: () =>{
        setPostLoading(false)
      }
    });
  }

  const tabComponents = {
    [TabsEnum.Commit]: <SectionCommits commits={commitData.data || []}/>,
    [TabsEnum.Change]: <SectionChangesList changes={changesData.data || []} onUpdateReviews={handleUpdateComments} />,
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
      body,
      event,
      reviews,
    }
    mutationpostPRReview.mutate({
      owner:'JEM1224',
      repo:'github-api',
      pullId:'',
      reviewData:TotalReview
    })
  }

  const handleAddReview = (content: string) => {
    setBody(content); // content를 body로 설정
    handleFinishReview(); // API 호출
};

  const handleRandomSelect = (count: number) => {
    const shuffled = parsedProjectMembers.sort(() => 0.5 - Math.random()); // Shuffle the options
    const randomSelection = shuffled.slice(0, count); // Select specified count
    setSelectedOptions(randomSelection);
  };

  const ExampleCustomInput00 = forwardRef<HTMLDivElement, { value?: string; onClick?: () => void }>(
    ({ value, onClick }, ref) => (
      <DateInputContainer onClick={onClick} ref={ref}>
        <DatePickerImg src={CalendarIcon} alt="Calendar Icon" />
        {value || "Select Date"}
      </DateInputContainer>
    )
  );
  

  return (
    postLoading ? 
    <LoadingPage/>
    :
    <SectionCreateBranchLayout>
        <MergeDirectionBox>
            From <HighLightBox>{sourceBranch?.label}</HighLightBox> into <HighLightBox>{targetBranch?.label}</HighLightBox>
        </MergeDirectionBox>
        Title
        <TitleInput type="text" placeholder="Type your title..." onChange={handleTitle} value={title}/>
        Description
        <DescriptionTextArea placeholder="Type your Details..." onChange={handleContent} value={content}/>
        <DeadLineBox>
          <DatePickerBox>
          Reviewers
            <Select<OptionType, true>  // 타입을 명시하여 isMulti가 true임을 지정
                styles={SelectBox as StylesConfig<OptionType, true>}
                options={parsedProjectMembers}
                value={selectedOptions}
                onChange={handleChange}
                isMulti={true}          // 다중 선택 가능
                isClearable
            />
          </DatePickerBox>
          <UrgentBox>
            Random Assign
            <RandomButton onClick={() => {
              const reviewerCount = projectSetting.data?.reviewerCount ?? 2;
              const count = Math.min(reviewerCount, memberList.data?.length||0); // reviewerCount와 memberList 길이 중 작은 값 선택
              handleRandomSelect(count); // handleRandomSelect에 조정된 값 전달
            }}>Random</RandomButton>
          </UrgentBox>
        </DeadLineBox>
        <DeadLineBox>
          <DatePickerBox>
            Deadline
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              customInput={<ExampleCustomInput00/>}
              dateFormat="yyyy-MM-dd" // 날짜 포맷 설정
              popperPlacement="bottom-start" // 창이 날짜 선택 필드 아래에 표시되도록 위치 지정
              popperClassName={StyledDatePickerPopper}
            />
          </DatePickerBox>
          <UrgentBox>
              Is it Urgent?
              <UrgentButton onClick={handleIsUrgent} $isUrgent={isUrgent}>
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
        <CreateButtonBox>
          <ButtonCreateNewPR text="Create New Request" btnEvent={handlePostPR}/>
        </CreateButtonBox>
        <TabBox>
          <TabChange values={Object.values(TabsEnum)} 
            selectedTab={selectedTab} 
            onTabChange={handleTabChange} />
          {reviews.length>0 && 
          <div style={{position:'relative'}}>
          <ButtonSimpleSquare $text="Finish Review" $color="white" $bgc="#1C8139" btnEvent={handlesIsFinalReviewOpen}/>
          {isFinalReviewOpen && <CardFinalCodeReview onAdd={handleAddReview} commentNums={reviews.length}/>}
          </div>}
        </TabBox>
          {tabComponents[selectedTab]}
    </SectionCreateBranchLayout>  
  );
}

export default SectionCreateBranch;
