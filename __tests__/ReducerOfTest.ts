import { ReducerOf } from '../src/ReducerOf'
import { Action, Store, createStore, Reducer, MiddlewareAPI } from 'redux'
import * as _ from 'lodash'
import { SpyStore } from './helpers/SpyStore'
import { Path } from '../src/Path'


const ACTION_TYPE1 = "ACTION_TYPE1"
const ACTION_TYPE2 = "ACTION_TYPE2"
const ACTION_TYPE3 = "ACTION_TYPE3"
const ACTION_TYPE4 = "ACTION_TYPE4"
const ACTION_TYPE_NOT_SET = "ACTION_TYPE_NOT_SET"


let test1: Test1
let test2: Test2
let state = {
    someField: "someField"
}

let testAction = { type: ACTION_TYPE1 }

class Test1 {

    @ReducerOf([ACTION_TYPE1])
    foo(state: any, action: Action) {
        return { someField2: "someField2" }
    }
    @ReducerOf([ACTION_TYPE1], "someField")
    foo2(state: any, action: Action) {
        return "foo2"
    }
    @ReducerOf([ACTION_TYPE1], (action: Action) => `${action.type}`)
    foo3(state: any, action: Action) {
        return "foo3"
    }

    @ReducerOf([ACTION_TYPE1], "t${action.type}")
    foo4(state: any, action: Action) {
        return "foo4"
    }
    @ReducerOf([ACTION_TYPE1], "${aaction.type}")
    foo5(state: any, action: Action) {
        return "foo5"
    }
}

const PATH = "entities.test"

@Path(PATH)
class Test2 {

    @ReducerOf([ACTION_TYPE1])
    foo(state: any, action: Action) {
        return { someField2: "someField2" }
    }
    @ReducerOf([ACTION_TYPE1], "someField")
    foo2(state: any, action: Action) {
        return "foo2"
    }
    @ReducerOf([ACTION_TYPE1], (action: Action) => `${action.type}`)
    foo3(state: any, action: Action) {
        return "foo3"
    }

    @ReducerOf([ACTION_TYPE1], "t${action.type}")
    foo4(state: any, action: Action) {
        return "foo4"
    }
    @ReducerOf([ACTION_TYPE1], "${aaction.type}")
    foo5(state: any, action: Action) {
        return "foo5"
    }
}

describe('ReducerOf', function () {
    beforeEach(() => {
        test1 = new Test1()
        test2 = new Test2()
    })

    it('must return previous state when reducer is not annotated with an specific actionType', () => {

        let testAction = { type: ACTION_TYPE_NOT_SET }
        expect(test1.foo(state, testAction)).toEqual(state)

    })

    it('must return the function\'s return value when reducer is annotated with an specific actionType', () => {


        expect(test1.foo(state, testAction)).toEqual({ Test1: { someField2: "someField2" }, someField: "someField" })

    })

    it('must modify specific slice when reducer is annotated with an specific actionType and path as string', () => {

        expect(test1.foo2(state, testAction)).toEqual({ Test1: { someField: "foo2" }, someField: "someField" })

    })

    it('must modify specific slice when reducer is annotated with an specific actionType and path as function', () => {

        expect(test1.foo3(state, testAction)).toEqual({ Test1: { [ACTION_TYPE1]: "foo3" }, someField: "someField" })

    })

    it('must modify specific slice when reducer is annotated with an specific actionType and path as string with interpolation', () => {

        expect(test1.foo4(state, testAction)).toEqual({ Test1: { ["t" + ACTION_TYPE1]: "foo4" }, someField: "someField" })

    })

    it('must modify specific slice when reducer is annotated with an specific actionType and path as string with not existing interpolation', () => {

        expect(test1.foo5(state, testAction)).toEqual({ Test1: { "${aaction": { "type}": "foo5" } }, someField: "someField" })

    })
    //With @Path
    it('must return the function\'s return value when reducer is annotated with an specific actionType and @Path', () => {

        expect(test2.foo(state, testAction)).toEqual({ entities: { test: { someField2: "someField2" } }, someField: "someField" })

    })

    it('must modify specific slice when reducer is annotated with an specific actionType and path as string and @Path', () => {

        expect(test2.foo2(state, testAction)).toEqual({ entities: { test: { someField: "foo2" } }, someField: "someField" })

    })

    it('must modify specific slice when reducer is annotated with an specific actionType and path as function and @Path', () => {

        expect(test2.foo3(state, testAction)).toEqual({ entities: { test: { [ACTION_TYPE1]: "foo3" } }, someField: "someField" })

    })

    it('must modify specific slice when reducer is annotated with an specific actionType and path as string with interpolation and @Path', () => {

        expect(test2.foo4(state, testAction)).toEqual({ entities: { test: { ["t" + ACTION_TYPE1]: "foo4" } }, someField: "someField" })

    })

    it('must modify specific slice when reducer is annotated with an specific actionType and path as string with not existing interpolation and @Path', () => {

        expect(test2.foo5(state, testAction)).toEqual({ entities: { test: { "${aaction": { "type}": "foo5" } } }, someField: "someField" })

    })

})