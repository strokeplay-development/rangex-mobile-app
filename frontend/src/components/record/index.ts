/**
 * Data
 */
export enum RecordType {
    PRACTICE = 'practice',
    NEW_RECORD = 'newRecord',
    SWING = 'swing',
    REGISTER = 'register'
}

export interface Distance {
    distance: number;
    digit: string;
}

interface RecordBase {
    type: RecordType
    date: string;
    image?: string;
    shopName?: string;
    shotCount?: number;
}

export type RecordWithDistance = Partial<Distance> & {
    club?: string;
    dataType?: string;
}

export type Record = RecordBase & RecordWithDistance;

export interface RecordPaperProps {
    recordData: Record
}

/**
 * Styles
 */
export interface StyledRecordEmblemProps {
    bgColor?: string;
}