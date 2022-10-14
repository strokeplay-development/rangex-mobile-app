import { styled } from "@mui/material"
import { PropsWithChildren } from "react";
import { BG_NAVY, LINE_DARKGREY } from "../../../../styles/colors";

interface TopBarProps {
    border?: boolean,
    title?: string,
    subtitle?: string,
    hideBack?: boolean,
    fix?: boolean,
    prominent?: boolean
}

const StyledBar = styled('header')`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 8px 0 16px;
    height: 56px;
    background-color: ${BG_NAVY};

    &.border {
        border-bottom: 1px solid ${LINE_DARKGREY};
    }
    &.fix {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
    }

    & > div {
        min-width: 40px;
        min-height: 40px;
    }

    & .back {

    }

    & .title {

    }

    & .actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
`;

export default function TopBar(props: PropsWithChildren<TopBarProps>) {
    const barClass = `
        ${props.fix ? 'fix' : null} ${props.border ? 'border' : null} 
    `;

    return (
        <StyledBar className={barClass}>
            {props.hideBack ? null : <div className="back"></div>}
            {props.title ? <h2>{props.title}</h2> : null}
            {props.subtitle ? <h3>{props.subtitle}</h3> : null}
            <div className="actions">{props.children}</div>
        </StyledBar>
    )
}