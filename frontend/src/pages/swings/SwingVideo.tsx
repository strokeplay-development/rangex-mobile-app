import { Download } from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import VideoContainer from "../../components/video/VideoContainer";
import { webviewPrint } from "../../utils";

const StyledFixedDownloadButton = styled('div')`
    position: fixed;
    top: 0;
    right: 0;
    z-index: 10;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
`
 
export default function SwingVideo() {
    const { shotID } = useParams();
    webviewPrint(shotID);

    // 리액트 쿼리로 shot video 정보 가져오기

    const videoSrc = "https://rangex-user-video.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Video_2022-11-02-16-02-12.mp4";
    
    return (
        <div>
            <StyledFixedDownloadButton>
                <IconButton>
                    <Download/>
                </IconButton>
            </StyledFixedDownloadButton>
            <VideoContainer videoSrc={videoSrc}/>
        </div>
    );
};