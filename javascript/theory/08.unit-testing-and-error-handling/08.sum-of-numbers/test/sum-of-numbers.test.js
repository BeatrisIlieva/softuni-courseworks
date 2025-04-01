import { expect } from 'chai';
import { sum } from '../sum-of-numbers.js'; // add the js extension

describe('Sum', () => {
    it('Should return the sum of numbers', () => {
        const input = [1, 2, 3];

        const expectedResult = 6;

        const actualResult = sum(input);

        expect(actualResult).to.equal(expectedResult);
    });
});
