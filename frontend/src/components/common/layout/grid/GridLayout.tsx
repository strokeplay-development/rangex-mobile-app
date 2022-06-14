import { Grid } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";

interface GridLayoutProps {
    dataLength: number;
    cols: number;
    children: ReactNode[];
    emptyElement?: ReactNode;
}

export default function GridLayout(props: PropsWithChildren<GridLayoutProps>) {
    const ROWS = Math.floor(props.dataLength / props.cols) + 1;
    
    const renderItems = (initIndex: number) => {
        return <>
            {Array.from({ length: props.cols }).map((_, idx) => {
                const itemIdx = initIndex + idx;
                
                return props.children[itemIdx] || props.emptyElement;
            })}
        </>
    }

    return (
        <Grid container rowSpacing={2}>
            {Array.from({ length: ROWS }).map((_, idx) => (
                <Grid 
                    key={idx} 
                    container item 
                    sx={{":first-of-type": { paddingTop: 0 }, gap: '16px'}}
                >
                    { renderItems(idx * props.cols) }
                </Grid>
            ))}
        </Grid>
    )
}