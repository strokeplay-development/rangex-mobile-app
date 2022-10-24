import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modifyMe } from "../../api/user";
import TopBar from "../../components/common/layout/bar/TopBar";
import TextInput from "../../components/common/layout/input/TextInput";
import { me } from "../../store";
import { BottomFullButton, FlexForm, PageWithHeader } from "../../styles/common";
import { User } from "../../types";
import { webviewError, webViewLog } from "../../utils";

export default function EditNicknamePage() {
    const [user, setUser] = useRecoilState(me);
    const [nickname, setNickname] = useState<string>();
    const nav = useNavigate();

    const onChangeNickname = (e: FormEvent<HTMLInputElement>) => {
        setNickname(e.currentTarget.value);
    }

    const editNickname = async () => {
        const userInfo: User = {
            nickName: nickname
        }
        
        try {
            setUser(await modifyMe(userInfo));
            nav(-1);
        } catch (error) {
            webviewError(error);
        }
    };
    
    return (
        <PageWithHeader>
            <TopBar fix/>
            <h2 style={{margin: '8px 0 12px 0'}}>Enter new your nick name</h2>
            <FlexForm>
                <TextInput
                    label="Nick name"
                    defaultValue={user.nickName}
                    onChange={onChangeNickname}
                />
                <BottomFullButton onClick={editNickname}>
                    EDIT
                </BottomFullButton>
            </FlexForm>
        </PageWithHeader>
    );
}