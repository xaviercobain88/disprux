/**
 * Created by xavier on 10/21/16.
 */
import { List } from 'immutable';

export interface Annotation {
    name: string;
    propertyKey: string;
    args: Array<any>;
    target: any
}
interface Object {
    decorators: List<Annotation>

}

const PROPERTY = "PROPERTY";
const METHOD = "METHOD";
const CLASS = "CLASS";


export default function decoratorReflection(decoratorName: string, args: Array<any>) {

    return function (target: any, propertyKey: string = null, descriptor: PropertyDescriptor = null) {

        if (target.decorators == null) {
            target.decorators = List<Annotation>()
        }
        target.decorators = target.decorators.push({ name: decoratorName, propertyKey, args, target });
    }
}