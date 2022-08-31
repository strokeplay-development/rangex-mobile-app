import { Add } from "@mui/icons-material";
import { Avatar, Button, Fab, styled } from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { fetchMe } from "../../api/user";
import TopBar from "../../components/common/layout/bar/TopBar";
import MenuBox, { MenuBoxProps } from "../../components/common/layout/menu/MenuBox";
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
    const { isLoading, isError, data } = useQuery(['me'], fetchMe);

    if (isLoading) {
        return <p>Now loading...</p>
    }

    if (isError) {
        window.ResponseReceived?.postMessage('API networks failed');
    }

    let profileInfo: any[] = [];

    if (data) {
        profileInfo = [
            {
                key: 'Name',
                value: data.name
            },
            {
                key: 'Nick name',
                value: data.nickName
            },
            {
                key: 'Phone',
                value: data.phoneNumber
            },
            {
                key: 'Email',
                value: data.email
            },
            {
                key: 'Gender',
                value: data.gender === 0 ? 'MALE' : 'FEMALE'
            },
            {
                key: 'Birthday',
                value: data.birthday
            },
            {
                key: 'Address',
                value: data.address1 + ',' + data.address2
            },
        ];
    }

    /// 닉네임 변경
    const nickNameProps: MenuBoxProps = {
        title: 'Edit Nick name',
        onClick: () => nav('/profile/nickname')
    };

    /// 패스워드 변경
    const passwordProps: MenuBoxProps = {
        title: 'Edit Password',
        onClick: () => {}
    };

    /// 로그아웃
    const logoutProps: MenuBoxProps = {
        title: 'Log out',
        onClick() {
            window.LogoutRequested?.postMessage('logout');
        }
    }

    const goEditProfile = () => nav('/profile/optional');

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
                        <StyledInfo key={info.key}>
                            <dt>{info.key}</dt>
                            <dd>{info.value}</dd>
                        </StyledInfo>
                    ))
                }
            </StyledProfileSection>
            
            <ul>
                <MenuBox {...nickNameProps}/>
            </ul>

            <ul>
                <MenuBox {...passwordProps}/>
            </ul>

            <ul>
                <MenuBox {...logoutProps}/>
            </ul>
        </PageWithBlockSection>
    )
}