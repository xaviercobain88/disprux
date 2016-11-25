import { Reducer, Action } from 'redux'
export const fakeStore = (dispatchedActions: Array<string>) => {
    return {
        subscribe: (listener: () => void) => () => { },
        getState: () => { },
        replaceReducer: (nextReducer: Reducer<any>) => { },
        dispatch: (action: Action) => {
            dispatchedActions.push(action.type)
            return action
        }
    }
}