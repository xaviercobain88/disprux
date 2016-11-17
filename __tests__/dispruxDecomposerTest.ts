
import { TestClass4, ACTION_TYPE1_FROM_BAR1, ACTION_TYPE1_FROM_BAR2 } from './helpers/TestClass4'
import { TestClass5, ACTION_TYPE1_FROM_BAR3, ACTION_TYPE1_FROM_BAR4, ACTION_TYPE1_FROM_BAR5 } from './helpers/TestClass5'
import { dispruxDecomposer } from '../src/dispruxDecomposer'
import * as Constants from './helpers/constants'
import {applyMiddleware, createStore, Reducer, Action, MiddlewareAPI} from 'redux'
import {combineEpics, ActionsObservable, Epic, createEpicMiddleware} from 'redux-observable'
import {SpyStore} from './helpers/SpyStore'
import 'rxjs/add/operator/map'


describe('pruxDecomposer', function () {
    describe('rootReducer', function () {

        it('must call every reducer in order when action sent', () => {

            let {rootReducer} = dispruxDecomposer(TestClass4, TestClass5)
            expect(rootReducer({}, { type: Constants.ACTION_TYPE1 })).toEqual({
                [TestClass4.name]: [
                    'foo1',
                    'foo3'
                ],
                'Path': [
                    'foo4',
                    'foo6'
                ]
            })

        })
    })

    describe('pruxMiddleware', function () {
        it('must dispatch every transformed action when action is dispatched', () => {
            let {pruxMiddleware} = dispruxDecomposer(TestClass4, TestClass5)

            let rootReducer = (state: any, action: any)=>state
            let dispatchedActions: Array<string> = []
            const createStore = (reducer: Reducer<any>, preloadedState: any)=> {
                return {
                    subscribe: (listener: () => void) =>() => { },
                    getState:()=>{},
                    replaceReducer:(nextReducer: Reducer<any>)=>{},
                    dispatch: (action: Action)=> {
                        dispatchedActions.push(action.type)
                        return action}
                }

            }
            let store = applyMiddleware(pruxMiddleware)(createStore)(rootReducer, {})


            store.dispatch({type: Constants.ACTION_TYPE1})

            expect(dispatchedActions).toContain(Constants.ACTION_TYPE1)
            expect(dispatchedActions).toContain(ACTION_TYPE1_FROM_BAR1)
            expect(dispatchedActions).toContain(ACTION_TYPE1_FROM_BAR2)
            expect(dispatchedActions).toContain(ACTION_TYPE1_FROM_BAR3)
            expect(dispatchedActions).toContain(ACTION_TYPE1_FROM_BAR4)
            expect(dispatchedActions).toContain(ACTION_TYPE1_FROM_BAR5)




        })
    }


})



