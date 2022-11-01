import { MeasureUnits } from './../types/config/index';
import { atom } from 'recoil';
import { User } from '../types';

export const me = atom<User>({
    key: 'me',
    default: {}
});

export const myUnits = atom<MeasureUnits>({
    key: 'units',
    default: {
        DistanceType: 0,
        SpeedType: 0
    }
});