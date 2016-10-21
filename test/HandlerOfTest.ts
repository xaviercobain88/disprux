/**
 * Created by xavier on 10/17/16.
 */
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
import {assert} from 'chai';
import HandlerContainer from "../src/HandlerContainer";
import {HandlerOf} from "../src/HandlerOf";
import {Map, List} from 'immutable';
import {IHandlerFunction} from "../src/IHandlerFunction";

describe('HandlerOfTest', function () {

    const ACTION_TYPE = "ACTION_TYPE";

    before(function () {

        HandlerContainer.handlerMap = Map<string,List<[IHandlerFunction, string]>>();
    });

    it('must add item to Map when some method is annotated with a unique actionType', function () {


        class Test {
            @HandlerOf(ACTION_TYPE)
            foo() {
            }
        }
        assert(HandlerContainer.handlerMap.size === 1)
    });

    it('must add item to List of specific key when some method is annotated', function () {

        let listSize = HandlerContainer.handlerMap.get(ACTION_TYPE).size;

        class Test {
            @HandlerOf(ACTION_TYPE)
            foo() {
            }
        }
        assert(HandlerContainer.handlerMap.get(ACTION_TYPE).size === listSize + 1)
    });

    it('must not add item to Map when some method is annotated with a non unique actionType', function () {

        class Test {
            @HandlerOf(ACTION_TYPE)
            foo() {
            }
        }
        class Test2 {
            @HandlerOf(ACTION_TYPE)
            foo() {
            }
        }
        assert(HandlerContainer.handlerMap.size === 1)
    });
});