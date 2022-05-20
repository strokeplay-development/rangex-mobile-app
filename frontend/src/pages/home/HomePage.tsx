import { useEffect, useState } from "react";
import { Record, RecordType } from "../../components/record";
import RecordPaper from "../../components/record/RecordPaper";
import { BoxList, Section } from "../../styles/common";

export default function HomePage() {
    const [records, setRecords] = useState<Record[]>([]);

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
    }, []);

    return (
        <div>
            {/* Overview */}
            <div>
                <header></header>
                <div>
                    <div className="profile"></div>
                    <div className="stats"></div>
                </div>
            </div>
            
            {/* History */}
            <Section>
                <header></header>
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