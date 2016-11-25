import { HandlerOf } from '../../src/HandlerOf'
import * as Constants from './constants'
import { Action, Store, createStore, Reducer, MiddlewareAPI } from 'redux'
import { State } from './State'
import { ActionsObservable } from 'redux-observable'
import { ReducerByName } from '../../src/ReducerByName'
import { RealTimeAction } from '../../src/RealTimeAction'

export const ON_UPDATE = 'ON_UPDATE'
export const ON_DELETE = 'ON_DELETE'
export const STREAM = 'STREAM'
export const ON_STREAM_UPDATE = 'ON_STREAM_UPDATE'
export const SOME_PATH = 'SOME_PATH'

@ReducerByName
export class TestClass1 {
    @HandlerOf([Constants.ACTION_TYPE1])
    foo(action: Action, store: Store<State>) {
        return Constants.testAction
    }
    @HandlerOf([Constants.ACTION_TYPE1, Constants.ACTION_TYPE2])
    foo2(action: Action, store: Store<State>) {
        return Constants.testAction
    }
    @HandlerOf([Constants.ACTION_TYPE3], true)
    foo3(action$: ActionsObservable<Action>, store: Store<State>) {
        return action$
    }
    @HandlerOf([Constants.ACTION_TYPE3, Constants.ACTION_TYPE4], true)
    foo4(action$: ActionsObservable<Action>, store: Store<State>) {
        return action$
    }

    @RealTimeAction(SOME_PATH, ON_UPDATE, ON_DELETE, [[STREAM, ON_STREAM_UPDATE]])
    getSomeAction(id: string, type: string) {
        return { id, type }
    }

}