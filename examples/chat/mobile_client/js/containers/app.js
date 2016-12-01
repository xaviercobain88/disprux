import React, {Component} from 'react';
import {Text} from 'react-native';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {dispruxDecomposer} from 'disprux'
import {UserHandler, GET_CONVERSATIONS_BY_USER_ID} from '../handlers/UserHandler'
import ConversationList from './ConversationList'


const {dispruxMiddleware, rootReducer} = dispruxDecomposer(UserHandler)
const store = applyMiddleware(dispruxMiddleware)(createStore)(rootReducer)

const itemList = [
    {
        avatarUrl: "https://avatars1.githubusercontent.com/u/2592468?v=3&s=460",
        title: "This is a title",
        id: "1",
        desc: "This is a description",
        timestamp: 1,
        onPress: ()=>console.log(1)
    },
    {
        avatarUrl: "https://avatars1.githubusercontent.com/u/2592468?v=3&s=460",
        title: "This is a title",
        id: "2",
        desc: "This is a description",
        timestamp: 1,
        onPress: ()=>console.log(2)
    }
]

export class App extends Component {
    componentWillMount() {
        store.dispatch({type: GET_CONVERSATIONS_BY_USER_ID, userId: 1})
    }

    render() {
        return <Provider store={store}>
            <ConversationList/>
        </Provider>
    }
}