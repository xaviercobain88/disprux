import HandlerContainer from "./HandlerContainer";
/**
 * Created by xavier on 10/17/16.
 */
export function HandlerOf(...actionTypes:string[]) {

    return function (target:any, propertyKey:string, descriptor:PropertyDescriptor) {
        actionTypes.forEach(actionType=>HandlerContainer.addHandler(actionType, [descriptor.value, target.constructor.name]))
    }
}
