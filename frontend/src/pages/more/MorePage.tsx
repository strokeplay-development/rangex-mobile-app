import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import MenuBox, { MenuBoxProps } from "../../components/common/layout/menu/MenuBox";
import ProfileBox from "../../components/profile/ProfileBox";
import { PATHS } from "../../constants";
import { me } from "../../store";
import { PageWithBox } from "../../styles";

export default function MorePage() {
    const nav = useNavigate();
    const user = useRecoilValue(me);
    const { t } = useTranslation(['more']);

    /// 프로필 편집
    const profileProps = {
        role: 'menu:edit-profile',
        probileBox: {
            username: user.nickName,
            desc: t("more:button_edit_profile")
        },
        onClick: () => nav("/profile")
    }

    /// 클럽변경
    const changeClubProps: MenuBoxProps = {
        role: 'menu:change-club',
        title: t("more:menu_change_clubs"),
        onClick: () => nav("/clubs")
    };

    /// 게임옵션 변경
    const gameOptionProps: MenuBoxProps = {
        role: 'menu:game-options',
        title: t("more:menu_practice_options"),
        onClick: () => nav("/options")
    };

    /// 매장가입
    const joinShopProps: MenuBoxProps = {
        role: 'menu:join-shop',
        title: t("more:menu_join_to_shop"),
        onClick: () => nav("/join")
    };

    /// 언어변경
    const langProps: MenuBoxProps = {
        role: 'menu:language',
        title: t("more:menu_language"),
        onClick: () => nav(PATHS.LANG)
    }

    /// 정책
    const privacyProps: MenuBoxProps = {
        role: 'menu:policy',
        title: t("more:menu_privacy_policy"),
        onClick: () => window.ThirdPartyPageRequested?.postMessage('THIRD_PRIVACY_POLICY')
    };

    /// 이용약관
    const termsProps: MenuBoxProps = {
        role: 'menu:terms',
        title: t("more:menu_terms_of_service"),
        onClick: () => window.ThirdPartyPageRequested?.postMessage('THIRD_TERMS_OF_SETVICE')
    }

    /// 라이센스
    const licenseProps: MenuBoxProps = {
        role: 'menu:licenses',
        title: t("more:menu_licenses")
    }

    /// 버전
    const versionProps: MenuBoxProps = {
        role: 'menu:version',
        title: t("more:menu_version"),
        desc: '1.0.0'
    }

    return (
        <PageWithBox>
            <ul>
                <MenuBox
                    role={profileProps.role}
                    head={
                        <ProfileBox
                            username={profileProps.probileBox.username || ''}
                            desc={profileProps.probileBox.desc}
                            image={user.profileImg}
                        />
                    }
                    onClick={profileProps.onClick}
                />
            </ul>

            <ul>
                <MenuBox {...changeClubProps}/>
                <MenuBox {...gameOptionProps}/>
                <MenuBox {...joinShopProps}/>
                <MenuBox {...langProps}/>
            </ul>

            <ul>
                <MenuBox {...privacyProps}/>
                <MenuBox {...termsProps}/>
            </ul>

            <ul>
                <MenuBox {...licenseProps}/>
            </ul>

            <ul>
                <MenuBox {...versionProps}/>
            </ul>

            <Outlet/>
        </PageWithBox>
    )
}