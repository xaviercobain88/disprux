"use strict";
const HandlerContainer_1 = require("./HandlerContainer");
/**
 * Created by xavier on 10/17/16.
 */
function HandlerOf(...actionTypes) {
    return function (target, propertyKey, descriptor) {
        actionTypes.forEach(actionType => HandlerContainer_1.default.addHandler(actionType, [descriptor.value, target.constructor.name]));
    };
}
exports.HandlerOf = HandlerOf;
//# sourceMappingURL=HandlerOf.js.map