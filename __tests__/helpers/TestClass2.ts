import { ReducerOf } from '../../src/ReducerOf'
import * as Constants from './constants'
import { Action, Store, createStore, Reducer, MiddlewareAPI } from 'redux'
import { Path } from '../../src/Path'

export class TestClass2 {

    @ReducerOf([Constants.ACTION_TYPE1])
    foo(state: any, action: Action) {
        return { someField2: "someField2" }
    }
    @ReducerOf([Constants.ACTION_TYPE1], "someField")
    foo2(state: any, action: Action) {
        return "foo2"
    }
    @ReducerOf([Constants.ACTION_TYPE1], (action: Action) => `${action.type}`)
    foo3(state: any, action: Action) {
        return "foo3"
    }

    @ReducerOf([Constants.ACTION_TYPE1], "t${action.type}")
    foo4(state: any, action: Action) {
        return "foo4"
    }
    @ReducerOf([Constants.ACTION_TYPE1], "${aaction.type}")
    foo5(state: any, action: Action) {
        return "foo5"
    }
}
