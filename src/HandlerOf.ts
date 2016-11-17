/**
 * Created by xavier on 10/17/16.
 */
import { Action, Store, MiddlewareAPI } from 'redux'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs'
import * as _ from 'lodash'
import { Object } from './Object'
import 'rxjs/add/operator/filter'


export interface Handler {
    <A extends Action, B extends Action, S>(action: A, store: MiddlewareAPI<S>): B
}

export interface ObservableHandler {
    <A extends Action, S>(action$: Observable<A>, store: MiddlewareAPI<S>): Observable<A>
}



const observableHandlerDecoratorFactory = (actionTypes: Array<string>, previousValue: ObservableHandler) =>
    <A extends Action, S>(action$: ActionsObservable<A>, store: MiddlewareAPI<S>) => {
        let filteredAction$ = action$.filter((action: Action) => _.includes(actionTypes, action.type))
        return previousValue(filteredAction$, store)
    }

const handlerDecoratorFactory = (actionTypes: Array<string>, previousValue: Handler) =>
    <A extends Action, S>(action: A, store: Store<S>) => {
        let result: Action
        if (_.includes(actionTypes, action.type)) result = previousValue(action, store)
        _.isUndefined(result) || _.isUndefined(result.type) || store.dispatch(result)

    }

const handlerArrayInitializer = (target: Object) => {
    if (_.isUndefined(target.handlers)) {
        target.handlers = []
    }
    if (_.isUndefined(target.observableHandlers)) {
        target.observableHandlers = []
    }
}

export const HandlerOf = (actionTypes: Array<string>, isObservable: boolean = false) =>
    (target: any, propertyKey: string = null, descriptor: PropertyDescriptor = null) => {

        const previousValue = descriptor.value

        handlerArrayInitializer(target)

        if (isObservable) {
            target.observableHandlers.push(propertyKey)
            descriptor.value = observableHandlerDecoratorFactory(actionTypes, previousValue)
        } else {
            target.handlers.push(propertyKey)
            descriptor.value = handlerDecoratorFactory(actionTypes, previousValue)
        }

    } 