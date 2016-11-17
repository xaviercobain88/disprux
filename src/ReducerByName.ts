import { Object } from './Object'

export const NAME = 'NAME'

export const ReducerByName = (target: any) => {
    target.prototype.orderBy = NAME
}