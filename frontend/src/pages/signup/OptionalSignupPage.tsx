import { Grid, styled } from "@mui/material";
import dayjs from "dayjs";
import { FormEvent, PropsWithChildren, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import SquareRadioButton, { SquareRadioButtonProps } from "../../components/common/button/SquareRadioButton";
import TopBar from "../../components/common/layout/bar/TopBar";
import InputCover from "../../components/common/layout/input/InputCover";
import TextInput, { TextInputProps } from "../../components/common/layout/input/TextInput";
import DatePicker, { DatePickerProps, TDateValue } from "../../components/common/layout/picker/DatePicker";
import { useInput } from "../../hooks/common";
import { me } from "../../store";
import { signupState } from "../../store/signup";
import { BottomFullButton, PageWithHeader } from "../../styles/common";
import { User } from "../../types";

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
    const user = useRecoilValue(me);
    const {inputValues, onChange, setInputValue} = useInput(...useRecoilState(signupState));

    const pageInfo = mode === UserOptinalInfoPageMode.modify
        ? modifyPageInfo : signUpPageInfo;

    useEffect(() => {
        if (mode === UserOptinalInfoPageMode.modify) {
            setInputValue(user);
        }
    }, []);

    // Gender
    const genderProps: SquareRadioButtonProps = {
        name: 'Gender',
        defaultValue: inputValues.gender,
        requisites: [
            { label: 'MALE', value: 0 },
            { label: 'FEMALE', value: 1 },
        ],
        onChange(e: FormEvent<HTMLInputElement>) {
            setInputValue({
                ...inputValues,
                gender: Number(e.currentTarget.value)
            });
        }
    }

    // Birth day
    const birthDayProps: DatePickerProps = {
        defaultValue: dayjs(inputValues.birthday || '2000-01-01'),
        onChange(date: TDateValue) {
            console.log(date?.format('YYYY-MM-DD'));
            
            setInputValue({
                ...inputValues,
                birthday: date?.format('YYYY-MM-DD')
            });
        }
    }

    // Zip code
    const zipCodeProps: TextInputProps = {
        label: 'Zip code',
        name: 'zipCode',
        defaultValue: inputValues.zipCode,
        onChange    
    }
    // Address1
    const addr1Props: TextInputProps = {
        label: 'Address1',
        name: 'address1',
        defaultValue: inputValues.address1,
        onChange    
    }
    // Address2
    const addr2Props: TextInputProps = {
        label: 'Address2',
        name: 'address2',
        defaultValue: inputValues.address2,
        onChange    
    }
    // City/Town
    const cityProps: TextInputProps = {
        label: 'City/Town',
        name: 'city',
        onChange    
    }
    // State/Province
    const stateProps: TextInputProps = {
        label: 'State/Province',
        name: 'state',
        onChange    
    }

    return (
        <PageWithHeader>
            <TopBar border fix title={pageInfo.topBarTitle}>{pageInfo.stepper}</TopBar>

            <StyledForm>
                <InputCover label="Gender">
                    <SquareRadioButton {...genderProps}/>
                </InputCover>

                <InputCover label="Birth Day">
                    <DatePicker {...birthDayProps}/>
                </InputCover>

                {/* ADDRESS */}
                <Grid container rowSpacing={2}>
                    <Grid container item sx={{":first-of-type": { paddingTop: 0 }, gap: '8px'}}>
                        <TextInput {...zipCodeProps}/>
                        <TextInput {...addr1Props}/>
                    </Grid>

                    <Grid container item>
                        <TextInput {...addr2Props}/>
                    </Grid>

                    <Grid container item sx={{":first-of-type": { paddingTop: 0 }, gap: '8px'}}>
                        <TextInput {...cityProps}/>
                        <TextInput {...stateProps}/>
                    </Grid>
                </Grid>

                <BottomFullButton onClick={() => pageInfo.onClickBottomButton(inputValues)}>{pageInfo.bottomButtonText}</BottomFullButton>
            </StyledForm>
        </PageWithHeader>
    );
}