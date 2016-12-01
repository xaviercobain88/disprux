export abstract class Object {
    handlers: Array<string>
    observableHandlers: Array<string>
    reducers: Array<string>
    orderBy: string
    actionTypesByMethod: Map<any, Array<string>>
    rootPath: string

    static initializer(target: Object) {
        if (!(target.handlers)) {
            target.handlers = []
        }
        if (!(target.observableHandlers)) {
            target.observableHandlers = []
        }

        if (!(target.actionTypesByMethod)) {
            target.actionTypesByMethod = new Map<any, Array<string>>()
        }
        if (!(target.reducers)) {
            target.reducers = []
        }
    }


}