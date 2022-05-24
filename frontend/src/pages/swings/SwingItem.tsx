import { colors, Paper } from "@mui/material";
import { PropsWithChildren } from "react";
import { SwingListItem } from ".";
import { StyledSwingItem } from "./style";

export default function SwingItem(props: PropsWithChildren<SwingListItem>) {
    const created = props.createdAt.split('-');
    const createdDate = created[1] + '.' + created[2];

    return (
        <StyledSwingItem>
            <label className="label--overlay">{createdDate}</label>
            {props.thumbnail
                ? <img src={props.thumbnail} alt="swing_thumbnail" className="thumbnail"/>
                : <Paper color={colors.grey[50]} className="thumbnail"/> 
            }
            <span>
                {props.club} · <strong>{props.distance + props.digit}</strong>
            </span>
        </StyledSwingItem>
    )
} 