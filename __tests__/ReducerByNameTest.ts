import { TestClass1 } from './helpers/TestClass1'
import { TestClass2 } from './helpers/TestClass2'
import { Object } from '../src/Object'
import { NAME } from '../src/ReducerByName'

describe('ReducerOfName', function () {


    it('must set NAME on Class\'s static attribute when annotated class', () => {

        expect(TestClass1.prototype.orderBy).toEqual(NAME)

    })

    it('must be undefined on Class\'s static attribute when not annotated class', () => {

        expect(TestClass2.prototype.orderBy).toBeUndefined()
    })
})  