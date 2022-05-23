import { Avatar } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import { ProfileBoxProps } from ".";
import { StyledProfile } from "./style";

export default function ProfileBox({ desc }: PropsWithChildren<ProfileBoxProps>) {
    const [me, setMe] = useState({
        profileImage: null,
        userName: 'Mitchell Kim',
        updatedAt: '2022-05-14'
    });

    return (
        <StyledProfile>
            <Avatar 
                alt={me.userName}
                src={me.profileImage || undefined}
                sx={{
                    width: 42,
                    height: 42
                }}
            />
            <dl>
                <dt>{me.userName}</dt>
                <dd>{me.updatedAt}</dd>
            </dl>
        </StyledProfile>
    );
}