import { ReducerOf } from '../../src/ReducerOf'
import { State } from '../helpers/State'
import { HandlerOf } from '../../src/HandlerOf'
import * as Constants from './constants'
import { Action, Store } from 'redux'
import { ActionsObservable } from 'redux-observable'
import 'rxjs/add/operator/map'

export const ACTION_TYPE1_FROM_BAR1 = 'ACTION_TYPE1_FROM_BAR1'
export const ACTION_TYPE1_FROM_BAR2 = 'ACTION_TYPE1_FROM_BAR2'


export class TestClass4 {

    @ReducerOf([Constants.ACTION_TYPE1])
    foo1(state: Array<string> = [], action: Action) {
        return [...state, 'foo1']
    }
    foo2(state: Array<string> = [], action: Action) {
        return [...state, 'foo2']
    }
    @ReducerOf([Constants.ACTION_TYPE1])
    foo3(state: Array<string> = [], action: Action) {
        return [...state, 'foo3']
    }

    @HandlerOf([Constants.ACTION_TYPE1])
    bar1(action: Action, store: Store<State>) {
        return { type: ACTION_TYPE1_FROM_BAR1 }
    }
   

    @HandlerOf([Constants.ACTION_TYPE1], true)
    bar2(action$: ActionsObservable<Action>, store: Store<State>) {
        return action$.map(action => { return { type: ACTION_TYPE1_FROM_BAR2 } })
    }




}