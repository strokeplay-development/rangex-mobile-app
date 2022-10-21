import { BOOL } from './../common/index';

// 클럽옵션
export interface ClubOptions {
    [key: string]: BOOL 
    "0": BOOL
    "1": BOOL
    "2": BOOL
    "3": BOOL
    "4": BOOL
    "24": BOOL
    "5": BOOL
    "25": BOOL
    "26": BOOL
    "27": BOOL
    "28": BOOL
    "6": BOOL
    "7": BOOL
    "8": BOOL
    "29": BOOL
    "9": BOOL
    "30": BOOL
    "31": BOOL
    "32": BOOL
    "10": BOOL
    "11": BOOL
    "12": BOOL
    "13": BOOL
    "14": BOOL
    "15": BOOL
    "16": BOOL
    "17": BOOL
    "18": BOOL
    "33": BOOL
    "34": BOOL
    "19": BOOL
    "20": BOOL
    "21": BOOL
    "35": BOOL
    "22": BOOL
    "36": BOOL
    "37": BOOL
}

type TemperatureType = 0 | 1;
type AltitudeType = 0 | 1 | 2;
type Hardness = 0 | 1 | 2;

// 연습옵션
export interface PracticeOptions {        
    Temperature: number;
    TemperatureType: TemperatureType;
    Altitude: number;
    AltitudeType: AltitudeType;
    Humidity: number;
    Hardness: Hardness;
    SpeedType: number;
    DistanceType: number;
    PinType: number;
    BallCountType: number;
    Sound: number;
    Volume: number;
    DisappearingTime: number;
    BallTailColor: number;
    balltailFirst: number;
    balltailSecond: number;
    balltailThird: number;
    LevelGridColor: number;
    IsShowLevelGrid: boolean;
    PlayTutorial: boolean;
    ImpactGrid: boolean;
}

// 유저 컨피그
export interface UserConfig {
    readonly layoutTopLeft?: number;
    readonly layoutTopRight?: number;
    readonly layoutBottom?: number;
    teeHeight?: number;
    options?: PracticeOptions | string;
    clubs?: ClubOptions | string;
    cellDatas?: string;
}