import { FastForward, FastRewind, Pause, PlayArrow } from "@mui/icons-material";
import { Icon, IconButton, SelectChangeEvent, styled } from "@mui/material"
import { PropsWithChildren, ReactEventHandler, useEffect, useRef, useState } from "react"
import { useSelect } from "../../hooks";
import OptionSlider from "../../pages/option/OptionSlider";
import { webviewPrint } from "../../utils";
import OptionSelect from "../common/layout/menu/OptionSelect";

interface VideoContainerProps {
    videoSrc: string
}

const StyledVideoContainer = styled('div')`
    background-color: #000000;
    height: 100vh;
    display: flex;
    position: relative;
`;

const StyledVideoController = styled('div')`
    position: fixed;
    background: linear-gradient(0deg, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%);
    width: 100%;
    padding: 8px 16px;
    bottom: 0;

    & .play_controller {
        display: flex;
        align-items: center;
        justify-content: space-between;

        & .play_buttons {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 4px;
        }
    }
`;

export default function VideoContainer(props: PropsWithChildren<VideoContainerProps>) {
    const videoElem = useRef<HTMLVideoElement>(null);
    const [duration, setDuration] = useState<number>(0);
    const [playTime, setPlaytime] = useState<number>(0);
    
    const playSpeeds = [2.5, 0.8, 0.6, 0.4];
    const playSpeed = useSelect(0.4);

    const onVideoLoad: ReactEventHandler<HTMLVideoElement> = (e) => {
        setDuration(e.currentTarget.duration);
        
    };

    const onVideoPlaying: ReactEventHandler<HTMLVideoElement> = (e) => {
        setPlaytime(e.currentTarget.currentTime);
        
    };

    // 재생속도 변경
    useEffect(() => {
        if (videoElem.current) {
            videoElem.current.playbackRate = playSpeed.value as number;
        }

    }, [playSpeed.value]);

    // 되감기
    const onClickRewind = () => {
        if (videoElem.current) {
            videoElem.current.currentTime -= 0.05;
        }
    }

    // 빨리감기
    const onClickForward = () => {
        if (videoElem.current) {
            videoElem.current.currentTime += 0.05;
        }
    }

    // 재생 or 일시정지
    const onTogglePlay = () => {
        const video = videoElem.current;
        if (video) {
            video.paused ? video.play() : video.pause();
        }
    }

    // 재생바로 재생위치 바꾸기
    const onChangePlaySlider = (e?: number | number[]) => {
        setPlaytime(e as number);

        if (videoElem.current) {
            videoElem.current.currentTime = e as number;
        }
    }

    return (
        <StyledVideoContainer>
            <video
                ref={videoElem}
                src={props.videoSrc}
                width="100%"
                autoPlay muted loop
                controls={false}
                playsInline
                onPlay={onVideoLoad}
                onTimeUpdate={onVideoPlaying}
            >
                <source 
                    src={props.videoSrc} 
                    type="video/mp4"
                />
            </video>

            <StyledVideoController>
                <div className="play_controller">
                    <OptionSelect
                        defaultValue={playSpeed.value}
                        menus={playSpeeds}
                        onChange={playSpeed.onChange}
                    />

                    <div className="play_buttons">
                        <IconButton onClick={onClickRewind}>
                            <FastRewind/>
                        </IconButton>
                        <IconButton onClick={onTogglePlay}>
                            {
                                videoElem.current?.paused ? <PlayArrow/> : <Pause/>
                            }
                        </IconButton>
                        <IconButton onClick={onClickForward}>
                            <FastForward/>
                        </IconButton>
                    </div>
                </div>
                <OptionSlider
                    max={duration}
                    valueLabelDisplay="off"
                    defaultValue={playTime}
                    onChange={(_, value) => onChangePlaySlider(value)}
                />
            </StyledVideoController>
        </StyledVideoContainer>      
    )
};