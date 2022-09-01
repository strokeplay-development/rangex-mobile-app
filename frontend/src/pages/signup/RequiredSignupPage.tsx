import { styled } from "@mui/material";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import TopBar from "../../components/common/layout/bar/TopBar";
import TextInput, { TextInputProps } from "../../components/common/layout/input/TextInput";
import { useInput } from "../../hooks/common";
import { signupState } from "../../store/signup";
import { BottomFullButton, PageWithHeader } from "../../styles/common";
import { User } from "../../types";

const StyledForm = styled('form')`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 24px;
`;

export default function RequiredSignupPage() {
    const nav = useNavigate();    
    const { onChange, inputValues } = useInput<User>(...useRecoilState(signupState));

    // Account
    const accountProps: TextInputProps = {
        label: 'Account',
        name: 'userAccount',
        onChange
    };

    // Nickname
    const nicknameProps: TextInputProps = {
        label: 'Nickname',
        name: 'nickName',
        onChange
    };

    // Name
    const nameProps: TextInputProps = {
        label: 'Name',
        name: 'name',
        onChange
    };

    // Password
    const passwordProps: TextInputProps = {
        label: 'Password',
        name: 'password',
        onChange,
    };

    // Password Confirm
    const passwordConfirmProps: TextInputProps = {
        label: 'Password confirm',
        name: 'passwordConfirm',
        onChange,
        onBlur: () => {
            console.log('반응함');
            
        }
    }

    const goOptionalPage = () => {
        console.log(inputValues);
        
        nav('/signup/optional');
    }

    return (
        <PageWithHeader>
            <TopBar border fix title="Sign up">1/2</TopBar>

            <StyledForm>
                <TextInput {...accountProps}/>
                <TextInput {...nicknameProps}/>
                <TextInput {...nameProps}/>
                <TextInput {...passwordProps}/>
                <TextInput {...passwordConfirmProps}/>

                <BottomFullButton onClick={goOptionalPage}>NEXT</BottomFullButton>
            </StyledForm>
        </PageWithHeader>
    )
}