import { ReducerOf } from '../../src/ReducerOf'
import * as Constants from './constants'
import { Action, Store } from 'redux'
import { ReducerByName } from '../../src/ReducerByName'
import { Path } from '../../src/Path'
import { ActionsObservable } from 'redux-observable'
import { State } from './State'
import { HandlerOf } from '../../src/HandlerOf'
import 'rxjs/add/operator/map'


export const ACTION_TYPE1_FROM_BAR3 = 'ACTION_TYPE1_FROM_BAR3'
export const ACTION_TYPE1_FROM_BAR4 = 'ACTION_TYPE1_FROM_BAR4'
export const ACTION_TYPE1_FROM_BAR5 = 'ACTION_TYPE1_FROM_BAR5'

@ReducerByName
@Path("Path")
export class TestClass5 {

    foo5(state: Array<string> = [], action: Action) {
        return [...state, 'foo5']
    }
    @ReducerOf([Constants.ACTION_TYPE1])
    foo6(state: Array<string> = [], action: Action) {
        return [...state, 'foo6']
    }
    @ReducerOf([Constants.ACTION_TYPE1])
    foo4(state: Array<string> = [], action: Action) {
        return [...state, 'foo4']
    }

    @HandlerOf([Constants.ACTION_TYPE1])
    bar3(action: Action, store: Store<State>) {
        return { type: ACTION_TYPE1_FROM_BAR3 }
    }

    @HandlerOf([Constants.ACTION_TYPE1], true)
    bar4(action$: ActionsObservable<Action>, store: Store<State>) {
        return action$.map(action => { return { type: ACTION_TYPE1_FROM_BAR4 } })
    }

    @HandlerOf([ACTION_TYPE1_FROM_BAR4], true)
    bar5(action$: ActionsObservable<Action>, store: Store<State>) {
        return action$.map(action => { return { type: ACTION_TYPE1_FROM_BAR5 } })
    }


}