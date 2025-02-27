import { expect } from 'chai';
import { isSymmetric } from '../symmetry.js';

describe('isSymmetric', () => {
    it('should return true if the array is symmetric', () => {
        const input = [1, 2, 1];

        const result = isSymmetric(input);

        expect(result).to.be.true;
    });

    it('should return false if the array is not symmetric', () => {
        const input = [1, 2, 2];

        const result = isSymmetric(input);

        expect(result).to.be.false;
    });

    it('Should return false if the input is not an array', () => {
        // expect(() => isSymmetric({})).to.throw();
        expect(isSymmetric({})).to.be.false;
        expect(isSymmetric('')).to.be.false;
        expect(isSymmetric(true)).to.be.false;
        expect(isSymmetric(NaN)).to.be.false;
        expect(isSymmetric('1, 2, 3')).to.be.false;
    });
});
