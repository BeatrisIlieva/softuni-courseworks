import { assert, expect, should } from 'chai';

import { multiply, sum } from '../calculator.js';

// it('Should always pass', () => {
//     assert.equal(true, true);
// });

describe('Calculator Sum', () => {
    it('Should return the sum of positive numbers', () => {
        // Arrange
        const firstNumber = 1;
        const secondNumber = 2;
        const expectedResult = 3;

        // Act
        const actualResult = sum(firstNumber, secondNumber);

        // Assert
        expect(actualResult).to.equal(expectedResult);
    });
});
