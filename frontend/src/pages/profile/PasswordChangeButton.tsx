import { Dialog } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useModal } from "../../hooks";
import { DialogBox } from "../../styles";
import { BasicButton, BottomFullButton } from "../../styles/common";
import TextInput from "../../components/common/layout/input/TextInput";
import { useTranslation } from "react-i18next";;

interface PasswordChangeButtonProps {
    onClick: (pw?: string) => Promise<void>
}

export default function PasswordChangeButton(props: PasswordChangeButtonProps) {
    const [password, setPassword] = useState<string>();
    const [modal, openModal, closeModal] = useModal();
    const { t } = useTranslation(["common"]);
    
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    }

    const onClickButton = () => {
        props.onClick(password);
        closeModal();
    }
    
    return (
        <>
            {/* Activator */}
            <BottomFullButton onClick={openModal}>
                { t("common:button_modify") }
            </BottomFullButton>

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
                        <BasicButton variant="contained" onClick={closeModal}>
                            {t("common:button_text_cancel")}
                        </BasicButton>
                        <BasicButton variant="contained" onClick={onClickButton}>
                            {t("common:button_text_confirm")}
                        </BasicButton>
                    </div>
                </DialogBox>
            </Dialog>
        </>
    );
}