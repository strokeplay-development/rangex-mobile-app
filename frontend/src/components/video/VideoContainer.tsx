import { PropsWithChildren } from "react"

interface VideoContainerProps {
    videoSrc: string
}

export default function VideoContainer(props: PropsWithChildren<VideoContainerProps>) {
    return (
        <video 
            src={props.videoSrc}
            width="100%"
            preload="false"
            autoPlay muted loop playsInline
        >
            <source 
                src={props.videoSrc} 
                type="video/mp4"
            />
        </video>
    )
};