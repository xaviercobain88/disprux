"use strict";
/**
 * Created by xavier on 10/17/16.
 */
const decoratorReflection_1 = require('./decoratorReflection');
function HandlerOf(...actionTypes) {
    return decoratorReflection_1.default("HandlerOf", actionTypes);
}
exports.HandlerOf = HandlerOf;
//# sourceMappingURL=HandlerOf.js.map