import React, { useState } from 'react'
import { ProfileBox, Label, Form, SaveButton, ContainerLayout, FormBox, ProfileImg, FormLow, FormLeft, FormRight, LabelBox, GitTokenBox, GitTokenInput, ImgBox, NickNameInput } from './SectionEditProfile.styled'
import { useUserStore } from '../../store/userStore';
import { useMutationPatchUserInfo } from '../../hooks/useMutationCreatePR';
import { patchUserInfoType } from '../../Types/userType';


const SectionEditProfile:React.FC = () => {
    const {userInfo} = useUserStore()
    const mutation = useMutationPatchUserInfo()
    const [nickName,setNickName] = useState(userInfo?.userInfo.nickName)
    const [gitToken,setGitToken] = useState(userInfo?.userInfo.gitToken)

    const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickName(e.target.value);
    };
    
    const handleGitTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGitToken(e.target.value);
    };

    const saveUserInfo =()=>{
        mutation.mutate({
            userInfotData: {
                nickName,
                gitToken,
            } as patchUserInfoType,
          });
    };

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
                                    <NickNameInput 
                                    type="text" 
                                    defaultValue={userInfo?.userInfo.nickName}                    
                                    onChange={handleNickNameChange}/>       
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
                            <GitTokenInput type="text" 
                            defaultValue={userInfo?.userInfo.gitToken}
                            onChange={handleGitTokenChange}/>
                        </GitTokenBox>
                        <SaveButton onClick={saveUserInfo}>Save</SaveButton>   
                </FormBox>
            </ContainerLayout>
        </>
        )
}

export default SectionEditProfile