import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckButton from "../../components/common/button/CheckButton";
import TopBar from "../../components/common/layout/bar/TopBar";
import TextInput from "../../components/common/layout/input/TextInput";
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

    const goOptionalPage = () => {
        nav('/signup/optional');
    }

    return (
        <PageWithHeader>
            <TopBar border fix title="Sign up">1/2</TopBar>

            <StyledForm>
                <ConfirmInput>
                    <TextInput label="Account"/>
                    <CheckButton complete={false}/>
                </ConfirmInput>
                <ConfirmInput>
                    <TextInput label="Nick name"/>
                    <CheckButton complete={false}/>
                </ConfirmInput>
                <TextInput label="Name"/>
                <TextInput label="Password" type="password"/>
                <TextInput label="Password Confirm" type="password"/>

                <BottomFullButton onClick={goOptionalPage}>NEXT</BottomFullButton>
            </StyledForm>
        </PageWithHeader>
    )
}