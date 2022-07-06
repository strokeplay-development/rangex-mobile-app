import { PageWithBlockSection } from "../../styles/common";
import TempShotData from "../../assets/images/swing_data.png"
import TopBar from "../../components/common/layout/bar/TopBar";

export default function ShotDataPage() {
    return (
        <PageWithBlockSection>
            <TopBar fix/>
            <img src={TempShotData} alt="shot data" style={{
                width: '100%',
                height: 'auto'
            }}/>
        </PageWithBlockSection>
    )
}