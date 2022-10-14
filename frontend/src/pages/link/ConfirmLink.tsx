import { Dialog, styled } from "@mui/material";
import { PropsWithChildren } from "react";
import FullButton from "../../components/common/button/FullButton";
import { useModal } from "../../hooks";
import { DialogBox } from "../../styles";
import { BOX_NAVY } from "../../styles/colors";
import { BasicButton } from "../../styles/common";

interface ConfirmLinkProps {
    joinCode?: number;
}

export default function ConfirmLink(props: PropsWithChildren<ConfirmLinkProps>) {
    const [open, openModal, closeModal] = useModal();

    const requestJoinShop = () => {
        console.log(props.joinCode);
        
        window.JoinRequested?.postMessage(props.joinCode);

        closeModal();
    }

    return (
        <div style={{width: '100%'}}>
            {/* Activator */}
            <FullButton onClick={openModal}>Verify</FullButton>

            {/* Dialog */}
            <Dialog open={open} onClose={closeModal}>
                <DialogBox>
                    <h2>Link Shop</h2>

                    <div className="content">
                        <p>
                            Do you agree with linking your account to <strong>rangex Yangjae</strong>?
                        </p>
                    </div>

                    <div className="actions">
                        <BasicButton variant="contained" onClick={closeModal}>CANCEL</BasicButton>
                        <BasicButton variant="contained" onClick={requestJoinShop}>CONFIRM</BasicButton>
                    </div>
                </DialogBox>
            </Dialog>
        </div>
    )
}