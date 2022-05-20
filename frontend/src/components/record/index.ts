/**
 * Data
 */
export enum RecordType {
    PRACTICE = 'practice',
    NEW_RECORD = 'newRecord',
    SWING = 'swing',
    REGISTER = 'register'
}

interface RecordBase {
    type: RecordType
    date: string;
    image?: string;
    shopName?: string;
    shotCount?: number;
}

interface Distance {
    distance?: number;
    digit?: string;
    club?: string;
    dataType?: string;
}

export type Record = RecordBase & Distance;

export interface RecordPaperProps {
    recordData: Record
}

/**
 * Styles
 */
export interface StyledRecordEmblemProps {
    bgColor?: string;
}