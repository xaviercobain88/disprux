import { HandlerOf } from '../src/HandlerOf'
import { Action, Store, createStore, Reducer, MiddlewareAPI } from 'redux'
import * as _ from 'lodash'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs'
import { SpyStore } from './helpers/SpyStore'
import * as Constants from './helpers/constants'
import { State } from './helpers/State'
import { TestClass1 } from './helpers/TestClass1'

let test: TestClass1
let spyStore: SpyStore<State>

describe('HandlerOf', function () {
    beforeEach(() => {
        test = new TestClass1()
        spyStore = new SpyStore(new State)

    })

    it('must dispatch returned action when handler is annotated with an specific actionType', () => {

        test.foo({ type: Constants.ACTION_TYPE1 }, spyStore)
        expect(_.includes(spyStore.spy, Constants.testAction)).toBeTruthy()
        expect(spyStore.spy.length === 1).toBeTruthy()

    })

    it('must NOT dispatch returned action when handler is NOT annotated with an specific actionType', () => {

        test.foo({ type: Constants.ACTION_TYPE_NOT_SET }, spyStore)
        expect(!_.includes(spyStore.spy, Constants.testAction)).toBeTruthy()
        expect(spyStore.spy.length === 0).toBeTruthy()

    })

    it('must dispatch returned action when handler is annotated with an specific actionType and more actionTypes', () => {

        test.foo2({ type: Constants.ACTION_TYPE2 }, spyStore)
        expect(_.includes(spyStore.spy, Constants.testAction)).toBeTruthy()
        expect(spyStore.spy.length === 1).toBeTruthy()

    })

    it('must dispatch action$ stream when handler is annotated with an specific actionType and isObservable is true', async function () {

        let promise = await test.foo3(new ActionsObservable(Observable.from([{ type: Constants.ACTION_TYPE3 }])), spyStore)
            .toPromise()
        expect(promise.type).toEqual(Constants.ACTION_TYPE3)

    });

    it('must dispatch action$ stream when handler is annotated with an specific actionType ' +
        'and more actionTypes and isObservable is true', async function () {

            let promise = await test.foo4(new ActionsObservable(Observable.from([{ type: Constants.ACTION_TYPE4 }])), spyStore)
                .toPromise()
            expect(promise.type).toEqual(Constants.ACTION_TYPE4)

        });



    it('must NOT dispatch action$ stream when handler is NOT annotated with an specific actionType and isObservable is true', async function () {

        let promise = await test.foo3(new ActionsObservable(Observable.from([{ type: Constants.ACTION_TYPE_NOT_SET }])), spyStore)
            .toPromise()
        expect(promise).toEqual(undefined)

    })

})