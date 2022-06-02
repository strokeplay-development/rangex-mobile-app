import { Grid } from "@mui/material";
import { PropsWithChildren } from "react";
import { StatsGridProps } from ".";
import { StyledDataBox } from "./style";

export default function StatsGrid({ cols, stats }: PropsWithChildren<StatsGridProps>) {
    const rows = stats.length / cols + 1;

    const gridItems = (initIndex: number) => {
        const colums: JSX.Element[] = Array.from({ length: cols });
    
        return colums.map((c, idx) => {
            const sIdx = initIndex + idx;
            const statData = stats[sIdx]; 
        
            return (
                <StyledDataBox key={sIdx} highlight={statData?.highlighted}>
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

    return (
        <Grid container rowSpacing={2}>
            {Array.from({ length: rows }).map((_, idx) => (
                //  Rows
                // 첫번재 열은 위쪽 spacing 없음
                <Grid key={idx} container item sx={{":first-of-type": { paddingTop: 0 }}}>
                    { gridItems(idx * cols) }
                </Grid>
            ))}
        </Grid>
    )
}