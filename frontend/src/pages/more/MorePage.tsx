
import { Outlet, useNavigate } from "react-router-dom";
import MenuBox, { MenuBoxProps } from "../../components/common/layout/menu/MenuBox";
import ProfileBox from "../../components/profile/ProfileBox";
import { PageWithBox } from "../../styles";

export default function MorePage() {
    const nav = useNavigate();

    const goEditProfile = () => nav("/profile");

    /// 클럽변경
    const changeClubProps: MenuBoxProps = {
        title: 'Change Club',
        onClick: () => nav("/clubs")
    };

    /// 게임옵션 변경
    const gameOptionProps: MenuBoxProps = {
        title: 'Game Options',
        onClick: () => nav("/options")
    };

    /// 매장가입
    const joinShopProps: MenuBoxProps = {
        title: 'Join the shop',
        onClick: () => nav("/join")
    };

    /// 정책
    const policyProps: MenuBoxProps = {
        title: 'Privacy Policy'
    };

    /// 이용약관
    const termsProps: MenuBoxProps = {
        title: 'Terms of Service'
    }

    /// 라이센스
    const licenseProps: MenuBoxProps = {
        title: 'Licenses'
    }

    /// 버전
    const versionProps: MenuBoxProps = {
        title: 'Version',
        desc: '1.0.0'
    }

    return (
        <PageWithBox>
            <ul>
                <MenuBox
                    head={
                        <ProfileBox
                            username="Mitchell Kim"
                            desc="Edit Profile"
                        />
                    }
                    onClick={goEditProfile}
                />
            </ul>

            <ul>
                <MenuBox {...changeClubProps}/>
                <MenuBox {...gameOptionProps}/>
                <MenuBox {...joinShopProps}/>
            </ul>

            <ul>
                <MenuBox {...policyProps}/>
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