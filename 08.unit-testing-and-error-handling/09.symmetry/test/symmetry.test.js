import { expect } from 'chai';
import { isSymmetric } from '../symmetry.js';

describe('isSymmetric', () => {
    it('Should return true if the array is symmetric', () => {
        const input = [1, 2, 1];

        const result = isSymmetric(input);

        expect(result).to.be.true;
    });

    it('Should return false if the array is not symmetric', () => {
        const input = [1, 2, 3];

        const result = isSymmetric(input);

        expect(result).to.be.false;
    });

    it('Should throw an error if the input is not an array', () => {
        expect(() => isSymmetric({})).to.throw();
        expect(() => isSymmetric('')).to.throw();
        expect(() => isSymmetric(true)).to.throw();
        expect(() => isSymmetric(NaN)).to.throw();
        expect(() => isSymmetric('1, 2, 1')).to.throw();
        expect(() => isSymmetric(undefined)).to.throw();
        expect(() => isSymmetric(null)).to.throw();
        expect(() => isSymmetric(1, 2, 1)).to.throw();
    });
});
