import { styled } from "@mui/material";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation(['common']);

    // Account
    const accountProps: TextInputProps = {
        required: true,
        label: t("common:label_account"),
        name: 'userAccount',
        onChange
    };

    // Nickname
    const nicknameProps: TextInputProps = {
        required: true,
        label: t("common:label_nickname"),
        name: 'nickName',
        onChange
    };

    // Name
    const nameProps: TextInputProps = {
        required: true,
        label: t("common:label_name"),
        name: 'name',
        onChange
    };

    // Password
    const passwordProps: TextInputProps = {
        required: true,
        type: 'password',
        label: t("common:label_password"),
        name: 'userPW',
        onChange,
    };

    // Password Confirm
    const passwordConfirmProps: TextInputProps = {
        type: 'password',
        label: t("common:label_password_confirm"),
        name: 'passwordConfirm',
        onChange,
        // validate(event) {
        //     console.log(inputValues.userPW, event.currentTarget.value);
            
        //     const result: ValidateResult = {
        //         isValid: inputValues.userPW === event.currentTarget.value
        //     };
            
        //     if (result.isValid === false) {
        //         result.message = 'Password not matched.';
        //     }

        //     return result;
        // },
    }

    const bottomButtonProps = {
        text: t("common:button_next"),
        onClick() {
            nav('/signup/optional');
        },
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

                <BottomFullButton onClick={bottomButtonProps.onClick}>
                    {bottomButtonProps.text}
                </BottomFullButton>
            </StyledForm>
        </PageWithHeader>
    )
}