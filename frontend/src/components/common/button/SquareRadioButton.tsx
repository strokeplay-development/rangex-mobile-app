import { styled } from "@mui/material";
import { FormEventHandler, PropsWithChildren } from "react";
import { BOX_BLUE, BOX_DARKGREY } from "../../../styles/colors";
import { FONT_BASIC, FONT_SMALL } from "../../../styles/fonts";

interface RadioRequisite {
    label: string;
    value: string | number;
}

interface RadioButtonStyleProps {
    vertical?: boolean;
    stretch?: boolean;
    small?: boolean;
}

type SquareRadioButtonProps = {
    name: string;
    requisites: RadioRequisite[]
    onChange?: FormEventHandler
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
    }

    & input[type="radio"] {
        appearance: none;
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
`

export default function SquareRadioButton(props: PropsWithChildren<SquareRadioButtonProps>) {
    const getLabelClass = () => {
        return `${props.small ? 'small' : null} ${props.stretch ? 'stretch' : null}`
    }

    return (
        <StyledSquareRadio
            className={props.vertical ? 'vertical' : undefined}
            onChange={props.onChange}
            small={props.small}
            stretch={props.stretch}
            vertical={props.vertical}
        >
            {
                props.requisites.map((button, idx) => (
                    <label className={getLabelClass()} key={`:${button.value}_${idx}`}>
                        <input 
                            type="radio" 
                            key={`:${button.value}_${idx}`}
                            id={`:${button.value}_${idx}`} 
                            name={props.name} 
                            value={button.value} 
                            defaultChecked={idx === 0}
                        />
                        {button.label}
                    </label>
                ))
            }
        </StyledSquareRadio>
    )
}