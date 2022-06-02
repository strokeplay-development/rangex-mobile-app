import { PropsWithChildren } from "react";
import { SectionHeaderProps } from ".";
import { StyledSectionHeader } from "./style";

export default function SectionHeader({ children, title }: PropsWithChildren<SectionHeaderProps>) {
    return (
        <StyledSectionHeader>
            <h3>{title}</h3>

            {/* 오른쪽 커스터마이징 영역 */}
            {children}
        </StyledSectionHeader>
    );
}