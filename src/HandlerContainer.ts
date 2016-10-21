/**
 * Created by xavier on 10/16/16.
 */
import {Map, List} from 'immutable';
import {IHandlerFunction} from "./IHandlerFunction";

export default class HandlerContainer {
    static handlerMap:Map<string,List<[ IHandlerFunction, string]>> = Map<string,List<[IHandlerFunction, string]>>();

    static addHandler(actionType:string, tuple:[IHandlerFunction,string]) {

        HandlerContainer.handlerMap = HandlerContainer.handlerMap.set(actionType, HandlerContainer.handlerMap.get(actionType) ?
            HandlerContainer.handlerMap.get(actionType).push(tuple) :
            List<[IHandlerFunction, any]>().push(tuple)
        )
    }
}