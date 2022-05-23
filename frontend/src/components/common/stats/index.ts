export interface StatData {
    dataType: string,
    data: number,
    digit?: string,
}

export interface StatsGridProps {
    cols: number,
    stats: StatData[]
}