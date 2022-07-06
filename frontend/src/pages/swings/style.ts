import { styled } from "@mui/material";
import { POINT_YELLOW } from "../../styles/colors";
import { FONT_SMALL } from "../../styles/fonts";

export const StyledSwingItem = styled('div')`
    position: relative;
    flex: 1;

    & .label--overlay{
        position: absolute;
        top: 4px;
        left: 4px;
        background-color: rgba(0, 0, 0, 0.5);
        font-size: ${FONT_SMALL + 'px'};
        padding: 2px 4px;
        border-radius: 4px;
    }

    & .thumbnail {
        width: 100%;
        height: 134px;
        margin-bottom: 2px;
    }

    & span {
        font-size: ${FONT_SMALL + 'px'};
        white-space: nowrap;
        text-overflow: ellipsis;

        & > strong {
            color: ${POINT_YELLOW};
        }
    }
`;