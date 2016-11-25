
import { firebaseManagerFactory, TIMESTAMP, STREAMS } from '../src/firebaseManagerFactory'
import { SUBSCRIPTION_DELETED } from '../src/dispruxDecomposer'
import { fakeStore } from './helpers/fakeStore'
import { Reducer, Action } from 'redux'
import * as firebase from 'firebase'
import * as _ from 'lodash'
describe('firebaseManagerFactory', function () {


    const config = {
        apiKey: "AIzaSyALfrrMAHFc39VFAd68c6wd4upTa0wGmPE",
        authDomain: "disprux.firebaseapp.com",
        databaseURL: "https://disprux.firebaseio.com",
        storageBucket: "disprux.appspot.com",
        messagingSenderId: "748439526520"
    };

    const ON_UPDATE = 'ON_UPDATE'
    const ON_DELETE = 'ON_DELETE'
    const REAL_TIME_PATH = 'REAL_TIME_PATH'
    const SOME_TYPE = 'SOME_TYPE'
    const SOME_STREAM1 = 'SOME_STREAM1'
    const SOME_STREAM2 = 'SOME_STREAM2'
    const ON_SOME_STREAM1 = 'ON_SOME_STREAM1'
    const ON_SOME_STREAM2 = 'ON_SOME_STREAM2'
    const ID = 1

    const a: [string, string] = [SOME_STREAM1, ON_SOME_STREAM1]
    const b: [string, string] = [SOME_STREAM2, ON_SOME_STREAM2]

    const action = {
        id: ID,
        onUpdate: ON_UPDATE,
        onDelete: ON_DELETE,
        realTimePath: REAL_TIME_PATH,
        onStreamUpdate: [a, b],
        type: SOME_TYPE
    }
    let dispatchedActions: Array<string>

    beforeEach(() => {
        dispatchedActions = []
    });

    const timeoutPromise = new Promise((resolve, reject) => setTimeout(() => resolve(true), 1000))

    it('must dispatch onUpdate action type when real time path is updated', async () {
        let firebaseDatabase: firebase.database.Database = firebase.initializeApp(config, 't1').database()
        firebaseManagerFactory(firebaseDatabase)(action, fakeStore(dispatchedActions))
        await firebaseDatabase.ref(`${REAL_TIME_PATH}/${ID}/${TIMESTAMP}`).set(Math.random())
        await timeoutPromise
        expect(dispatchedActions).toContain(ON_UPDATE)
        expect(dispatchedActions.length).toBe(1)
    })
    it('must dispatch onDelete and SUBSCRIPTION_DELETED action type when real time path is removed', async () {
        let firebaseDatabase: firebase.database.Database = firebase.initializeApp(config, 't2').database()
        firebaseManagerFactory(firebaseDatabase)(action, fakeStore(dispatchedActions))
        await firebaseDatabase.ref(`${REAL_TIME_PATH}/${ID}/${TIMESTAMP}`).remove()
        await timeoutPromise
        expect(dispatchedActions).toContain(ON_DELETE)
        expect(dispatchedActions).toContain(SUBSCRIPTION_DELETED)
        expect(dispatchedActions.length).toBe(2)
    })

    it('must dispatch every on stream update\' action type when stream\'s timestamp is updated', async () {
        let firebaseDatabase: firebase.database.Database = firebase.initializeApp(config, 't3').database()
        firebaseManagerFactory(firebaseDatabase)(action, fakeStore(dispatchedActions))
        await firebaseDatabase.ref(`${REAL_TIME_PATH}/${ID}/${TIMESTAMP}`).set(Math.random())
        await firebaseDatabase.ref(`${REAL_TIME_PATH}/${ID}/${STREAMS}/${SOME_STREAM1}/${TIMESTAMP}`).set(Math.random())
        await firebaseDatabase.ref(`${REAL_TIME_PATH}/${ID}/${STREAMS}/${SOME_STREAM2}/${TIMESTAMP}`).set(Math.random())
        await timeoutPromise
        expect(dispatchedActions).toContain(ON_SOME_STREAM1)
        expect(dispatchedActions).toContain(ON_SOME_STREAM2)
        expect(dispatchedActions).toContain(ON_UPDATE)
        expect(dispatchedActions.length).toBe(3)

    })

    it('must dispatch a single stream update\' action type when a single specific stream\'s timestamp is updated', async () {
        let firebaseDatabase: firebase.database.Database = firebase.initializeApp(config, 't4').database()
        firebaseManagerFactory(firebaseDatabase)(action, fakeStore(dispatchedActions))
        await firebaseDatabase.ref(`${REAL_TIME_PATH}/${ID}/${TIMESTAMP}`).set(Math.random())
        await firebaseDatabase.ref(`${REAL_TIME_PATH}/${ID}/${STREAMS}/${SOME_STREAM1}/${TIMESTAMP}`).set(Math.random())
        await timeoutPromise
        expect(dispatchedActions).toContain(ON_SOME_STREAM1)
        expect(dispatchedActions).toContain(ON_UPDATE)
        expect(dispatchedActions.length).toBe(2)

    })

    it('must omit firebase future changes when firebase ref is removed', async () {
        let firebaseDatabase: firebase.database.Database = firebase.initializeApp(config, 't5').database()
        firebaseManagerFactory(firebaseDatabase)(action, fakeStore(dispatchedActions))
        await firebaseDatabase.ref(`${REAL_TIME_PATH}/${ID}/${TIMESTAMP}`).remove()
        await firebaseDatabase.ref(`${REAL_TIME_PATH}/${ID}/${TIMESTAMP}`).set(Math.random())
        await firebaseDatabase.ref(`${REAL_TIME_PATH}/${ID}/${STREAMS}/${SOME_STREAM1}/${TIMESTAMP}`).set(Math.random())
        await firebaseDatabase.ref(`${REAL_TIME_PATH}/${ID}/${STREAMS}/${SOME_STREAM2}/${TIMESTAMP}`).set(Math.random())
        await timeoutPromise
        expect(dispatchedActions).toContain(ON_DELETE)
        expect(dispatchedActions).toContain(SUBSCRIPTION_DELETED)
        expect(dispatchedActions.length).toBe(2)

    })



})   