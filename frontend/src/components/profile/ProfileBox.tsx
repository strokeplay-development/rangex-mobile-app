import { Avatar } from "@mui/material";
import { PropsWithChildren } from "react";
import { ProfileBoxProps } from ".";
import { StyledProfile } from "./style";

export default function ProfileBox({ image, username, desc }: PropsWithChildren<ProfileBoxProps>) {
    return (
        <StyledProfile>
            <Avatar 
                alt={username}
                src={image || undefined}
                sx={{
                    width: 42,
                    height: 42
                }}
            />
            <dl>
                <dt>{username}</dt>
                <dd>{desc}</dd>
            </dl>
        </StyledProfile>
    );
}