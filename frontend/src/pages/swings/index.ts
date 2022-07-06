import { MouseEventHandler } from "react";
import { Distance } from "../../components/record";

export type MonthSortedList<T> = Array<T>;

export interface SwingListItem extends Distance {
    swingID: number
    thumbnail?: any,
    createdAt: string,
    club: string,
    onclick?: MouseEventHandler
}

export type SwingList = SwingListItem[];

export interface SwingGridProps {
    swings: SwingList,
    cols: number
}

export interface SwingGridRowProps {
    initIdex: number
}