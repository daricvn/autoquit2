import { RepeatType } from "../models/RepeatType";

export interface IRepeatInfo {
    type: RepeatType;
    count?: number;
    total?: number;
    data?: any;
}