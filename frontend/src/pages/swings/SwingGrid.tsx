import { Grid } from "@mui/material";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { SwingList } from "../../types";
import SwingItem, { StyledSwingItem } from "./SwingItem";

interface SwingGridProps {
    swings: SwingList,
    cols: number
}

interface SwingGridRowProps {
    initIdex: number
}

export default function SwingGrid(props: PropsWithChildren<SwingGridProps>) {
    const nav = useNavigate();

    const viewShotData = (id: number) => nav(`/swings/${id}/video`);

    const rows = props.swings.length / props.cols + 1;

    const SwingGridRow = ({ initIdex }: PropsWithChildren<SwingGridRowProps>) => {
        return <>
            {Array.from({ length: props.cols }).map((_, idx) => {
                const itemIdx = initIdex + idx;
                const data = props.swings[itemIdx];

                return data
                    ? <SwingItem 
                        key={itemIdx}
                        club={data.club}
                        createdAt={data.createdAt}
                        unit={data.unit}
                        distance={data.distance}
                        id={data.id}
                        thumbnail={data.thumbnail}
                        onClick={() => window.OpenFullScreenVideo?.postMessage(data.videoUrl)}
                    /> 
                    : <StyledSwingItem key={itemIdx}/>
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