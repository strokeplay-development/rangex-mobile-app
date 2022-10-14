import { FormEvent, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import TopBar from "../../components/common/layout/bar/TopBar";
import TextInput from "../../components/common/layout/input/TextInput";
import { me } from "../../store";
import { BottomFullButton, FlexForm, PageWithHeader } from "../../styles/common";

export default function EditPasswordPage() {
    const user = useRecoilValue(me);
    const [password, setPassword] = useState<string>();

    const onChangePw = (e: FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    }

    const editPw = () => {
        
    };
    
    return (
        <PageWithHeader>
            <TopBar fix/>
            <h2 style={{margin: '8px 0 12px 0'}}>Enter your new password</h2>
            <FlexForm>
                <TextInput
                    label="Password"
                    onChange={onChangePw}
                />
                <TextInput
                    label="Password confirm"
                    onChange={onChangePw}
                />

                <BottomFullButton onClick={editPw}>
                    EDIT
                </BottomFullButton>
            </FlexForm>
        </PageWithHeader>
    );
}