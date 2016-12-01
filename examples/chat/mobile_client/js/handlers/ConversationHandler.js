import { Path, HandlerOf } from 'disprux'

export 

@Path("conversations/byId")
export class ConversationHandler {

    @HandlerOf([Constants.ACTION_TYPE1])
    foo(action: Action, store: Store<State>) {
        return Constants.testAction
    }

}