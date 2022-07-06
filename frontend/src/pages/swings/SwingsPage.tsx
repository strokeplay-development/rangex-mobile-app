import { useEffect, useState } from "react";
import { MonthSortedList, SwingList } from ".";
import SectionHeader from "../../components/common/layout/section/SectionHeader";
import { RootPage, Section } from "../../styles/common";
import SwingGrid from "./SwingGrid";
import SwingItem from "./SwingItem";

const MONTH: string[] = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

const sortByMonth = (list: SwingList): MonthSortedList<SwingList> => {
    const result: MonthSortedList<SwingList> = Array.from({length: 12}, () => []);

    list.forEach((item) => {
        const month = Number(item.createdAt.split('-')[1]);

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
                digit: 'm',
                distance: 138.5,
                swingID: 3,
            },
            {
                club: 'Driver',
                createdAt: '2022-01-14',
                digit: 'm',
                distance: 238.5,
                swingID: 3
            },
            {
                club: 'Wedge',
                createdAt: '2022-02-14',
                digit: 'm',
                distance: 138.5,
                swingID: 3
            },
            {
                club: 'Wedge',
                createdAt: '2022-05-14',
                digit: 'm',
                distance: 138.5,
                swingID: 3
            },
            {
                club: 'Wedge',
                createdAt: '2022-05-14',
                digit: 'm',
                distance: 138.5,
                swingID: 3
            },
            {
                club: 'Wedge',
                createdAt: '2022-05-14',
                digit: 'm',
                distance: 138.5,
                swingID: 3
            },
        ]);
    }, []);

    return (
        <RootPage>
            {sortByMonth(swings).map((swings, idx) => (
                swings.length > 0 ? 
                <Section key={idx}>
                    <SectionHeader title={MONTH[idx - 1]}/>
                    <SwingGrid swings={swings} cols={3}/>
                </Section> : null
            ))}
        </RootPage>
    )
}