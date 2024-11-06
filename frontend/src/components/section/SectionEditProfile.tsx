import React from 'react'
import { Input, Label, Form, SaveButton, ContainerLayout, FormBox, ProfileImg, FormLow, FormLeft, FormRight, LabelBox, GitTokenBox, GitTokenInput, EditImg, ImgBox } from './SectionEditProfile.styled'
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
                                <Input type="text" defaultValue={myInfo.name} />
                            </LabelBox>
                            <LabelBox>
                             <Label>Email</Label>
                                <Input type="email" defaultValue={myInfo.email} />
                            </LabelBox>               
                        </FormLeft>
                        <FormRight>
                            <LabelBox>
                                <Label>User Name</Label>
                                <Input type="text" defaultValue={myInfo.nickName} />           
                            </LabelBox>
                            <LabelBox>
                                <Label>Password</Label>
                                <Input type="password" defaultValue={myInfo.password} />
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