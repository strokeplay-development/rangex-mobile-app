import { Grid, styled } from "@mui/material";
import dayjs from "dayjs";
import { FormEvent, MouseEventHandler, PropsWithChildren, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modifyMe } from "../../api/user";
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
import { webviewError, webViewLog } from "../../utils";

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
    onClickBottomButton: MouseEventHandler<HTMLButtonElement>
}


export default function OptionalSignupPage({ mode = UserOptinalInfoPageMode.signup }: PropsWithChildren<OptionalInfoPageProps>) {
    const [user, setUser] = useRecoilState(me);
    const {inputValues, onChange, setInputValues} = useInput(...useRecoilState(signupState));
    const { t } = useTranslation(['common']);
    const nav = useNavigate();
    
    // 회원가입인 경우
    const signUpPageInfo: IUserOptionalInfoPage = {
        topBarTitle: 'Sign up',
        stepper: '2/2',
        bottomButtonText: t("common:button_create"),
        onClickBottomButton() {
            window.SignupCompleted?.postMessage(JSON.stringify(inputValues));
        }
    };
    
    // 회원정보 수정인 경우
    const modifyPageInfo: IUserOptionalInfoPage = {
        topBarTitle: 'Edit profile',
        bottomButtonText: t("common:button_modify"),
        async onClickBottomButton() {
            try {
                window.ResponseReceived?.postMessage(webViewLog('수정요청', inputValues));
                setUser(await modifyMe(inputValues));
                nav(-1);
            } catch (error) {
                webviewError(error);
            }
        }
    };
    
    const pageInfo = mode === UserOptinalInfoPageMode.modify
        ? modifyPageInfo : signUpPageInfo;

    // Gender
    const genderProps: SquareRadioButtonProps = {
        name: 'Gender',
        defaultValue: inputValues.gender,
        requisites: [
            { label: t("common:male"), value: 0 },
            { label: t("common:female"), value: 1 },
        ],
        onChange(e: FormEvent<HTMLInputElement>) {
            setInputValues({
                ...inputValues,
                gender: Number(e.currentTarget.value)
            });
        }
    }
    // Birth day
    const birthDayProps: DatePickerProps = {
        defaultValue: dayjs(inputValues.birthday || '2000-01-01'),
        onChange(date: TDateValue) {
            setInputValues({
                ...inputValues,
                birthday: date?.format('YYYY-MM-DD')
            });
        }
    }
    // Zip code
    const zipCodeProps: TextInputProps = {
        label: t("common:label_zipcode"),
        name: 'zipCode',
        defaultValue: user.zipCode,
        onChange    
    }
    // Address1
    const addr1Props: TextInputProps = {
        label: t("common:label_addr1"),
        name: 'address1',
        defaultValue: user.address1,
        onChange    
    }
    // Address2
    const addr2Props: TextInputProps = {
        label: t("common:label_addr2"),
        name: 'address2',
        defaultValue: user.address2,
        onChange    
    }
    // City/Town
    const cityProps: TextInputProps = {
        label: t("common:label_city"),
        name: 'city',
        onChange    
    }
    // State/Province
    const stateProps: TextInputProps = {
        label: t("common:label_state"),
        name: 'state',
        onChange    
    }

    useEffect(() => {
        if (mode === UserOptinalInfoPageMode.modify) {
            setInputValues(user);
        }
    }, [user]);

    return (
        <PageWithHeader>
            <TopBar border fix title={pageInfo.topBarTitle}>{pageInfo.stepper}</TopBar>

            <StyledForm>
                <InputCover label={t("common:label_gender")}>
                    <SquareRadioButton {...genderProps}/>
                </InputCover>

                <InputCover label={t("common:label_birthday")}>
                    <DatePicker {...birthDayProps}/>
                </InputCover>

                {/* ADDRESS */}
                <Grid container rowSpacing={2}>
                    <Grid container item sx={{":first-of-type": { paddingTop: 0 }, gap: '8px'}}>
                        <TextInput {...zipCodeProps} key="fek3"/>
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

                <BottomFullButton onClick={pageInfo.onClickBottomButton}>{pageInfo.bottomButtonText}</BottomFullButton>
            </StyledForm>
        </PageWithHeader>
    );
}