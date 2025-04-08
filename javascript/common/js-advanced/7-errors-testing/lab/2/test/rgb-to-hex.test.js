import { expect } from 'chai';
import { rgbToHexColor } from 'rgb-to-hex.js';

describe('rgbToHexColor', () => {
    it('Should return valid hex color', () => {
        const input = [4, 5, 6];

        const expected = '#040506';

        const result = rgbToHexColor(...[input]);

        expect(expected).to.equal(result);
    });
});

