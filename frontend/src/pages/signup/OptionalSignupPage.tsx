import { Grid, styled } from "@mui/material";
import dayjs from "dayjs";
import { FormEvent, PropsWithChildren, useRef } from "react";
import { useRecoilState } from "recoil";
import SquareRadioButton from "../../components/common/button/SquareRadioButton";
import TopBar from "../../components/common/layout/bar/TopBar";
import TextInput from "../../components/common/layout/input/TextInput";
import DatePicker, { TDateValue } from "../../components/common/layout/picker/DatePicker";
import { signupState, User } from "../../recoil/signup";
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

interface IUserOptionalInfoPage {
    topBarTitle: string;
    stepper?: string;
    bottomButtonText: string;
    onClickBottomButton: (userInfo: User) => void;
}

const signUpPageInfo: IUserOptionalInfoPage = {
    topBarTitle: 'Sign up',
    stepper: '2/2',
    bottomButtonText: 'CREATE ACCOUNT',
    onClickBottomButton(user) {
        window.SignupCompleted?.postMessage(JSON.stringify(user));
    }
};

const modifyPageInfo: IUserOptionalInfoPage = {
    topBarTitle: 'Edit profile',
    bottomButtonText: 'MODIFY',
    onClickBottomButton(user) {
        window.ModifyUserRequested?.postMessage(JSON.stringify(user));
    }
};

export default function OptionalSignupPage({ mode = UserOptinalInfoPageMode.signup }: PropsWithChildren<OptionalInfoPageProps>) {
    const [signup, setSignup] = useRecoilState(signupState);

    const genderList = [
        { label: 'MALE', value: 0 },
        { label: 'FEMALE', value: 1 },
    ];

    const defaultBirthDay = dayjs('2000-01-01');

    const pageInfo = mode === UserOptinalInfoPageMode.modify
        ? modifyPageInfo : signUpPageInfo;

    const onChangeTextInput = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        
        setSignup({
            ...signup,
            [name]: value
        });
    }

    const onChangeGender = (e: FormEvent<HTMLInputElement>) => {
        setSignup({
            ...signup,
            gender: Number(e.currentTarget.value)
        });   
    }

    const onChangeDate = (date: TDateValue) => {
        setSignup({
            ...signup,
            birthday: date?.format('YYYY-MM-DD')
        });
    }

    return (
        <PageWithHeader>
            <TopBar border fix title={pageInfo.topBarTitle}>{pageInfo.stepper}</TopBar>

            <StyledForm>
                <StyledField>
                    <InputLabel>Gender</InputLabel>
                    <SquareRadioButton
                        name="gender"
                        requisites={genderList}
                        onChange={onChangeGender}
                    />
                </StyledField>

                <StyledField>
                    <InputLabel>Birth Date</InputLabel>
                    <DatePicker onChange={onChangeDate} defaultValue={defaultBirthDay}/>
                </StyledField>

                {/* ADDRESS */}
                <Grid container rowSpacing={2}>
                    <Grid container item sx={{":first-of-type": { paddingTop: 0 }, gap: '8px'}}>
                        <StyledField>
                            <InputLabel>Zip Code</InputLabel>
                            <TextInput label="Zip code" name="zipCode" onChange={onChangeTextInput}/>
                        </StyledField>
                        <StyledField>
                            <InputLabel>Address1</InputLabel>
                            <TextInput label="Address1" name="address1" onChange={onChangeTextInput}/>
                        </StyledField>
                    </Grid>

                    <Grid container item>
                        <StyledField>
                            <InputLabel>Address2</InputLabel>
                            <TextInput label="Address2" name="address2" onChange={onChangeTextInput}/>
                        </StyledField>
                    </Grid>

                    <Grid container item sx={{":first-of-type": { paddingTop: 0 }, gap: '8px'}}>
                        <StyledField>
                            <InputLabel>City/Town</InputLabel>
                            <TextInput label="City/Town" name="city" onChange={onChangeTextInput}/>
                        </StyledField>
                        <StyledField>
                            <InputLabel>State/Province</InputLabel>
                            <TextInput label="State/Province" name="state" onChange={onChangeTextInput}/>
                        </StyledField>
                    </Grid>
                </Grid>

                <BottomFullButton onClick={() => pageInfo.onClickBottomButton(signup)}>{pageInfo.bottomButtonText}</BottomFullButton>
            </StyledForm>
        </PageWithHeader>
    );
}