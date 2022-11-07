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

export interface PracticeOverview {
    shotAvg?: number,
    shotTotal?: number,
    longest?: number
    driverAvg?: number,
    practiceCount?: number,
}

export * from './swing';