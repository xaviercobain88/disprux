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
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../node_modules/redux/index.d.ts" />
/**
 * Created by xavier on 10/16/16.
 */
const chai_1 = require('chai');
const CepMiddleware_1 = require("../src/CepMiddleware");
const HandlerOf_1 = require("../src/HandlerOf");
const redux_1 = require('redux');
describe('CepMiddleware', function () {
    const ACTION_TYPE = "ACTION_TYPE";
    const ACTION_TYPE2 = "ACTION_TYPE2";
    class Test {
        foo(action) {
            action.foo = true;
        }
        foo2(action) {
            action.foo2 = true;
        }
    }
    __decorate([
        HandlerOf_1.HandlerOf(ACTION_TYPE), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Test.prototype, "foo", null);
    __decorate([
        HandlerOf_1.HandlerOf(ACTION_TYPE), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Test.prototype, "foo2", null);
    class Test2 {
        foo(action) {
            action.foo3 = true;
        }
    }
    __decorate([
        HandlerOf_1.HandlerOf(ACTION_TYPE2), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Test2.prototype, "foo", null);
    let spyAction = { type: ACTION_TYPE, foo: false, foo2: false, foo3: false };
    let spyAction2 = { type: ACTION_TYPE2, foo: false, foo2: false, foo3: false };
    it('must set spyAction\'s fields foo, foo2 to true and foo3 to false (no handled) when ' +
        'action is sent to dispatch', function (done) {
        let store = redux_1.createStore((state, action) => {
            return {};
        }, {}, redux_1.applyMiddleware(CepMiddleware_1.CepMiddleware(Test)));
        store.dispatch(spyAction);
        setTimeout(() => {
            chai_1.assert(spyAction.foo);
            chai_1.assert(spyAction.foo2);
            chai_1.assert(!spyAction.foo3);
            done();
        }, 100);
    });
    it('must set spyAction\'s fields foo3 to true when there are many handlers(Test1, Test2) and ' +
        'ActionTypes(ACTION_TYPE1, ACTION_TYPE2) set', function (done) {
        let store = redux_1.createStore((state, action) => {
            return {};
        }, {}, redux_1.applyMiddleware(CepMiddleware_1.CepMiddleware(Test, Test2)));
        store.dispatch(spyAction2);
        setTimeout(() => {
            chai_1.assert(!spyAction2.foo);
            chai_1.assert(!spyAction2.foo2);
            chai_1.assert(spyAction2.foo3);
            done();
        }, 100);
    });
});
//# sourceMappingURL=CepMiddlewareTest.js.map