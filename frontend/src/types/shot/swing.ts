import { Distance } from ".";
import { Timestamp } from "../common";

export interface Swing extends Distance, Timestamp {
    thumbnail?: string;
    videoUrl?: string;
    id: number;
    club?: string;
}

export type SwingList = Swing[];