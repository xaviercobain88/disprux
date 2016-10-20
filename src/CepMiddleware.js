"use strict";
const HandlerContainer_1 = require("./HandlerContainer");
/**
 * Created by xavier on 10/15/16.
 */
exports.CepMiddleware = (...handlers) => {
    let verifiedHandlers = HandlerContainer_1.default.handlerMap.map((tupleList, actionType) => {
        return [actionType, tupleList.filter(tuple => handlers.map(handler => handler.name)
                .indexOf(tuple[1]) > -1).map(tuple => tuple[0]).toList()];
    }).toMap();
    return (store) => (next) => (action) => {
        verifiedHandlers.filter((functionList, actionType) => actionType == action.type).map(tuple => tuple[1])
            .forEach((functionList) => functionList
            .forEach(handlerFunction => handlerFunction(action, store.dispatch, store.getState())));
        next(action);
    };
};
//# sourceMappingURL=CepMiddleware.js.map