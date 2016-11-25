import { TestClass1, ON_DELETE, ON_STREAM_UPDATE, ON_UPDATE, STREAM, SOME_PATH } from './helpers/TestClass1'

describe('RealTimeAction', function () {


    it('must set onUpdate, onDelete & onStreamUpdate when action creator is annotated', () => {

        const action = TestClass1.prototype.getSomeAction('1', 'SOME_TYPE')
        expect(action.realTimePath).toEqual(SOME_PATH)
        expect(action.onUpdate).toEqual(ON_UPDATE)
        expect(action.onDelete).toEqual(ON_DELETE)
        expect(action.onStreamUpdate).toEqual([[STREAM, ON_STREAM_UPDATE]])

    })

})  