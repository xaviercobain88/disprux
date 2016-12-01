/**
 * Created by xavier on 10/17/16.
 */
declare var require: any
import { Action, Reducer } from 'redux'
// import * as _ from 'lodash'
import { Object } from './Object'

let dot = require('dot-prop-immutable')

export interface PathResolver {
    (action: Action): string
}

const ACTION = "action."


const interpolate = <A extends Action>(str: string, action: any) =>
    str.replace(/\${([^}]+)\}/g, (a: string, b: string) => {
        return (b.indexOf(ACTION) === 0) ? action[b.substring(ACTION.length)] : a

    })

export const ReducerOf = (actionTypes: Array<string>, path?: string | PathResolver) =>
    (target: any, propertyKey: string = null, descriptor: PropertyDescriptor = null) => {

        const previousFunctionValue = descriptor.value
        Object.initializer(target)
        target.reducers.push(propertyKey)



        descriptor.value = <A extends Action, S>(state: any, action: A) => {


            let rootPath = !(target.rootPath) ? target.constructor.name : target.rootPath
            if (!actionTypes.find(item => item == action.type)) return state
            let resolvedPath = !(path)
                ? rootPath
                : (typeof path === 'string'
                    ? rootPath + "." + interpolate(path, action)
                    : rootPath + "." + path(action))
            let specificState = dot.get(state, resolvedPath)

            let newSpecificState = previousFunctionValue(specificState, action)
            return newSpecificState === specificState
                ? state
                : dot.set(state, resolvedPath, newSpecificState)

        }
        target.actionTypesByMethod.set(descriptor.value, actionTypes)
    }
