import { colors, Paper } from "@mui/material";
import { PropsWithChildren } from "react";
import { SwingListItem } from ".";
import { StyledSwingItem } from "./style";
import SwingThumbnail from "../../assets/images/thumb_swing.png";

export default function SwingItem(props: PropsWithChildren<SwingListItem>) {
    const created = props.createdAt.split('-');
    const createdDate = created[1] + '.' + created[2];

    const imgSrc = props.thumbnail || SwingThumbnail;

    return (
        <StyledSwingItem onClick={props.onclick}>
            <label className="label--overlay">{createdDate}</label>
            <img src={imgSrc} alt="swing_thumbnail" className="thumbnail"/>
            <span>
                {props.club} · <strong>{props.distance + props.digit}</strong>
            </span>
        </StyledSwingItem>
    )
} 