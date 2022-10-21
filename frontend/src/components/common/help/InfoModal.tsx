import { Help } from "@mui/icons-material";
import { IconButton, Modal } from "@mui/material";
import { PropsWithChildren, ReactNode, useState } from "react";
import { useModal } from "../../../hooks";
import { PaperBox } from "../../../styles/common";

interface InfoModalProps {
    activator?: ReactNode;
    title?: string;
}

export default function InfoModal(props: PropsWithChildren<InfoModalProps>) {
    const [isOpen, open, close] = useModal();

    return (
        <div>
            {// Activator
                props.activator || 
                <IconButton onClick={open}>
                    <Help/>
                </IconButton>
            }

            <Modal open={isOpen} onClose={close}>
                <PaperBox className="modal bottom">
                    <h2>{props.title}</h2>
                    <p>{props.children}</p>
                </PaperBox>
            </Modal>
        </div>
    );
}