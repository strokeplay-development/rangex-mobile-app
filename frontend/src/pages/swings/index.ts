import { Distance } from "../../components/record";

export type MonthSortedList<T> = Array<T>;

export interface SwingListItem extends Distance {
    swingID: number
    thumbnail?: string,
    createdAt: string,
    club: string,
}

export type SwingList = SwingListItem[];

export interface SwingGridProps {
    swings: SwingList,
    cols: number
}

export interface SwingGridRowProps {
    initIdex: number
}