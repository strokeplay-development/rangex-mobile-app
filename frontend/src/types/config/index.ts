import { BOOL } from './../common/index';
const clubWood = {
    0: "Driver",
    1: "Wood2",
    2: "Wood3",
    3: "Wood4",
    4: "Wood5",
    24: "Wood6",
    5: "Wood7",
    25: "Wood8",
    26: "Wood9",
}

const clubHybrid = {
    27: "Hybrid1",
    28: "Hybrid2",
    6: "Hybrid3",
    7: "Hybrid4",
    8: "Hybrid5",
    29: "Hybrid6",
    9: "Hybrid7",
    30: "Hybrid8",
    31: "Hybrid9",
}

const clubIron = {
    32: "Iron1",
    10: "Iron2",
    11: "Iron3",
    12: "Iron4",
    13: "Iron5",
    14: "Iron6",
    15: "Iron7",
    16: "Iron8",
    17: "Iron9",
}

const clubWedge = {
    18: "Wedge46(P)",
    33: "Wedge48",
    34: "Wedge50",
    19: "Wedge52",
    20: "Wedge54",
    21: "Wedge56(s)",
    35: "Wedge58",
    22: "Wedge60",
    36: "Wedge62",
    37: "Wedge64",
}

export const clubPutt = {
    23: "putt"
}

export const CLUBS = {
    ...clubWood,
    ...clubHybrid,
    ...clubIron,
    ...clubWedge,
    ...clubPutt
}

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