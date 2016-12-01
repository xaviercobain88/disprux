import {Path, HandlerOf, ReducerOf, RealTimeAction} from 'disprux'

export const GET_CONVERSATIONS_BY_USER_ID = "GET_CONVERSATIONS_BY_USER_ID"
export const CONVERSATION_ADDED = "CONVERSATION_ADDED"
export const UPDATE_CONVERSATION = "UPDATE_CONVERSATION"
export const DELETE_CONVERSATION = "DELETE_CONVERSATION"

@Path("users/byId")
export class UserHandler {

    @HandlerOf([GET_CONVERSATIONS_BY_USER_ID])
    getConversationsByUserId(action, store) {

        fetch(`http://localhost:3000/users/${action.userId}/conversations`, {
            method: 'get'
        }).then(function (response) {
            response.json().then(jsonResponse=> {
                jsonResponse.data.forEach(conversation=>store.dispatch(

                ))
            })
        })
    }

    @ReducerOf([CONVERSATION_ADDED], (action) => `${action.id}`)
    conversationAddedReducer(state, action) {
        
    }

    @RealTimeAction("/conversations", UPDATE_CONVERSATION, DELETE_CONVERSATION)
    getSomeAction(id:string, type:string) {
        return {id, type}
    }

}