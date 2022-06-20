import { styled } from "@mui/material";
import { PropsWithChildren } from "react";
import { BG_NAVY } from "../../styles/colors";
import { FONT_BASIC, FONT_MEDIUM } from "../../styles/fonts";
import { BottomFullButton } from "../../styles/common";
import { useNavigate } from "react-router-dom";

import logo_white from "../../assets/images/logo_white.svg";
import bg_circle from "../../assets/images/bg_circle.svg";

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
        z-index: 10;
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

const LogoCircluarImage = styled('div')`
    position: relative;


    & img {
        position: absolute;
        display: block;
        max-width: 90vw;

        &.logo {
            width: 24vw;
            left: calc(50% - 10vw);
            animation: showin 2s linear;
        }


        &.circle {
            animation: infinite_rotate 1.5s linear;
        }

        @keyframes infinite_rotate {
            from { transform: rotate(0deg); opacity: 0; }
            to { transform: rotate(360deg); opacity: 100%; }
        }

        @keyframes showin {
            from { opacity: 0; }
            to { opacity: 100%; }
        }
    }  
`;

export default function FirstLink({ username }: PropsWithChildren<FirstLinkProps>) {
    const nav = useNavigate();
    
    const goConfirmLink = () => {
        nav("/link");
    }

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

            <LogoCircluarImage className="back_img">
                <img className="logo" src={logo_white} alt="need_link_to_shop"/>
                <img className="circle" src={bg_circle} alt="need_link_to_shop"/>
            </LogoCircluarImage>

            <p className="help">You should link rangex shop at least one.</p>

            <BottomFullButton onClick={goConfirmLink}>
                REGISTER or LINK
            </BottomFullButton>
        </StyledFirstLink>
    )
}