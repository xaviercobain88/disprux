/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../node_modules/redux/index.d.ts" />
/**
 * Created by xavier on 10/16/16.
 */
import {assert} from 'chai';
import {CepMiddleware} from "../src/CepMiddleware";
import {HandlerOf} from "../src/HandlerOf";
import {createStore, applyMiddleware, compose, Action} from 'redux';


describe('CepMiddleware', function () {
    const ACTION_TYPE = "ACTION_TYPE";
    const ACTION_TYPE2 = "ACTION_TYPE2";
    interface SpyAction extends Action {
        foo:boolean;
        foo2:boolean;
        foo3:boolean;
    }
    class Test {
        @HandlerOf(ACTION_TYPE)
        foo(action:SpyAction) {
            action.foo = true;
        }

        @HandlerOf(ACTION_TYPE)
        foo2(action:SpyAction) {
            action.foo2 = true;
        }
    }
    class Test2 {
        @HandlerOf(ACTION_TYPE)
        foo(action:SpyAction) {
            action.foo3 = true;
        }

    }
    class Test3 {
        @HandlerOf(ACTION_TYPE2)
        foo(action:SpyAction) {
            action.foo3 = true;
        }

    }
    let spyAction:SpyAction = {type: ACTION_TYPE, foo: false, foo2: false, foo3: false};
    let spyAction2:SpyAction = {type: ACTION_TYPE2, foo: false, foo2: false, foo3: false};


    it('must set spyAction\'s fields foo, foo2 to true and foo3 to false (no handled) when ' +
        'action is sent to dispatch', function (done) {
        let store = createStore(
            (state:any, action:any) => {
                return {};
            },
            {},
            applyMiddleware(CepMiddleware(Test)));
        store.dispatch(spyAction);

        setTimeout(()=> {
            assert(spyAction.foo);
            assert(spyAction.foo2);
            assert(!spyAction.foo3);
            done();
        }, 100)
    })

    it('must set spyAction\'s fields foo3 to true when there are many handlers(Test1, Test2) and ' +
        'ActionTypes(ACTION_TYPE1, ACTION_TYPE2) set', function (done) {
        let store = createStore(
            (state:any, action:any) => {
                return {};
            },
            {},
            applyMiddleware(CepMiddleware(Test, Test3)));
        store.dispatch(spyAction2);

        setTimeout(()=> {
            assert(!spyAction2.foo);
            assert(!spyAction2.foo2);
            assert(spyAction2.foo3);
            done();
        }, 100)
    })

});
