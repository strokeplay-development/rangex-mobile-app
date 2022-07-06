import { Divider, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import SectionHeader from "../../components/common/layout/section/SectionHeader";
import { StatGridData } from "../../components/common/stats";
import StatsGrid from "../../components/common/stats/StatsGrid";
import FirstLink from "../link/FirstLink";
import ProfileBox from "../../components/profile/ProfileBox";
import { Record, RecordType } from "../../components/record";
import RecordPaper from "../../components/record/RecordPaper";
import { BoxList, PageWithHeader, PaperBox, RootPage, Section } from "../../styles/common";

export default function HomePage() {
    const [records, setRecords] = useState<Record[]>([]);
    const [stats, setStats] = useState<StatGridData[]>([]);

    const [me, setMe] = useState({
        profileImage: null,
        userName: 'Mitchell Kim',
        updatedAt: 'Updated 2022-05-14',
        linkedShops: []
    });

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

        setStats([
            { dataType: 'SHOTS AVG.', data: 117 },
            { dataType: 'SHOT', data: 1137 },
            { dataType: 'PRACTICES', data: 17 },
            { dataType: 'DRIVER AVG.', data: 244.5, digit: 'm', highlighted: true },
            { dataType: 'LONGEST', data: 234.7, digit: 'm', highlighted: true },
        ]);
    }, []);

    return (
        <RootPage>
            {/* Overview */}
            <Section>
                <SectionHeader title="OVERVIEW"/>
                <PaperBox>
                    <ProfileBox 
                        username={me.userName} 
                        image={me.profileImage || undefined} 
                        desc={me.updatedAt}    
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