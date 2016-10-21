import {Middleware, MiddlewareAPI, Action, Dispatch} from "redux/index";
import HandlerContainer from "./HandlerContainer";
import {IHandlerFunction} from "./IHandlerFunction";
import {Iterable, List, Map} from 'immutable';
/**
 * Created by xavier on 10/15/16.
 */


export const CepMiddleware = (...handlers:any[]):Middleware => {
    let verifiedHandlers = HandlerContainer.handlerMap.map((tupleList, actionType)=> {
        return [actionType, tupleList.filter(tuple=>handlers.map(handler=>handler.name)
            .indexOf(tuple[1]) > -1).map(tuple=>tuple[0]).toList()];
    }).toMap();

    return (store:MiddlewareAPI<any>) => (next:Dispatch<any>) => (action:Action) => {
        verifiedHandlers.filter((functionList, actionType)=>actionType == action.type).map(tuple=>tuple[1])
            .forEach((functionList:List<IHandlerFunction>)=>functionList
                .forEach(handlerFunction=>handlerFunction(action, store.dispatch, store.getState())));
        next(action);
    };

};
