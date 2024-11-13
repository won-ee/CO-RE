import React from 'react'
import { ProfileBox, Label, Form, SaveButton, ContainerLayout, FormBox, ProfileImg, FormLow, FormLeft, FormRight, LabelBox, GitTokenBox, GitTokenInput, EditImg, ImgBox } from './SectionEditProfile.styled'
import editButtonImg from '../../assets/EditButton.png'
interface SectionEditProfileProps{
    myInfo:{
        profileImg:string;
        name: string; 
        nickName: string; 
        email: string; 
        password: string; 
        birth: string; 
        address: string; 
        githubToken: string;}
}

const SectionEditProfile:React.FC<SectionEditProfileProps> = ({myInfo}) => {
  return (
    <>
        <ContainerLayout>
            <ImgBox>
                <ProfileImg src={myInfo.profileImg} />
                <EditImg src={editButtonImg}/>
            </ImgBox>
            <FormBox>
                <Form>
                    <FormLow>
                        <FormLeft>
                            <LabelBox>
                                <Label>Your Name</Label>
                                <ProfileBox>{myInfo.name}</ProfileBox>
                            </LabelBox>
                            <LabelBox>
                             <Label>Email</Label>
                                <ProfileBox>{myInfo.email}</ProfileBox>
                            </LabelBox>               
                        </FormLeft>
                        <FormRight>
                            <LabelBox>
                                <Label>User Name</Label>
                                <ProfileBox>{myInfo.nickName}</ProfileBox>           
                            </LabelBox>
                            <LabelBox>
                                <Label>company department / company rank</Label>
                                <ProfileBox>마케팅 / 사원</ProfileBox>
                            </LabelBox>
                        </FormRight>
                    </FormLow>
                </Form>
                <GitTokenBox>
                        <Label >Github token</Label> 
                        <GitTokenInput type="text" defaultValue={myInfo.githubToken}/>
                    </GitTokenBox>
                    <SaveButton>Save</SaveButton>   
            </FormBox>
        </ContainerLayout>
    </>
    )
}

export default SectionEditProfile