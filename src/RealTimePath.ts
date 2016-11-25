import { Object } from './Object'

export const RealTimePath = (value: string) =>
    (target: any) => {
        target.prototype.realTimePath = value
    }