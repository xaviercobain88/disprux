"use strict";
const immutable_1 = require('immutable');
const HandlerOf_1 = require('./HandlerOf');
/**
 * Created by xavier on 10/15/16.
 */
exports.CepMiddleware = (...handlers) => {
    let handlerList = immutable_1.List(handlers).filter(handler => handler.prototype.decorators);
    return (store) => (next) => (action) => {
        handlerList.forEach(handler => handler.prototype.decorators
            .forEach((annotation) => {
            if (annotation.args[0] == action.type && annotation.name === HandlerOf_1.HandlerOf.prototype.constructor.name) {
                handler.prototype[annotation.propertyKey](action, store.dispatch, store.getState());
            }
        }));
        next(action);
    };
};
//# sourceMappingURL=CepMiddleware.js.map