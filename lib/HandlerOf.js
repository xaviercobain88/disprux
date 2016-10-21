"use strict";
var HandlerContainer_1 = require("./HandlerContainer");
/**
 * Created by xavier on 10/17/16.
 */
function HandlerOf() {
    var actionTypes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        actionTypes[_i - 0] = arguments[_i];
    }
    return function (target, propertyKey, descriptor) {
        actionTypes.forEach(function (actionType) { return HandlerContainer_1.default.addHandler(actionType, [descriptor.value, target.constructor.name]); });
    };
}
exports.HandlerOf = HandlerOf;
//# sourceMappingURL=HandlerOf.js.map