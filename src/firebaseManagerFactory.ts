import { RealTimeManager, RealTimeAction, SUBSCRIPTION_DELETED } from './dispruxDecomposer'
import { MiddlewareAPI } from 'redux'
import { RxFirebaseApp, RxFirebaseAuth, RxFirebaseView, EventType } from 'rxjsfirebase'
import * as firebase from 'firebase'
import * as _ from 'lodash'

export const TIMESTAMP = 'TIMESTAMP'
export const STREAMS = 'STREAMS'

export const firebaseManagerFactory = (database: firebase.database.Database) => {


    return <T>(action: RealTimeAction<T>, store: MiddlewareAPI<any>) => {
        let realTimePath = `${action.realTimePath + (_.endsWith(action.realTimePath, '/') ? '' : '/') + action.id.toString()}/${TIMESTAMP}`
        let entityReference = database.ref(realTimePath)

        let streamSubscriptions = action.onStreamUpdate.map(tuple => {

            let streamPath = `${action.realTimePath + (_.endsWith(action.realTimePath, '/') ? '' : '/') + action.id.toString()}/${STREAMS}/${tuple[0]}/${TIMESTAMP}`
            let streamReference = database.ref(streamPath)

            return new RxFirebaseView(streamReference).rx_observe(EventType.VALUE)
                .map(snapshot => snapshot.val())
                .skip(1)
                .distinct()
                .filter(val => !_.isNull(val))
                .subscribe(val => {
                    store.dispatch({ type: tuple[1], id: action.id })
                })

        })

        new RxFirebaseView(entityReference).rx_observe(EventType.VALUE)
            .map(snapshot => snapshot.val())
            .takeWhile(val => !_.isNull(val))
            .distinct()
            .subscribe(val => {
                store.dispatch({ type: action.onUpdate, id: action.id })

            }, () => { }, () => {
                streamSubscriptions.forEach(subscription => subscription.unsubscribe())
                store.dispatch({ type: action.onDelete, id: action.id })
                store.dispatch({ type: SUBSCRIPTION_DELETED, realTimePath })
            })

    }
}