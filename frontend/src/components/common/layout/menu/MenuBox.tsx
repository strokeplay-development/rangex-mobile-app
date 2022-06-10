import { ChevronRight } from "@mui/icons-material";
import { ListItemButton, styled } from "@mui/material";
import { MouseEventHandler, PropsWithChildren } from "react";
import { BG_NAVY, TXT_GREY } from "../../../../styles/colors";

interface MenuBoxProps {
    onClick?: MouseEventHandler;
    head?: JSX.Element;
    tail?: JSX.Element;
    desc?: string;
}

const StyledMenuBox = styled(ListItemButton)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 16px 16px 16px 20px;
    background-color: ${BG_NAVY};

    & .tail {
        margin-right: 4px;
    }

    & h3.desc {
        color: ${TXT_GREY};
    }
    
    &:hover {
        background-color: ${BG_NAVY};
    }
`;

export default function MenuBox(props: PropsWithChildren<MenuBoxProps>) {
    const renderHead = () => {
        if (props.head) return props.head;
        
        return <h3>{props.children}</h3>
    }

    const renderTail = () => {
        if (props.desc) return <h3 className="desc tail">{props.desc}</h3>
        
        return <ChevronRight/>;
    }

    return (
        <StyledMenuBox onClick={props.onClick}>
            { renderHead() }
            { renderTail() }
        </StyledMenuBox>
    )
}