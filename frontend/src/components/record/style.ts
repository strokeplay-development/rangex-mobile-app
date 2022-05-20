import { Paper, styled } from "@mui/material";
import { StyledRecordEmblemProps } from ".";

export const RecordLayout = styled(Paper)`
    display: flex;
    padding: 16px;
    gap: 10px;

    & dl {
      flex: 1;

      & dt {
        ${props => props.theme.fontStyle.label}
        color: ${props => props.theme.fontColor.grey};
        margin-bottom: 8px;
      }
    }
`;

export const StyledEmblem = styled('div', {shouldForwardProp: (prop) => prop !== 'bgColor'})<StyledRecordEmblemProps>`
    width: 64px;
    height: 64px;
    border-radius: 8px;
    background-color: ${props => props.bgColor || props.theme.palette.background.default};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const StyledRecordDesc = styled('p')`
    & strong {
        color: ${(props) => props.theme.palette.primary.main};
    }
`;