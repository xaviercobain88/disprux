"use strict";
var HandlerContainer_1 = require("./HandlerContainer");
/**
 * Created by xavier on 10/15/16.
 */
exports.CepMiddleware = function () {
    var handlers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        handlers[_i - 0] = arguments[_i];
    }
    var verifiedHandlers = HandlerContainer_1.default.handlerMap.map(function (tupleList, actionType) {
        return [actionType, tupleList.filter(function (tuple) { return handlers.map(function (handler) { return handler.name; })
                .indexOf(tuple[1]) > -1; }).map(function (tuple) { return tuple[0]; }).toList()];
    }).toMap();
    return function (store) { return function (next) { return function (action) {
        verifiedHandlers.filter(function (functionList, actionType) { return actionType == action.type; }).map(function (tuple) { return tuple[1]; })
            .forEach(function (functionList) { return functionList
            .forEach(function (handlerFunction) { return handlerFunction(action, store.dispatch, store.getState()); }); });
        next(action);
    }; }; };
};
//# sourceMappingURL=CepMiddleware.js.map