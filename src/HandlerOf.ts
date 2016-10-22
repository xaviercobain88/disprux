/**
 * Created by xavier on 10/17/16.
 */
import decoratorReflection from './decoratorReflection'

export function HandlerOf(...actionTypes:string[]) {

    return decoratorReflection("HandlerOf", actionTypes)
}
