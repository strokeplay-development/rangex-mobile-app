import { styled } from "@mui/material"
import MenuBox from "../../components/common/layout/menu/MenuBox";
import ProfileBox from "../../components/profile/ProfileBox";
import { BG_BLACK } from "../../styles/colors";

const StyledMorePage = styled('div')`
    min-height: 100vh;
    padding: 56px 0 80px 0;
    background-color: ${BG_BLACK};

    & ul {
        margin-bottom: 16px;
    }
`;

export default function MorePage() {
    return (
        <StyledMorePage>
            <ul>
                <MenuBox
                    head={
                        <ProfileBox
                            username="Mitchell Kim"
                            desc="Edit Profile"
                        />
                    }
                />
            </ul>
            <ul>
                <MenuBox>Change Club</MenuBox>
                <MenuBox>Practice Options</MenuBox>
                <MenuBox>Link to Shop</MenuBox>
            </ul>
            <ul>
                <MenuBox>Privacy Policy</MenuBox>
                <MenuBox>Terms of Service</MenuBox>
            </ul>
            <ul>
                <MenuBox>Licences</MenuBox>
            </ul>
            <ul>
                <MenuBox desc="1.0.2">Version</MenuBox>
            </ul>
        </StyledMorePage>
    )
}