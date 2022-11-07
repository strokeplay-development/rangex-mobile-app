import { useEffect, useState } from "react";
import SectionHeader from "../../components/common/layout/section/SectionHeader";
import { MONTH } from "../../constants";
import { PageWithBox, SectionBox } from "../../styles";
import { SwingList } from "../../types";
import SwingGrid from "./SwingGrid";

type ArraySortedByMonth<T> = Array<T>;

const sortByMonth = (list: SwingList): ArraySortedByMonth<SwingList> => {
    const result: ArraySortedByMonth<SwingList> = Array.from({length: 12}, () => []);

    list.forEach((item) => {
        const month = Number(item.createdAt?.split('-')[1]);

        result[month].push(item);
    });

    return result;
}

export default function SwingsPage() {
    const [swings, setSwings] = useState<SwingList>([]);

    useEffect(() => {
        setSwings([
            {
                club: 'Wedge',
                createdAt: '2022-01-14',
                unit: 0,
                distance: 138.5,
                id: 3,
                videoUrl: 'https://rangex-user-video.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Video_2022-11-02-16-02-12.mp4'
            },
            {
                club: 'Driver',
                createdAt: '2022-01-14',
                unit: 0,
                distance: 238.5,
                id: 3
            },
            {
                club: 'Wedge',
                createdAt: '2022-02-14',
                unit: 0,
                distance: 138.5,
                id: 3
            },
            {
                club: 'Wedge',
                createdAt: '2022-05-14',
                unit: 0,
                distance: 138.5,
                id: 3
            },
            {
                club: 'Wedge',
                createdAt: '2022-05-14',
                unit: 1,
                distance: 138.5,
                id: 3
            },
            {
                club: 'Wedge',
                createdAt: '2022-05-14',
                unit: 2,
                distance: 138.5,
                id: 3
            },
        ]);
    }, []);

    return (
        <PageWithBox>
            {sortByMonth(swings).map((swings, idx) => (
                swings.length > 0 ? 
                <SectionBox>
                    <SectionHeader title={MONTH[idx - 1]}/>
                    <SwingGrid swings={swings} cols={3}/>
                </SectionBox> : null
            ))}
        </PageWithBox>
    )
}