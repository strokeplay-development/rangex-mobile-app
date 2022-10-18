import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { changePassword } from "../../api/auth";
import TopBar from "../../components/common/layout/bar/TopBar";
import TextInput from "../../components/common/layout/input/TextInput";
import { InputValidator, useTextInput } from "../../hooks";
import { me } from "../../store";
import { FlexForm, PageWithHeader } from "../../styles/common";
import { webviewError } from "../../utils";
import PasswordChangeButton from "./PasswordChangeButton";

export default function EditPasswordPage() {
    const user = useRecoilValue(me);
    const nav = useNavigate();

    const pwValidate: InputValidator = (value?: string) => {
        if (newPw === value) {
            return {
                isValid: true
            }
        }

        return {
            isValid: false,
            message: 'Password not matched.'
        };
    }

    const { value: newPw, onChange: onChangeNewPw } = useTextInput();
    const newPwConfirm = useTextInput(undefined, pwValidate);

    const editPw = async (password?: string) => {
        try {
            if (!newPwConfirm.isValid) return;

            await changePassword({
                userID: user.id,
                password,
                userPW: newPw
            });
            
            nav(-1);
        } catch (error) {
            webviewError(error);
        }
    };
    
    return (
        <PageWithHeader>
            <TopBar fix/>
            <h2 style={{margin: '8px 0 12px 0'}}>Enter your new password</h2>
            <FlexForm>
                <TextInput
                    label="Password"
                    name="newPw"
                    onChange={onChangeNewPw}
                />
                <TextInput
                    label="Password confirm"
                    name="newPwConfirm"
                    onChange={newPwConfirm.onChange}
                    isValid={newPwConfirm.isValid}
                    errorMessage={newPwConfirm.message}
                />

                <PasswordChangeButton onClick={editPw}/>
            </FlexForm>
        </PageWithHeader>
    );
}