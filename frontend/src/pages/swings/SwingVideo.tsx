import { useParams } from "react-router-dom";
import VideoContainer from "../../components/video/VideoContainer";
import { webviewPrint } from "../../utils";


export default function SwingVideo() {
    const { shotID } = useParams();
    webviewPrint(shotID);

    // 리액트 쿼리로 shot video 정보 가져오기

    const videoSrc = "https://rangex-user-video.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Video_2022-11-02-16-02-12.mp4";
    
    return (
        <VideoContainer videoSrc={videoSrc}/>
    );
};