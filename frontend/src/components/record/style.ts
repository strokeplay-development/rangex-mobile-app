import { styled } from "@mui/material";
import { StyledRecordEmblemProps } from ".";
import { POINT_YELLOW } from "../../styles/colors";
import { PaperBox } from "../../styles/common";

// Record Layout
export const RecordLayout = styled(PaperBox)`
    display: flex;
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

// Record right side emblem
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

// Record contents - descriptions
export const StyledRecordDesc = styled('p')`
    & strong {
        color: ${POINT_YELLOW};
    }
`;