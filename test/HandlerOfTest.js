"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by xavier on 10/17/16.
 */
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
const chai_1 = require('chai');
const HandlerContainer_1 = require("../src/HandlerContainer");
const HandlerOf_1 = require("../src/HandlerOf");
const immutable_1 = require('immutable');
describe('HandlerOfTest', function () {
    const ACTION_TYPE = "ACTION_TYPE";
    before(function () {
        HandlerContainer_1.default.handlerMap = immutable_1.Map();
    });
    it('must add item to Map when some method is annotated with a unique actionType', function () {
        class Test {
            foo() {
            }
        }
        __decorate([
            HandlerOf_1.default(ACTION_TYPE), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], Test.prototype, "foo", null);
        chai_1.assert(HandlerContainer_1.default.handlerMap.size === 1);
    });
    it('must add item to List of specific key when some method is annotated', function () {
        let listSize = HandlerContainer_1.default.handlerMap.get(ACTION_TYPE).size;
        class Test {
            foo() {
            }
        }
        __decorate([
            HandlerOf_1.default(ACTION_TYPE), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], Test.prototype, "foo", null);
        chai_1.assert(HandlerContainer_1.default.handlerMap.get(ACTION_TYPE).size === listSize + 1);
    });
    it('must not add item to Map when some method is annotated with a non unique actionType', function () {
        class Test {
            foo() {
            }
        }
        __decorate([
            HandlerOf_1.default(ACTION_TYPE), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], Test.prototype, "foo", null);
        class Test2 {
            foo() {
            }
        }
        __decorate([
            HandlerOf_1.default(ACTION_TYPE), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', void 0)
        ], Test2.prototype, "foo", null);
        chai_1.assert(HandlerContainer_1.default.handlerMap.size === 1);
    });
});
//# sourceMappingURL=HandlerOfTest.js.map