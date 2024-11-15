import React from 'react'
import { ProfileBox, Label, Form, SaveButton, ContainerLayout, FormBox, ProfileImg, FormLow, FormLeft, FormRight, LabelBox, GitTokenBox, GitTokenInput, ImgBox, NickNameInput } from './SectionEditProfile.styled'
import { useUserStore } from '../../store/userStore';


const SectionEditProfile:React.FC = () => {
    const {userInfo} = useUserStore()

    return (
        <>
            <ContainerLayout>
                <ImgBox>
                    <ProfileImg src={userInfo?.userInfo.image} />
                </ImgBox>
                <FormBox>
                    <Form>
                        <FormLow>
                            <FormLeft>
                                <LabelBox>
                                    <Label>Your Name</Label>
                                    <ProfileBox>{userInfo?.userInfo.name}</ProfileBox>
                                </LabelBox>
                                <LabelBox>
                                    <Label>Nick Name</Label>
                                    <NickNameInput type="text" defaultValue={userInfo?.userInfo.nickName}/>           
                                </LabelBox>
                            </FormLeft>
                            <FormRight>
                                <LabelBox>
                                <Label>Email</Label>
                                    <ProfileBox>{userInfo?.userInfo.email}</ProfileBox>
                                </LabelBox>               
                            </FormRight>
                        </FormLow>
                    </Form>
                    <GitTokenBox>
                            <Label >Github token</Label> 
                            <GitTokenInput type="text" defaultValue={userInfo?.userInfo.gitToken}/>
                        </GitTokenBox>
                        <SaveButton>Save</SaveButton>   
                </FormBox>
            </ContainerLayout>
        </>
        )
}

export default SectionEditProfile