import { styled } from "@mui/material";
import { FormEventHandler, MutableRefObject, PropsWithChildren, Ref, RefObject, useEffect } from "react";
import { BOX_BLUE, BOX_DARKGREY } from "../../../styles/colors";
import { FONT_BASIC, FONT_SMALL } from "../../../styles/fonts";
import { webviewPrint } from "../../../utils";

interface RadioRequisite {
    label: string;
    value: string | number;
}

interface RadioButtonStyleProps {
    vertical?: boolean;
    stretch?: boolean;
    small?: boolean;
}

export type SquareRadioButtonProps = {
    name: string;
    requisites: RadioRequisite[];
    onChange?: FormEventHandler;
    defaultValue?: unknown;
    minInputCount?: number;
} & RadioButtonStyleProps;

const StyledSquareRadio = styled('div',{
    shouldForwardProp: (prop) => prop !== 'vertical' && prop !== 'stretch' && prop !== 'small'
})<RadioButtonStyleProps>`
    display: flex;
    align-items: center;
    gap: 8px;

    ${props => props.vertical ? 'flex-direction: column;' : null}

    & label {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px 12px;
        font-size: ${FONT_BASIC}px;
        border-radius: 4px;
        overflow: hidden;
        z-index: 1;

        ${props => props.stretch ? 'flex: 1;' : null}
        ${props => props.small ? `font-size: ${FONT_SMALL}px;` : null}

        &:active {
            transition: none;
        }
    }

    & input[type="radio"] {
        appearance: none;
        -webkit-appearance: none;
        -webkit-border-radius: 4px;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: -1;
        background-color: ${BOX_DARKGREY};
        &:checked {
            background-color: ${BOX_BLUE};
        }
    }

    & .vacant {
        flex: 1;
        padding: 6px 12px;
    }
`

export default function SquareRadioButton(props: PropsWithChildren<SquareRadioButtonProps>) {
    const getLabelClass = `${props.small ? 'small' : null} ${props.stretch ? 'stretch' : null}`;

    const isUnderMinRequisites = props.minInputCount && props.minInputCount > props.requisites.length;

    return (
        <StyledSquareRadio
            className={props.vertical ? 'vertical' : undefined}
            small={props.small}
            stretch={props.stretch}
            vertical={props.vertical}
        >
            {
                props.requisites.map((button, idx) => (
                    <label className={getLabelClass} key={`:${button.value}_${idx}`}>
                        <input 
                            type="radio" 
                            key={`:${button.label}_${idx}`}
                            id={`:${button.label}_${idx}`} 
                            name={props.name} 
                            value={button.value}
                            checked={button.value == (props.defaultValue || 0)}
                            defaultChecked={button.value === 0}
                            onChange={props.onChange}
                        />
                        {button.label}
                    </label>
                ))
            }
            {
                isUnderMinRequisites ? <div className="vacant"/> : null
            }
        </StyledSquareRadio>
    )
}