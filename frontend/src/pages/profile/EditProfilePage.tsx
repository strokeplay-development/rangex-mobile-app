import { Add } from "@mui/icons-material";
import { Avatar, Button, Fab, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/common/layout/bar/TopBar";
import MenuBox from "../../components/common/layout/menu/MenuBox";
import { BG_NAVY } from "../../styles/colors";
import { PageWithBlockSection } from "../../styles/common";
import { FONT_MEDIUM } from "../../styles/fonts";

const StyledProfileSection = styled('section')`
    display: flex;
    flex-direction: column;
    gap: 12px;

    & .profile_pic {
        position: relative;
        margin: 0 auto;
        padding-bottom: 12px;

        & .edit_pic_btn {
            position: absolute;
            right: 0;
            bottom: 10px;
            & button {
                width: 28px;
                height: 28px;
                min-height: 24px;
                border: 2px solid ${BG_NAVY};
                box-shadow: none;
            }
        }
    }
`;

const StyledInfo = styled('dl')`
    display: flex;
    justify-content: space-between;
    gap: 12px;
    & dt {
        font-size: ${FONT_MEDIUM}px;
        color: ${props => props.theme.fontColor.grey};
    }
    & dd {
        font-size: ${FONT_MEDIUM}px;
        text-align: right;
    }
`

export default function EditProfilePage() {
    const nav = useNavigate();

    const profileInfo = [
        {
            key: 'Name',
            value: 'Do Kwon'
        },
        {
            key: 'Nick name',
            value: 'Luna'
        },
        {
            key: 'Phone',
            value: '+8201034354949'
        },
        {
            key: 'Email',
            value: 'terra@rangex.golf'
        },
        {
            key: 'Gender',
            value: 'Male'
        },
        {
            key: 'Birthday',
            value: '1994.05.14'
        },
        {
            key: 'Address',
            value: '14-33, Yanjae st., Seocho-gu, Seoul-si, Republic of Korea'
        },
    ];

    const goEditProfile = () => nav('/signup/optional');

    const onLogout = () => {
        window.LogoutRequested?.postMessage('logout');
    }

    return (
        <PageWithBlockSection>
            <TopBar fix>
                <Button 
                    variant="text" 
                    color="inherit"
                    onClick={goEditProfile}
                >
                    Edit
                </Button>
            </TopBar>

            {/* Profile */}
            <StyledProfileSection>
                <div className="profile_pic">
                    <Avatar
                        src={undefined}
                        sx={{
                            width: 88,
                            height: 88
                        }}
                    />
                    <div className="edit_pic_btn">
                        <Fab size="small">
                            <Add/>
                        </Fab>
                    </div>
                </div>
                {
                    profileInfo.map(info => (
                        <StyledInfo>
                            <dt>{info.key}</dt>
                            <dd>{info.value}</dd>
                        </StyledInfo>
                    ))
                }
            </StyledProfileSection>
            
            <ul>
                <MenuBox>Edit Nick name</MenuBox>
            </ul>

            <ul>
                <MenuBox>Edit Password</MenuBox>
            </ul>

            <ul>
                <MenuBox onClick={onLogout}>Logout</MenuBox>
            </ul>
        </PageWithBlockSection>
    )
}