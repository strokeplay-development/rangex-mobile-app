import { Check } from "@mui/icons-material";
import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, styled } from "@mui/material";
import { MouseEventHandler, PropsWithChildren, useState } from "react";
import { theme } from "../../../../App";
import { useModal } from "../../../../hooks";

export interface ModalMenuItem {
    label: string;
    value: string | number;
}

interface ModalMenuProps {
    activatorType?: 'contained' | 'outlined' | 'text';
    items: ModalMenuItem[];
    initItem?: ModalMenuItem; 
    onChange?: (value: string | number) => void;
}

const StyledActivator = styled(Button)`
  &.MuiButton-outlined {
    color: #ffffff;
    border: 1px solid #ffffff;
  }  
`;

const StyledModalList = styled(List)`
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: ${props => props.theme.bgColor?.default};
`;

export default function ModalMenu(props: PropsWithChildren<ModalMenuProps>) {
    const [isOpen, open, close] = useModal();
    const [curItem, setCurItem] = useState(props.initItem || props.items[0]);

    const onClickListItem = (item: ModalMenuItem) => {
        props.onChange?.(item.value);
        setCurItem(item);
        close();
    }

    return (
        <div>
            {
                // Activator
                props.children ||
                <StyledActivator variant={props.activatorType} onClick={open}>
                    { curItem.label }
                </StyledActivator>
            }

            <Modal 
                open={isOpen} 
                onClose={close}
                    
            >
                <StyledModalList>
                    {
                        props.items.map((item, idx) => (
                            <ListItem key={idx}>
                                <ListItemButton onClick={() => onClickListItem(item)}>
                                    <ListItemIcon>
                                        <Check 
                                            style={{
                                                visibility: item.value === curItem.value ? 'visible' : 'hidden'
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText>
                                        {item.label}
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </StyledModalList>
            </Modal>
        </div>
    );
}