import { FastForward, FastRewind, Pause, PlayArrow } from "@mui/icons-material";
import { Icon, IconButton, Modal, SelectChangeEvent, styled } from "@mui/material"
import { PropsWithChildren, ReactEventHandler, useEffect, useRef, useState } from "react"
import { useModal, useSelect } from "../../hooks";
import OptionSlider from "../../pages/option/OptionSlider";
import { webviewPrint } from "../../utils";
import ModalMenu, { ModalMenuItem } from "../common/layout/menu/ModalMenu";
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
    background: linear-gradient(0deg, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
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
    
    const playSpeeds: ModalMenuItem[] = [
        { label: '0.125배속', value: 1.0 },
        { label: '0.25배속', value: 2.0 },
        { label: '0.5배속', value: 4.0 },
        { label: '1배속', value: 8.0 },
    ];

    const onVideoLoad: ReactEventHandler<HTMLVideoElement> = (e) => {
        setDuration(e.currentTarget.duration);
        
    };

    const onVideoPlaying: ReactEventHandler<HTMLVideoElement> = (e) => {
        setPlaytime(e.currentTarget.currentTime);
        
    };

    // 재생속도 변경
    const onChangePlaySpeed = (speed: number | string) => {
        if (videoElem.current) {
            videoElem.current.playbackRate = speed as number;
        }       
    }

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
                    {/* 재생속도 */}
                    <ModalMenu
                        activatorType="outlined"
                        items={playSpeeds}
                        onChange={onChangePlaySpeed}
                    />

                    {/* 되감기, 재생, 빨리감기 */}
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

                {/* 재생바 */}
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