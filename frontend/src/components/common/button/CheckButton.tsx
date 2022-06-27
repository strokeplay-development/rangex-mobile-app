import { Check } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import { PropsWithChildren } from "react";

type CheckButtonProps = ButtonProps & { complete: boolean };

export default function CheckButton(props: PropsWithChildren<CheckButtonProps>) {
    return (
        <Button variant="contained" size="small" disabled={props.complete} disableElevation>
            {props.complete ? <Check fontSize="small"/> : 'check' }
        </Button>
    )
}