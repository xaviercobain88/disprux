import * as _ from 'lodash'


export abstract class Object {
    handlers: Array<string>
    observableHandlers: Array<string>
    reducers: Array<string>
    orderBy: string
    actionTypesByMethod: Map<any, Array<string>>
    rootPath: string

    static initializer(target: Object) {
        if (_.isUndefined(target.handlers)) {
            target.handlers = []
        }
        if (_.isUndefined(target.observableHandlers)) {
            target.observableHandlers = []
        }

        if (_.isUndefined(target.actionTypesByMethod)) {
            target.actionTypesByMethod = new Map()
        }
        if (_.isUndefined(target.reducers)) {
            target.reducers = []
        }
    }


}