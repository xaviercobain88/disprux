/**
 * Created by xavier on 10/17/16.
 */
import {Action, Store, MiddlewareAPI} from 'redux'
import {ActionsObservable} from 'redux-observable'
import * as _ from 'lodash'

export const HandlerOf = (actionTypes:Array<string>, isObservable:boolean = false) =>
    (target:any, propertyKey:string = null, descriptor:PropertyDescriptor = null) => {

        const previousValue = descriptor.value
        descriptor.value = isObservable
            ? <A extends Action, S>(action$:ActionsObservable<A>, store:MiddlewareAPI<S>) => {
            let filteredAction$ = action$.filter((action:Action) => {
                return _.includes(actionTypes, action.type)
            })
            return previousValue(filteredAction$, store)
        }
            : <A extends Action, S>(action:A, store:Store<S>) => {

            let result = !_.includes(actionTypes, action.type) || previousValue(action, store)
            _.isUndefined(result) || _.isUndefined(result.type) || store.dispatch(result)

        }


    } 