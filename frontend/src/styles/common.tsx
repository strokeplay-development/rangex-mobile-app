import { Button, ButtonProps, Paper, styled } from "@mui/material";

export const Section = styled('section')`
    padding: 0 20px;
    margin-bottom: 24px;
`;

export const PaperBox = styled(Paper)`
    box-shadow: none;
    padding: 16px;
`;

export const BoxList = styled('ul')`
    & li {
        margin-bottom: 16px;

        &:last-child {
            margin-bottom: 0;
        }
    }
`;
  
export const BottomFullButton = styled((props: ButtonProps) => (
    <Button variant="contained" {...props}>{props.children}</Button>
))`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 56px;
    border: none;
    box-shadow: none;
    font-weight: 600;
    border-radius: 0;
`