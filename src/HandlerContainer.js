"use strict";
/**
 * Created by xavier on 10/16/16.
 */
const immutable_1 = require('immutable');
class HandlerContainer {
    static addHandler(actionType, tuple) {
        HandlerContainer.handlerMap = HandlerContainer.handlerMap.set(actionType, HandlerContainer.handlerMap.get(actionType) ?
            HandlerContainer.handlerMap.get(actionType).push(tuple) :
            immutable_1.List().push(tuple));
    }
}
HandlerContainer.handlerMap = immutable_1.Map();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HandlerContainer;
//# sourceMappingURL=HandlerContainer.js.map