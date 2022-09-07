import { Skeleton, Stack } from "@mui/material";

export default function SkelGrid() {
    return (
        <Stack spacing={1}>
            <Skeleton variant="rectangular" />
            <Skeleton variant="rectangular" />
            <Skeleton variant="rectangular" />
        </Stack>
    );
}