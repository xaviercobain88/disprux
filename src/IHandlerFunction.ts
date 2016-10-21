/**
 * Created by xavier on 10/17/16.
 */
import {Dispatch, Action} from "redux/index";
export interface IHandlerFunction { 
    <S>(action:Action,dispatch:Dispatch<S>,  state:S):void
}