import {Middleware, MiddlewareAPI, Action, Dispatch} from "redux/index";
import {List} from 'immutable';
import {Annotation} from './decoratorReflection'
import {HandlerOf} from './HandlerOf'
/**
 * Created by xavier on 10/15/16.
 */


export const CepMiddleware = (...handlers:any[]):any => {

    let handlerList = List(handlers).filter(handler=>handler.prototype.decorators);

    return (store:MiddlewareAPI<any>) => (next:Dispatch<any>) => (action:Action) => {
        
        handlerList.forEach(handler=>handler.prototype.decorators
            .forEach((annotation:Annotation)=> {
                if (annotation.args[0] == action.type && annotation.name === HandlerOf.prototype.constructor.name) {
                    handler.prototype[annotation.propertyKey](action, store.dispatch, store.getState())
                }
            }));

        next(action);
    };

};
