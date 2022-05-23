import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import SectionHeader from "../../components/common/section/SectionHeader";
import { StatData } from "../../components/common/stats";
import StatsGrid from "../../components/common/stats/StatsGrid";
import ProfileBox from "../../components/profile/ProfileBox";
import { Record, RecordType } from "../../components/record";
import RecordPaper from "../../components/record/RecordPaper";
import { BoxList, PaperBox, Section } from "../../styles/common";

export default function HomePage() {
    const [records, setRecords] = useState<Record[]>([]);
    const [stats, setStats] = useState<StatData[]>([]); 

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
            { dataType: 'DRIVER AVG.', data: 244.5, digit: 'm' },
            { dataType: 'LONGEST', data: 234.7, digit: 'm' },
        ]);
    }, []);

    return (
        <div>
            {/* Overview */}
            <Section>
                <SectionHeader title="OVERVIEW"/>
                <PaperBox>
                    <ProfileBox/>
                    {/* 라인 */}
                    <div>

                        <StatsGrid cols={3} stats={stats}/>
                    </div>
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
        </div>
    );
}