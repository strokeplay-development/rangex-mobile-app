import { useEffect, useState } from "react";
import SectionHeader from "../../components/common/layout/section/SectionHeader";
import { MONTH } from "../../constants";
import { PageWithBox, SectionBox } from "../../styles";
import { ShotVideoList } from "../../types";
import SwingGrid from "./SwingGrid";

type ArraySortedByMonth<T> = Array<T>;

const sortByMonth = (list: ShotVideoList): ArraySortedByMonth<ShotVideoList> => {
    const result: ArraySortedByMonth<ShotVideoList> = Array.from({length: 12}, () => []);

    list.forEach((item) => {
        const month = Number(item.createdAt?.split('-')[1]);

        result[month].push(item);
    });

    return result;
}

export default function SwingsPage() {
    const [swings, setSwings] = useState<ShotVideoList>([]);

    useEffect(() => {
        setSwings([
            {
                club: 'Wedge',
                createdAt: '2022-01-14',
                unit: 0,
                distance: 138.5,
                id: 3,
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