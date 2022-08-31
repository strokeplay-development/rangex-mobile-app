import { Timestamp } from "../common";

export const enum DistanceUnit {
    m = 0,
    yd = 1,
    ft = 2
}

export interface Distance {
    distance: number;
    unit: DistanceUnit;
}

export interface ShotVideo extends Distance, Timestamp {
    thumbnail?: string;
    videoUrl?: string;
    id: number;
    club?: string;
}

export type ShotVideoList = ShotVideo[];