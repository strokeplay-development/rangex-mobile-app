export interface StatGridData {
    dataType: string,
    data: number,
    digit?: string,
    highlighted?: boolean
}

export interface StatsGridProps {
    cols: number,
    stats: StatGridData[]
}

export interface StyledDataBoxProps {
    highlight?: boolean
}