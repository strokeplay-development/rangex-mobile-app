import { Grid, styled } from "@mui/material";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import SquareRadioButton from "../../components/common/button/SquareRadioButton";
import TopBar from "../../components/common/layout/bar/TopBar";
import TextInput from "../../components/common/layout/input/TextInput";
import DatePicker from "../../components/common/layout/picker/DatePicker";
import { signupState } from "../../recoil/signup";
import { BottomFullButton, InputLabel, PageWithHeader } from "../../styles/common";

const StyledField = styled('div')`
    display: flex;
    flex-direction: column;
    flex: 1;
`

const StyledForm = styled('form')`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 24px 0;
`;

export enum UserOptinalInfoPageMode {
    signup, modify
}

interface OptionalInfoPageProps {
    mode?: UserOptinalInfoPageMode
}

export default function OptionalSignupPage({ mode = UserOptinalInfoPageMode.signup }: PropsWithChildren<OptionalInfoPageProps>) {
    const [signup] = useRecoilState(signupState);

    const genderList = [
        {
            label: 'MALE',
            value: 'male'
        },
        {
            label: 'FEMALE',
            value: 'female'
        },
    ];

    let topBarTitle = 'Sign up'
    let signupStepper = '2/2'
    let bottomButtonText = 'CREATE ACCOUNT'

    if (mode === UserOptinalInfoPageMode.modify) {
        topBarTitle = 'Edit profile';
        signupStepper = '';
        bottomButtonText = 'MODIFY';
    }
    
    const onCreateAccount = () => {        
        window.SignupCompleted?.postMessage(JSON.stringify(signup));
    }

    return (
        <PageWithHeader>
            <TopBar border fix title={topBarTitle}>{signupStepper}</TopBar>

            <StyledForm>
                <StyledField>
                    <InputLabel>Gender</InputLabel>
                    <SquareRadioButton
                        name="Gender"
                        requisites={genderList}
                    />
                </StyledField>

                <StyledField>
                    <InputLabel>Birth Date</InputLabel>
                    <DatePicker/>
                </StyledField>

                {/* ADDRESS */}
                <Grid container rowSpacing={2}>
                    <Grid container item sx={{":first-of-type": { paddingTop: 0 }, gap: '8px'}}>
                        <StyledField>
                            <InputLabel>Zip Code</InputLabel>
                            <TextInput label="Zip code"/>
                        </StyledField>
                        <StyledField>
                            <InputLabel>Address1</InputLabel>
                            <TextInput label="Address1"/>
                        </StyledField>
                    </Grid>

                    <Grid container item>
                        <StyledField>
                            <InputLabel>Address2</InputLabel>
                            <TextInput label="Address2"/>
                        </StyledField>
                    </Grid>

                    <Grid container item sx={{":first-of-type": { paddingTop: 0 }, gap: '8px'}}>
                        <StyledField>
                            <InputLabel>City/Town</InputLabel>
                            <TextInput label="City/Town"/>
                        </StyledField>
                        <StyledField>
                            <InputLabel>State/Province</InputLabel>
                            <TextInput label="State/Province"/>
                        </StyledField>
                    </Grid>
                </Grid>

                <BottomFullButton onClick={onCreateAccount}>{bottomButtonText}</BottomFullButton>
            </StyledForm>
        </PageWithHeader>
    );
}