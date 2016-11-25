import { Epic, EpicMiddleware, createEpicMiddleware, combineEpics, } from 'redux-observable'
import { MiddlewareAPI, Dispatch, Action, Reducer } from 'redux'
import { HandlerOf, Handler, ObservableHandler } from './HandlerOf'
import { Subscription } from 'rxjs'
import { NAME } from './ReducerByName'
import * as _ from 'lodash'
import { Object } from './Object'

export interface RealTimeAction<T> extends Action {
    id: T
    onUpdate: string
    onDelete: string
    realTimePath: string
    onStreamUpdate: Array<[string, string]>

}


export interface RealTimeManager {
    <T>(action: RealTimeAction<T>, store: MiddlewareAPI<any>): void
}

export const SUBSCRIPTION_DELETED = 'SUBSCRIPTION_DELETED'


export const dispruxDecomposer = (args: Array<any>, realTimeManager?: RealTimeManager) => {

    let [handlers, observableHandlers, reducers] = args
        .map(clazz => clazz.prototype)
        .reduce((handlers: [Array<Handler>, Array<ObservableHandler>, Array<Reducer<any>>], clazz: any) => {
            clazz.reducers = clazz.orderBy === NAME ? _.sortBy(clazz.reducers) : clazz.reducers

            return [[...handlers[0], ...clazz.handlers ? clazz.handlers.map((handlerString: string) => clazz[handlerString]) : []],
            [...handlers[1], ...clazz.observableHandlers ? clazz.observableHandlers.map((observableHandlerString: string) => clazz[observableHandlerString]) : []],
            [...handlers[2], ...clazz.reducers ? clazz.reducers.map((reducerString: string) => clazz[reducerString]) : []]]
        }
        , [[], [], []])


    let rootReducer = <A extends Action, S>(state: S, action: A) =>
        reducers.reduce((tuple: [S, A], reducer: Reducer<S>) => [reducer(tuple[0], tuple[1]), tuple[1]]
            , [state, action])[0]


    return { dispruxMiddleware: dispruxMiddlewareFactory(handlers, observableHandlers), rootReducer }
}

export const dispruxMiddlewareFactory = (handlers: Array<Handler>,
    observableHandlers: Array<ObservableHandler>,
    realTimeManager?: RealTimeManager) => {

    let reduxObservableMiddleware3: EpicMiddleware<any> = createEpicMiddleware(combineEpics(...observableHandlers))

    return (store: MiddlewareAPI<any>) => {
        let reduxObservableMiddleware2 = reduxObservableMiddleware3(store)
        return (next: Dispatch<any>) => {
            let reduxObservableMiddleware1 = reduxObservableMiddleware2(next)
            return <T>(action: Action | RealTimeAction<T>) => {
                if (isRealTimeAction(action) && !_.isUndefined(realTimeManager)) {
                    realTimeManager(action, store)
                }
                reduxObservableMiddleware1(action)
                handlers.forEach(handler => {
                    handler(action, store)
                })

            }
        }
    }
}

function isRealTimeAction<T>(action: Action | RealTimeAction<T>): action is RealTimeAction<T> {
    return ((<RealTimeAction<T>>action).id &&
        (<RealTimeAction<T>>action).onDelete &&
        (<RealTimeAction<T>>action).onUpdate &&
        (<RealTimeAction<T>>action).realTimePath &&
        !_.isUndefined((<RealTimeAction<T>>action).onStreamUpdate))
}