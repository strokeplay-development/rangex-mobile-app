import { Grid } from "@mui/material";
import { PropsWithChildren } from "react";
import { SwingGridProps, SwingGridRowProps } from ".";
import { StyledSwingItem } from "./style";
import SwingItem from "./SwingItem";

const COLS = 3;


export default function SwingGrid(props: PropsWithChildren<SwingGridProps>) {
    const rows = props.swings.length / COLS + 1;

    const SwingGridRow = ({ initIdex }: PropsWithChildren<SwingGridRowProps>) => {
        return <>
            {Array.from({ length: COLS }).map((_, idx) => {
                const itemIdx = initIdex + idx;
                const data = props.swings[itemIdx];

                return data
                    ? <SwingItem 
                        key={itemIdx}
                        club={data.club}
                        createdAt={data.createdAt}
                        digit={data.digit}
                        distance={data.distance}
                        swingID={data.swingID}
                        thumbnail={data.thumbnail}
                    /> 
                    : <StyledSwingItem/>
            })}
        </>
    }

    return (
        <Grid container rowSpacing={2}>
            {Array.from({ length: rows }).map((_, idx) => (
                <Grid 
                    key={idx} 
                    container item 
                    sx={{":first-of-type": { paddingTop: 0 }, gap: '8px'}}
                >
                    <SwingGridRow initIdex={idx}/>
                </Grid>
            ))}
        </Grid>
    )
}