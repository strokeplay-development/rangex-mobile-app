import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import TopBar from "../../components/common/layout/bar/TopBar";
import TextInput, { TextInputProps, ValidateResult } from "../../components/common/layout/input/TextInput";
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
        required: true,
        label: 'Account',
        name: 'userAccount',
        onChange
    };

    // Nickname
    const nicknameProps: TextInputProps = {
        required: true,
        label: 'Nickname',
        name: 'nickName',
        onChange
    };

    // Name
    const nameProps: TextInputProps = {
        required: true,
        label: 'Name',
        name: 'name',
        onChange
    };

    // Password
    const passwordProps: TextInputProps = {
        required: true,
        type: 'password',
        label: 'Password',
        name: 'userPW',
        onChange,
    };

    // Password Confirm
    const passwordConfirmProps: TextInputProps = {
        type: 'password',
        label: 'Password confirm',
        name: 'passwordConfirm',
        onChange,
        validate(event) {
            console.log(inputValues.userPW, event.currentTarget.value);
            
            const result: ValidateResult = {
                isValid: inputValues.userPW === event.currentTarget.value
            };
            
            if (result.isValid === false) {
                result.message = 'Password not matched.';
            }

            return result;
        },
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