/**
 * Created by xavier on 10/17/16.
 */
import { Action, Reducer } from 'redux'
import * as _ from 'lodash'
import { Object } from './Object'

let dot = require('dot-prop-immutable')

interface PathResolver {
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
        if (_.isUndefined(target.reducers)) {
            target.reducers = []
        }
        target.reducers.push(propertyKey)


        descriptor.value = <A extends Action, S>(state: any, action: A) => {


            let rootPath = _.isUndefined(target.rootPath) ? target.constructor.name : target.rootPath
            if (!_.includes(actionTypes, action.type)) return state
            let resolvedPath = _.isUndefined(path)
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

    }
