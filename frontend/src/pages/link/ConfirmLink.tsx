import { Dialog, styled } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import FullButton from "../../components/common/button/FullButton";
import { BOX_NAVY } from "../../styles/colors";
import { BasicButton } from "../../styles/common";

interface ConfirmLinkProps {
    joinCode?: number;
}

const DialogBox = styled('div')`
    padding: 0 24px 12px 24px;
    background-color: ${BOX_NAVY};

    & h2 {
        text-align: center;
    }

    & .content {
        margin: 24px 0;
        
        & p {
            text-align: center;
        }
    }

    & .actions {
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
    }

`;

export default function ConfirmLink(props: PropsWithChildren<ConfirmLinkProps>) {
    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

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