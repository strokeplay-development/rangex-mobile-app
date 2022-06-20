import { Help } from "@mui/icons-material";
import { Dialog, IconButton, Modal } from "@mui/material";
import { PropsWithChildren, ReactNode, useState } from "react";
import { PaperBox } from "../../../styles/common";

interface InfoModalProps {
    activator?: ReactNode;
    title?: string;
}

export default function InfoModal(props: PropsWithChildren<InfoModalProps>) {
    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    return (
        <div>
            {// Activator
                props.activator || 
                <IconButton onClick={openModal}>
                    <Help/>
                </IconButton>
            }

            <Modal open={open} onClose={closeModal}>
                <PaperBox className="modal bottom">
                    <h2>{props.title}</h2>
                    <p>{props.children}</p>
                </PaperBox>
            </Modal>
        </div>
    );
}