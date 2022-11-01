import { Button, styled } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { requestAuthCode, verifyAuthCode } from "../../api/auth";
import FullButton from "../../components/common/button/FullButton";
import TopBar from "../../components/common/layout/bar/TopBar";
import TextInput from "../../components/common/layout/input/TextInput";
import OptionSelect from "../../components/common/layout/menu/OptionSelect";
import { PATHS } from "../../constants";
import { useSelect, useTextInput } from "../../hooks";
import { signupState } from "../../store";
import { BottomFullButton, FlexForm, PageWithHeader } from "../../styles/common";
import { webviewError } from "../../utils";

const StyledPhoneInput = styled('div')`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 8px;
`;

const StyledCodeInput = styled('div')`
    width: 100%;
    text-align: right;

    & > button {
        color: ${props => props.theme.fontColor.skyblue};
    }
`;

export default function PhoneAuthPage() {
    const dialingCode = useSelect('+82');
    const dialingCodes = ['+82', '+01', '+65'];
    const phone = useTextInput();

    const [needCode, setNeedCode] = useState(false);
    const code = useTextInput();

    const setSignup = useSetRecoilState(signupState);

    const nav = useNavigate();

    const sendAuthCode = async () => {
        try {
            const res = await requestAuthCode({
                dialingCode: dialingCode.value as string,
                phoneNumber: phone.value
            });
            
            if (res.statusCode ===  '202') {
                setNeedCode(true);
            }
            
        } catch (error) {
            webviewError(error);
        }
    }

    const confirmAuthCode = async () => {
        try {
            await verifyAuthCode({
                dialingCode: dialingCode.value as string,
                phoneNumber: phone.value,
                authCode: code.value
            });

            setSignup({phoneNumber: phone.value});

            nav(PATHS.SIGNUP.REQUIRED);
        } catch (error) {
            webviewError(error);
        }
    }

    return (
        <PageWithHeader>
            <TopBar fix/>
            <h2 style={{marginBottom: '16px'}}>휴대폰 번호 인증</h2>
            <FlexForm>
                <StyledPhoneInput>
                    <OptionSelect
                        menus={dialingCodes}
                        onChange={dialingCode.onChange}
                        defaultValue={dialingCode.value}
                    />
                    <TextInput
                        type={'number'}
                        placeholder={'휴대폰 번호 숫자만 입력'}
                        onChange={phone.onChange}
                    />
                </StyledPhoneInput>

                {
                    needCode
                    ? <StyledCodeInput>
                        <TextInput
                            type={'number'}
                            maxLength={4}
                            placeholder={'인증번호 입력'}
                            onChange={code.onChange}
                        />
                        <Button
                            variant="text"
                            onClick={sendAuthCode}
                        >
                            다시보내기
                        </Button>
                    </StyledCodeInput>
                    : <FullButton onClick={sendAuthCode}>인증번호 전송</FullButton>
                }

                <BottomFullButton onClick={confirmAuthCode}>인증완료</BottomFullButton>
            </FlexForm>
        </PageWithHeader>
    );
}