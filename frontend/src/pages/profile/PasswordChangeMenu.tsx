import { Dialog } from "@mui/material";
import { verify } from "crypto";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { verifyPassword } from "../../api/auth";
import TextInput from "../../components/common/layout/input/TextInput";
import MenuBox, { MenuBoxProps } from "../../components/common/layout/menu/MenuBox";
import { PATHS } from "../../constants";
import { useModal } from "../../hooks";
import { me } from "../../store";
import { DialogBox } from "../../styles";
import { BasicButton } from "../../styles/common";
import { webviewError } from "../../utils";

export default function PasswordChangeMenu() {
    const user = useRecoilValue(me);
    const [password, setPassword] = useState<string>();
    const [modal, openModal, closeModal] = useModal();
    const { t } = useTranslation(['more']);
    const nav = useNavigate();

    // 패스워드 메뉴 프롭스
    const passwordProps: MenuBoxProps = {
        role: 'menu:edit-password',
        title: t("more:menu_edit_password"),
        onClick: async () => {
            openModal();
        }
    };
    
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    }

    // 기존 패스워드 확인
    const onClickConfirm = async () => {
        try {
            const isVerified = await verifyPassword({
                userID: user.id,
                password
            });

            if (isVerified) {
                nav(PATHS.PROFILE.PASSWORD);
            }
        } catch (error) {
            webviewError(error);
        }
    } 
    
    return (
        <>
            {/* Activator */}
            <MenuBox {...passwordProps}/>

            {/* Dialog */}
            <Dialog open={modal} onClose={closeModal} >
                <DialogBox>
                    <h2>Password check</h2>

                    <div className="content">
                        <TextInput
                            label="Password"
                            onChange={onChangePassword}
                        />
                    </div>

                    <div className="actions">
                        <BasicButton variant="contained" onClick={closeModal}>CANCEL</BasicButton>
                        <BasicButton variant="contained" onClick={onClickConfirm}>CONFIRM</BasicButton>
                    </div>
                </DialogBox>
            </Dialog>
        </>
    );
}