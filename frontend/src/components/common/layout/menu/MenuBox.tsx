import { ChevronRight } from "@mui/icons-material";
import { ListItemButton, ListItemButtonProps, styled } from "@mui/material";
import { BG_NAVY, TXT_GREY } from "../../../../styles/colors";

export interface MenuBoxProps extends ListItemButtonProps {
    head?: JSX.Element;
    title?: string;

    // 오른쪽 렌더링 우선순위 1
    tail?: JSX.Element;
    // 오른쪽 렌더링 우선순위 2
    desc?: string;
    // 둘아 없으면 오른쪽 화살표 아이콘 렌더링
}

const StyledMenuBox = styled(ListItemButton)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 16px 16px 16px 20px;
    background-color: ${BG_NAVY};

    & .tail {
        margin-right: 4px;
    }

    & h3.desc {
        color: ${TXT_GREY};
    }
    
    &:hover {
        background-color: ${BG_NAVY};
    }
`;

export default function MenuBox(props: MenuBoxProps) {
    const renderTail = () => {
        if (props.tail) return props.tail;
        if (props.desc) return <h3 className="desc tail">{props.desc}</h3>
        
        return <ChevronRight/>;
    }

    return (
        <StyledMenuBox onClick={props.onClick}>
            { props.head }
            <h3>{ props.title }</h3>
            { renderTail() }
        </StyledMenuBox>
    )
}