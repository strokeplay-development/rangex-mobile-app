import { styled } from "@mui/material";


export const StyledField = styled('div')`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
`;

export const InputLabel = styled('span')`
    display: block;
    margin-bottom: 8px;
    color: ${props => props.theme.fontColor.grey};
    font-size: 14px;
`;