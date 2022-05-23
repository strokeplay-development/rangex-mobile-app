import { Grid } from "@mui/material";
import { PropsWithChildren } from "react";
import { StatData, StatsGridProps } from ".";
import { StyledDataBox, StyledGridRow } from "./style";

export default function StatsGrid({ cols, stats }: PropsWithChildren<StatsGridProps>) {
    const rows = stats.length / cols + 1;

    const GridColumns = (initIndex: number) => {
        const colums: JSX.Element[] = Array.from({ length: cols });
    
        return colums.map((c, idx) => {
            const sIdx = initIndex + idx;
            const statData = stats[sIdx]; 
        
            return (
                <StyledDataBox key={sIdx}>
                    {
                        statData ? 
                        <>
                            <dt>{stats[sIdx].data + (stats[sIdx].digit || '')}</dt>
                            <dd>{stats[sIdx].dataType}</dd>

                        </> : null
                    }
                </StyledDataBox>
            )
        });
    }

    const GridRows = () => {
        const rowsElem: JSX.Element[] = Array.from({ length: rows });

        return (
            <>{
                rowsElem.map((r, idx) => 
                    <StyledGridRow key={idx}>
                        { GridColumns(idx * cols) }
                    </StyledGridRow>
                )
            }</>
        )
    }

    return (
        <div>
            <GridRows/>
        </div>
    )
}