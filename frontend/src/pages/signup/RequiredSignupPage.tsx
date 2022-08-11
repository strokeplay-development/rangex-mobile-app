import { styled } from "@mui/material";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import CheckButton from "../../components/common/button/CheckButton";
import TopBar from "../../components/common/layout/bar/TopBar";
import TextInput from "../../components/common/layout/input/TextInput";
import { signupState, User } from "../../recoil/signup";
import { BottomFullButton, PageWithHeader } from "../../styles/common";

const ConfirmInput = styled('div')`
    display: flex;
    gap: 8px;
`

const StyledForm = styled('form')`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 24px;
`;

export default function RequiredSignupPage() {
    const nav = useNavigate();
    const [signup, setSignup] = useRecoilState<User>(signupState);

    const goOptionalPage = () => {
        nav('/signup/optional');
    }

    const onChangeTextInput = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        console.log(name, value);
        
        setSignup({
            ...signup,
            [name]: value
        });
    }

    return (
        <PageWithHeader>
            <TopBar border fix title="Sign up">1/2</TopBar>

            <StyledForm>
                <ConfirmInput>
                    <TextInput label="Account" name="userAccount" onChange={onChangeTextInput}/>
                    <CheckButton complete={false}/>
                </ConfirmInput>
                <ConfirmInput>
                    <TextInput label="Nick name" name="nickName" onChange={onChangeTextInput}/>
                    <CheckButton complete={false}/>
                </ConfirmInput>
                <TextInput label="Name" name="name" onChange={onChangeTextInput}/>
                <TextInput label="Password" type="password" name="userPW" onChange={onChangeTextInput}/>
                <TextInput label="Password Confirm" type="password" onChange={onChangeTextInput}/>

                <BottomFullButton onClick={goOptionalPage}>NEXT</BottomFullButton>
            </StyledForm>
        </PageWithHeader>
    )
}