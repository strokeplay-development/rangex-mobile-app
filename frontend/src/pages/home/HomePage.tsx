import { Divider } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchOverview } from "../../api/shot";
import SectionHeader from "../../components/common/layout/section/SectionHeader";
import { StatGridData } from "../../components/common/stats";
import StatsGrid from "../../components/common/stats/StatsGrid";
import ProfileBox from "../../components/profile/ProfileBox";
import { Record, RecordType } from "../../components/record";
import RecordPaper from "../../components/record/RecordPaper";
import { me } from "../../store";
import { BoxList, PaperBox, RootPage, Section } from "../../styles/common";
import { webviewPrint } from "../../utils";

export default function HomePage() {
    const user = useRecoilValue(me);
    const { isLoading, data } = useQuery('Overview', fetchOverview);
    const [records, setRecords] = useState<Record[]>([]);
    const [stats, setStats] = useState<StatGridData[]>([]);

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
            setStats([
                { dataType: 'SHOTS AVG.', data: data.shotAvg || 0 },
                { dataType: 'SHOTS', data: data.shotTotal || 0 },
                { dataType: 'PRACTICES', data: 0 },
                { dataType: 'DRIVER AVG.', data: data.driverAvg || 0, digit: 'm', highlighted: true },
                { dataType: 'LONGEST', data: data.longest || 0, digit: 'm', highlighted: true },
            ]);
        }
    }, [data]);
    
    const userLastUpdated = 'Updated ' + dayjs(user.lastLoginDate).format('YYYY-MM-DD');

    if (isLoading) {
        webviewPrint('요약 가져오기');
    }

    return (
        <RootPage>
            {/* Overview */}
            <Section>
                <SectionHeader title="OVERVIEW"/>
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