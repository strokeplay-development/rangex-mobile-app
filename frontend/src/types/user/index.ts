export interface User {
    userAccount?: string;
    name?: string;
    userPW?: string;

    id?: number;
    level?: number;
    nickName?: string;
    email?: string;
    dialingCode?: string;
    phoneNumber?: string;
    birthday?: string;
    gender?: number;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    lastLoginDate?: string;
    inChannel?: string;
}

export interface PracticeOptions {        
    Temperature: number;
    TemperatureType: number;
    Altitude: number;
    AltitudeType: number;
    Humidity: number;
    Hardness: number;
    PinType: number;
    BallCountType: number;
    SpeedType: number;
    DistanceType: number;
    GreenDistanceType: number;
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