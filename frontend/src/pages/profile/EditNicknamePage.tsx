import { FormEvent, useState } from "react";
import TopBar from "../../components/common/layout/bar/TopBar";
import TextInput from "../../components/common/layout/input/TextInput";
import { User } from "../../recoil/signup";
import { BottomFullButton, FlexForm, PageWithHeader } from "../../styles/common";

export default function EditNicknamePage() {
    const [nickname, setNickname] = useState<string>();

    const onChangeNickname = (e: FormEvent<HTMLInputElement>) => {
        setNickname(e.currentTarget.value);
    }

    const editNickname = () => {
        const userInfo: User = {
            nickName: nickname
        }
        window.ModifyUserRequested?.postMessage(JSON.stringify(userInfo));
    };
    
    return (
        <PageWithHeader>
            <TopBar fix/>
            <h2 style={{margin: '8px 0 12px 0'}}>Enter new your nick name</h2>
            <FlexForm>
                <TextInput
                    label="Nick name"
                    onChange={onChangeNickname}
                />

                <BottomFullButton onClick={() => editNickname()}>
                    EDIT
                </BottomFullButton>
            </FlexForm>
        </PageWithHeader>
    );
}