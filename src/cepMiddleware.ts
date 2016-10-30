import { Middleware, MiddlewareAPI, Action, Dispatch } from "redux/index";
import { List } from 'immutable';
import { Annotation } from './decoratorReflection'
import { HandlerOf } from './HandlerOf'
import { createEpicMiddleware, EpicMiddleware, combineEpics, Epic } from 'redux-observable'
/**
 * Created by xavier on 10/15/16.
 */


export default (...handlers: any[]): any => {


    let handlerList = List(handlers).filter(handler => handler.prototype.decorators);

    let epics: Epic<any>[] = []


    handlerList.forEach(handler => handler.prototype.decorators
        .forEach((annotation: Annotation) => {
            if (annotation.name === "OBSERVABLE_HANDLER_OF") {
                epics.push(handler.prototype[annotation.propertyKey])
            }
        }));
    let reduxObservableMiddleware: EpicMiddleware<any> = createEpicMiddleware(combineEpics(...epics))

    return (store: MiddlewareAPI<any>) => (next: Dispatch<any>) => (action: Action) => {


        handlerList.forEach(handler => handler.prototype.decorators
            .forEach((annotation: Annotation) => {
                if (annotation.args.indexOf(action.type) > -1
                    && annotation.name === "HANDLER_OF") {
                    handler.prototype[annotation.propertyKey](action, store)
                    next(action);
                }
                if (annotation.args.indexOf(action.type) > -1
                    && annotation.name === "OBSERVABLE_HANDLER_OF") {
                    reduxObservableMiddleware(store)(next)(action);
                }
            }));


    };

};
