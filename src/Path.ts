import { Object } from './Object'

export const Path = (value: string) =>
    (target: any) => {
        target.prototype.rootPath = value
    }