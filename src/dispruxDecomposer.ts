import { Epic, EpicMiddleware, createEpicMiddleware, combineEpics, } from 'redux-observable'
import { MiddlewareAPI, Dispatch, Action, Reducer } from 'redux'
import { HandlerOf, Handler, ObservableHandler } from './HandlerOf'
import { NAME } from './ReducerByName'
import * as _ from 'lodash'
import { Object } from './Object'

export const dispruxDecomposer = (...args: Array<any>) => {

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


    return { pruxMiddleware: dispruxMiddlewareFactory(handlers, observableHandlers), rootReducer  }
}

const dispruxMiddlewareFactory = (handlers: Array<Handler>, observableHandlers: Array<ObservableHandler>) => {

    let reduxObservableMiddleware3: EpicMiddleware<any> = createEpicMiddleware(combineEpics(...observableHandlers))
    
    return (store: MiddlewareAPI<any>) => {
        let reduxObservableMiddleware2 = reduxObservableMiddleware3(store)
        return (next: Dispatch<any>) => {
            let reduxObservableMiddleware1 = reduxObservableMiddleware2(next)
            return (action: Action) => {

        reduxObservableMiddleware1(action)
        handlers.forEach(handler => {
            handler(action, store)
        })

    }}}
}
