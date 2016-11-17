import { ReducerOf } from '../src/ReducerOf'
import { Action, Store, createStore, Reducer, MiddlewareAPI } from 'redux'
import * as _ from 'lodash'
import { SpyStore } from './helpers/SpyStore'
import { Path } from '../src/Path'
import * as Constants from './helpers/constants'
import { TestClass2 } from './helpers/TestClass2'
import { TestClass3 } from './helpers/TestClass3'

let state = {
    someField: "someField"
}
let testAction = { type: Constants.ACTION_TYPE1 }
let test1: TestClass2
let test2: TestClass3

describe('ReducerOf', function () {
    beforeEach(() => {
        test1 = new TestClass2()
        test2 = new TestClass3()
    })

    it('must return previous state when reducer is not annotated with an specific actionType', () => {

        let testAction = { type: Constants.ACTION_TYPE_NOT_SET }
        expect(test1.foo(state, testAction)).toEqual(state)

    })

    it('must return the function\'s return value when reducer is annotated with an specific actionType', () => {


        expect(test1.foo(state, testAction)).toEqual({ TestClass2: { someField2: "someField2" }, someField: "someField" })

    })

    it('must modify specific slice when reducer is annotated with an specific actionType and path as string', () => {

        expect(test1.foo2(state, testAction)).toEqual({ TestClass2: { someField: "foo2" }, someField: "someField" })

    })

    it('must modify specific slice when reducer is annotated with an specific actionType and path as function', () => {

        expect(test1.foo3(state, testAction)).toEqual({ TestClass2: { [Constants.ACTION_TYPE1]: "foo3" }, someField: "someField" })

    })

    it('must modify specific slice when reducer is annotated with an specific actionType and path as string with interpolation', () => {

        expect(test1.foo4(state, testAction)).toEqual({ TestClass2: { ["t" + Constants.ACTION_TYPE1]: "foo4" }, someField: "someField" })

    })

    it('must modify specific slice when reducer is annotated with an specific actionType and path as string with not existing interpolation', () => {

        expect(test1.foo5(state, testAction)).toEqual({ TestClass2: { "${aaction": { "type}": "foo5" } }, someField: "someField" })

    })
    //With @Path
    it('must return the function\'s return value when reducer is annotated with an specific actionType and @Path', () => {

        expect(test2.foo(state, testAction)).toEqual({ entities: { test: { someField2: "someField2" } }, someField: "someField" })

    })

    it('must modify specific slice when reducer is annotated with an specific actionType and path as string and @Path', () => {

        expect(test2.foo2(state, testAction)).toEqual({ entities: { test: { someField: "foo2" } }, someField: "someField" })

    })

    it('must modify specific slice when reducer is annotated with an specific actionType and path as function and @Path', () => {

        expect(test2.foo3(state, testAction)).toEqual({ entities: { test: { [Constants.ACTION_TYPE1]: "foo3" } }, someField: "someField" })

    })

    it('must modify specific slice when reducer is annotated with an specific actionType and path as string with interpolation and @Path', () => {

        expect(test2.foo4(state, testAction)).toEqual({ entities: { test: { ["t" + Constants.ACTION_TYPE1]: "foo4" } }, someField: "someField" })

    })

    it('must modify specific slice when reducer is annotated with an specific actionType and path as string with not existing interpolation and @Path', () => {

        expect(test2.foo5(state, testAction)).toEqual({ entities: { test: { "${aaction": { "type}": "foo5" } } }, someField: "someField" })

    })

})