import { Action, Store, Reducer } from 'redux'
export class SpyStore<S> implements Store<S>{

    state: S
    spy: Array<Action>

    constructor(state: S) {
        this.state = state
        this.spy = []
    }

    dispatch(action: Action) {
        this.spy.push(action)
        return action
    }
    getState() {
        return this.state
    }

    subscribe(listener: () => void) {
        return () => { }
    }
    replaceReducer(nextReducer: Reducer<S>) {
    }


}
