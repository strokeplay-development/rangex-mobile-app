import { useTranslation } from "react-i18next";
import TopBar from "../../components/common/layout/bar/TopBar";
import MenuBox, { MenuBoxProps } from "../../components/common/layout/menu/MenuBox";
import { PageWithBlockSection } from "../../styles/common";

export default function LanguagePage() {
    const { t } = useTranslation(['more']);

    const langs: MenuBoxProps[] = [
        {
            role: 'menu:lang_ko',
            key: 'ko',
            title: '한국어',
            onClick: () => {}
        },
        {
            role: 'menu:lang_en',
            key: 'en',
            title: 'English',
            onClick: () => {}
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