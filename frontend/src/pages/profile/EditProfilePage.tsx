import { Add } from "@mui/icons-material";
import { Avatar, Button, Fab, styled } from "@mui/material";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import TopBar from "../../components/common/layout/bar/TopBar";
import MenuBox, { MenuBoxProps } from "../../components/common/layout/menu/MenuBox";
import { PATHS } from "../../constants";
import { me } from "../../store";
import { BG_NAVY } from "../../styles/colors";
import { PageWithBlockSection } from "../../styles/common";
import { FONT_MEDIUM } from "../../styles/fonts";

interface ProfileInfoProps {
    role?: string;
    label?: string;
    value?: string | number;
}

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
    const user = useRecoilValue(me);
    const { t } = useTranslation(['common', 'more']);

    const requestNewPicture = () => {
        window.NewProfilePictureRequested?.postMessage('New Profile Picture');
    };

    let profileInfo: ProfileInfoProps[] = [];

    if (user) {
        profileInfo = [
            {
                role: 'name',
                label: t("common:label_name"),
                value: user.name
            },
            {
                role: 'nickname',
                label: t("common:label_nickname"),
                value: user.nickName
            },
            {
                role: 'phone',
                label: t("common:label_phone"),
                value: user.phoneNumber
            },
            {
                role: 'email',
                label: t("common:label_email"),
                value: user.email
            },
            {
                role: 'gender',
                label: t("common:label_gender"),
                value: user.gender === 0 ? 'MALE' : 'FEMALE'
            },
            {
                role: 'birthday',
                label: t("common:label_birthday"),
                value: dayjs(user.birthday).format('YYYY-MM-DD')
            },
            {
                role: 'address',
                label: t("common:label_address"),
                value: user.address1 + ', ' + user.address2
            },
        ];
    }

    /// 닉네임 변경
    const nickNameProps: MenuBoxProps = {
        role: 'menu:edit-nickname',
        title: t("more:menu_edit_nickname"),
        onClick: () => nav('/profile/nickname')
    };

    /// 패스워드 변경
    const passwordProps: MenuBoxProps = {
        role: 'menu:edit-password',
        title: t("more:menu_edit_password"),
        onClick: () => nav(PATHS.PROFILE.PASSWORD)
    };

    /// 로그아웃
    const logoutProps: MenuBoxProps = {
        role: 'menu:logout',
        title: t("more:menu_logout"),
        onClick() {
            window.LogoutRequested?.postMessage('logout');
        }
    }

    const goEditProfile = () => nav('/profile/optional');

    return (
        <PageWithBlockSection>
            <TopBar fix>
                <Button
                    role={'button:edit'} 
                    variant="text" 
                    color="inherit"
                    onClick={goEditProfile}
                >
                    {t("common:button_edit")}
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
                        <Fab size="small" onClick={requestNewPicture}>
                            <Add/>
                        </Fab>
                    </div>
                </div>
                {
                    profileInfo.map(info => (
                        <StyledInfo 
                            key={`key:${info.role}`} 
                            role={`info:${info.role}`}
                            aria-describedby={`desc:${info.role}`}
                        >
                            <dt>{info.label}</dt>
                            <dd id={`desc:${info.role}`}>{info.value}</dd>
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