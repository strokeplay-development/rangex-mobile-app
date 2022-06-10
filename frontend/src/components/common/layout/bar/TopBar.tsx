import { styled } from "@mui/material"
import { PropsWithChildren, useState } from "react";
import { LINE_DARKGREY } from "../../../../styles/colors";

interface TopBarProps {
    border?: boolean,
    title?: string,
    subtitle?: string,
    hideBack?: boolean,
    fix?: boolean
}

const StyledBar = styled('header')`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 16px;
    height: 56px;

    &.border {
        border-bottom: 1px solid ${LINE_DARKGREY};
    }
    &.fix {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
    }

    & > div {
        min-width: 24px;
        min-height: 24px;
    }

    & .back {

    }

    & .title {

    }

    & .actions {
        display: flex;
        align-items: center;
    }
`;

export default function TopBar(props: PropsWithChildren<TopBarProps>) {
    //const [barClass, setBarClass] = useState();

    const barClass = `
        ${props.fix ? 'fix' : null} ${props.border ? 'border' : null} 
    `;

    return (
        <StyledBar className={barClass}>
            {props.hideBack ? null : <div className="back"></div>}
            <div className="title">
                {props.title ? <h2>{props.title}</h2> : null}
                {props.subtitle ? <h3>{props.subtitle}</h3> : null}
            </div>
            <div className="actions">{props.children}</div>
        </StyledBar>
    )
}