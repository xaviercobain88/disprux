import {
    StoreCreator,
    Reducer,
    StoreEnhancer,
    Store,
    Action,
    createStore as originalCreateStore,
    combineReducers, applyMiddleware, Middleware
} from 'redux'
import { List } from 'immutable';
import { ReducerOf } from './ReducerOf'
import { Path } from './Path'
import { Annotation } from './decoratorReflection'
import cepMiddleware from './cepMiddleware'


export default function createStore<anyS>(handlers: any[], preloadedState?: any, middlewares?: Middleware[]): Store<any> {

    let reducerObject = handlers.reduce((reducers, handler) => {
        let reducersByClass = handler.prototype.decorators
            .filter((decorator: Annotation) => decorator.name === ReducerOf.name)
            .map((decorator: Annotation) => {
                if (decorator.args.length < 1)
                    return handler.prototype[decorator.propertyKey]
                return (state: any, action: Action) => {
                    console.log(action, "////")
                    if (decorator.args.indexOf(action.type) > -1) {
                        return handler.prototype[decorator.propertyKey](state, action)
                    }
                }
            }).toArray()
        let path = handler.prototype.decorators.find((decorator: Annotation) => decorator.name === Path.name)
        if (reducersByClass.length < 1)
            return reducers
        console.log("?????", reducersByClass.length)
        let finalReducer = (state: any, action: Action) => {
            console.log(action, state, "action")
            return reducersByClass.forEach((reducer: Function) => reducer(state, action))
        }
        console.log(finalReducer.toString())
        if (path && path.args.length > 0) {
            // console.log(path.args[0], "nnnnn"`)
            reducers[path.args[0]] = finalReducer
        } else {
            // console.log(handler.name, "yyyy")
            reducers[handler.name] = finalReducer
        }

        return reducers

    }, {})

    let combinedReducers = combineReducers(reducerObject)

    if (!middlewares) {
        middlewares = []
    }
    middlewares.push(cepMiddleware(...handlers))

    // console.log(JSON.stringify(combinedReducers), "///")

    console.log("''''", reducerObject)

    return originalCreateStore(combinedReducers, preloadedState, applyMiddleware(...middlewares))
}