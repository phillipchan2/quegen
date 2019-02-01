import { anOrA, aOrAn } from './stringUtils'

it('should give correctly a or an', () => {
	expect(aOrAn('bat')).toEqual('a')
	expect(aOrAn('animal')).toEqual('an')
	expect(aOrAn('Igloo')).toEqual('an')
})
