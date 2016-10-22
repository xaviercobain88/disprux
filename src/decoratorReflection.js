"use strict";
/**
 * Created by xavier on 10/21/16.
 */
const immutable_1 = require('immutable');
const PROPERTY = "PROPERTY";
const METHOD = "METHOD";
const CLASS = "CLASS";
function decoratorReflection(decoratorName, args) {
    return function (target, propertyKey, descriptor) {
        if (target.decorators == null) {
            target.decorators = immutable_1.List();
        }
        target.decorators = target.decorators.push({ name: decoratorName, propertyKey, args });
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = decoratorReflection;
//# sourceMappingURL=decoratorReflection.js.map