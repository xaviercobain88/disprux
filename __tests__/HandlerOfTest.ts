import { HandlerOf } from '../src/HandlerOf'
import { Action, Store, createStore, Reducer, MiddlewareAPI } from 'redux'
import * as _ from 'lodash'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs'
import { SpyStore } from './helpers/SpyStore'


const ACTION_TYPE1 = "ACTION_TYPE1"
const ACTION_TYPE2 = "ACTION_TYPE2"
const ACTION_TYPE_NOT_SET = "ACTION_TYPE_NOT_SET"
const ACTION_TYPE3 = "ACTION_TYPE3"
const ACTION_TYPE4 = "ACTION_TYPE4"

const TEST = "TEST"

class State { }


class Test {
    @HandlerOf([ACTION_TYPE1])
    foo(action: Action, store: Store<State>) {
        return testAction
    }
    @HandlerOf([ACTION_TYPE1, ACTION_TYPE2])
    foo2(action: Action, store: Store<State>) {
        return testAction
    }
    @HandlerOf([ACTION_TYPE3], true)
    foo3(action$: ActionsObservable<Action>, store: Store<State>) {
        return action$
    }
    @HandlerOf([ACTION_TYPE3, ACTION_TYPE4], true)
    foo4(action$: ActionsObservable<Action>, store: Store<State>) {
        return action$
    }

}

let test: Test
let spyStore: SpyStore<State>
let testAction = { type: TEST }

describe('HandlerOf', function () {
    beforeEach(() => {
        test = new Test()
        spyStore = new SpyStore(new State)

    })

    it('must dispatch returned action when handler is annotated with an specific actionType', () => {

        test.foo({ type: ACTION_TYPE1 }, spyStore)
        expect(_.includes(spyStore.spy, testAction)).toBeTruthy()
        expect(spyStore.spy.length === 1).toBeTruthy()

    })

    it('must NOT dispatch returned action when handler is NOT annotated with an specific actionType', () => {

        test.foo({ type: ACTION_TYPE_NOT_SET }, spyStore)
        expect(!_.includes(spyStore.spy, testAction)).toBeTruthy()
        expect(spyStore.spy.length === 0).toBeTruthy()

    })

    it('must dispatch returned action when handler is annotated with an specific actionType and more actionTypes', () => {

        test.foo2({ type: ACTION_TYPE2 }, spyStore)
        expect(_.includes(spyStore.spy, testAction)).toBeTruthy()
        expect(spyStore.spy.length === 1).toBeTruthy()

    })

    it('must dispatch action$ stream when handler is annotated with an specific actionType and isObservable is true', async () => {

        let promise = await test.foo3(new ActionsObservable(Observable.from([{ type: ACTION_TYPE3 }])), spyStore)
            .toPromise()
        expect(promise.type).toEqual(ACTION_TYPE3)

    });

    it('must dispatch action$ stream when handler is annotated with an specific actionType ' +
        'and more actionTypes and isObservable is true', async () => {

            let promise = await test.foo4(new ActionsObservable(Observable.from([{ type: ACTION_TYPE4 }])), spyStore)
                .toPromise()
            expect(promise.type).toEqual(ACTION_TYPE4)

        });



    it('must NOT dispatch action$ stream when handler is NOT annotated with an specific actionType and isObservable is true', async () => {

        let promise = await test.foo3(new ActionsObservable(Observable.from([{ type: ACTION_TYPE_NOT_SET }])), spyStore)
            .toPromise()
        expect(promise).toEqual(undefined)

    })

})