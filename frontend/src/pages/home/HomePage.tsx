import { Divider } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchOverview } from "../../api/shot";
import SectionHeader from "../../components/common/layout/section/SectionHeader";
import { StatGridData } from "../../components/common/stats";
import StatsGrid from "../../components/common/stats/StatsGrid";
import ProfileBox from "../../components/profile/ProfileBox";
import { Record, RecordType } from "../../components/record";
import RecordPaper from "../../components/record/RecordPaper";
import { UNIT_DISTANCE } from "../../constants/units";
import { me, myUnits } from "../../store";
import { BoxList, PaperBox, RootPage, Section } from "../../styles/common";
import { webviewPrint } from "../../utils";
import { meterToYards } from "../../utils/measure";

export default function HomePage() {
    const user = useRecoilValue(me);
    const { DistanceType: distUnit } = useRecoilValue(myUnits);
    const { isLoading, data } = useQuery('Overview', fetchOverview);
    const [records, setRecords] = useState<Record[]>([]);
    const [stats, setStats] = useState<StatGridData[]>([]);

    const { t } = useTranslation(['main']);

    useEffect(() => {
        setRecords([
            {
                date: '2022-05-14',
                type: RecordType.PRACTICE,
                shotCount: 124
            },
            {
                date: '2022-05-14',
                type: RecordType.NEW_RECORD,
                distance: 244.3,
                digit: 'm',
                dataType: 'Drive Longest'
            },
            {
                date: '2022-05-14',
                type: RecordType.SWING,
                image: '',
                club: 'Driver',
                distance: 244.3,
                digit: 'm',
            },
            {
                date: '2022-05-14',
                type: RecordType.REGISTER,
                image: '',
                shopName: 'rangex 양재'
            },
        ]);

        if (data) {
            const driverAvg = distUnit == 1 ? Number(meterToYards(data.driverAvg).toFixed(1)) : data.driverAvg;
            const longest = distUnit == 1 ? Number(meterToYards(data.longest).toFixed(1)) : data.longest;

            setStats([
                { dataType: t('main:sum_shot_avg'), data: data.shotAvg || 0 },
                { dataType: t('main:sum_shots'), data: data.shotTotal || 0 },
                { dataType: t('main:sum_practices'), data: data.practiceCount || 0 },
                { 
                    dataType: t('main:sum_driver_avg'), 
                    data: driverAvg || 0, 
                    digit: UNIT_DISTANCE[distUnit], 
                    highlighted: true 
                },
                { 
                    dataType: t('main:sum_longest'), 
                    data: longest || 0, 
                    digit: UNIT_DISTANCE[distUnit], 
                    highlighted: true 
                },
            ]);
        }
    }, [data]);
    
    const userLastUpdated = `${t('main:sum_updated')} ` + dayjs(user.lastLoginDate).format('YYYY-MM-DD');

    if (isLoading) {
        webviewPrint('요약 가져오기');
    }

    return (
        <RootPage>
            {/* Overview */}
            <Section>
                <SectionHeader title={t('main:title_overview')}/>
                <PaperBox>
                    <ProfileBox 
                        username={user.nickName} 
                        image={user.profileImg} 
                        desc={userLastUpdated}
                    />
                    <Divider sx={{mt: '16px', mb: '16px'}}/>
                    <StatsGrid cols={3} stats={stats}/>
                </PaperBox>
            </Section>
            
            {/* History */}
            <Section>
                <SectionHeader title="HISTORY"/>
                <BoxList>
                    {records.map((record, index) =>
                        <li key={index}>
                            <RecordPaper recordData={record}/>
                        </li>
                    )}
                </BoxList>
            </Section>
        </RootPage>
    );
}