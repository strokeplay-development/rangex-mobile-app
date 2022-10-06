import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/common/layout/bar/TopBar";
import MenuBox, { MenuBoxProps } from "../../components/common/layout/menu/MenuBox";
import { PageWithBlockSection } from "../../styles/common";

export const LANG_CODES = {
    KR: 'ko',
    US: 'en',
    SG: 'en'
}

export default function LanguagePage() {
    const nav = useNavigate();
    const { t, i18n } = useTranslation(['more']);

    const changeLanguage = (lang: string) => {
        // 웹뷰 언어변경
        i18n.changeLanguage(lang);
        // 앱 언어변경 요청
        window.LanguageChangeRequested?.postMessage(lang);
        
        nav(-1);
    }

    const langs: MenuBoxProps[] = [
        {
            role: 'menu:lang_ko',
            key: 'ko',
            title: '한국어',
            onClick: () => changeLanguage(LANG_CODES.KR)
        },
        {
            role: 'menu:lang_en',
            key: 'en',
            title: 'English',
            onClick: () => changeLanguage(LANG_CODES.US)
        }
    ]

    return (
        <PageWithBlockSection>
            <TopBar fix title={t("more:menu_language")}/>

            <ul>
                {
                    langs.map(lang => {
                        return <MenuBox {...lang}/>
                    })
                }
            </ul>
        </PageWithBlockSection>
    );
}