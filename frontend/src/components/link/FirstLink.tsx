import { styled } from "@mui/material";
import { PropsWithChildren } from "react";
import { BG_NAVY } from "../../styles/colors";
import { FONT_BASIC, FONT_MEDIUM } from "../../styles/fonts";
import firstLinkBgImage from "../../assets/images/link_shop.svg";
import { BottomFullButton } from "../../styles/common";

/**
 * Types
 */

interface FirstLinkProps {
    username: string
}

/**
 * Styles
 */

const StyledFirstLink = styled('div')`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${BG_NAVY};

    & header {
        display: flex;
        width: 100%;
        flex-direction: column;
        position: fixed;
        top: 104px;
    }

    & h2 {
        font-weight: 400;
        text-align: center;
    }

    & p {
        font-size: ${FONT_MEDIUM}px;
        text-align: center;

        &.help {
            width: 100%;
            text-align: center;
            position: fixed;
            bottom: 80px;
            font-size: ${FONT_BASIC}px;
            color: ${props => props.theme.fontColor.grey};
        }
    }

    .back_img {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

export default function FirstLink({ username }: PropsWithChildren<FirstLinkProps>) {
    return (
            <StyledFirstLink>
                <header>
                    <h2>Welcome, <strong>{username}</strong>!</h2>
                    <p>
                        After rangex shop linking,<br/>
                        you can meet your swing motion and<br/>
                        shot data analysis from this app.
                    </p>
                </header>
                <div className="back_img">
                    <img src={firstLinkBgImage} alt="need_link_to_shop"/>
                </div>
                <p className="help">You should link rangex shop at least one.</p>
                <BottomFullButton>
                    REGISTER or LINK
                </BottomFullButton>
            </StyledFirstLink>
        // <Slide direction="up" mountOnEnter unmountOnExit>
        // </Slide>
    )
}