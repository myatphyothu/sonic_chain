const cryptoHash = require('./crypto-hash');

// describe("cryptoHash()", () => {
//     const hello = "hello";
//     const sha256hello = "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824";

//     it("returns a SHA-256 hashed output", () => {
//         expect(cryptoHash(hello)).toEqual(sha256hello);
//     });

//     it("returns the same SHA-256 hash output regardless of the order of the same input arguments", () => {
//         expect(cryptoHash('x','y','z')).toEqual(cryptoHash('y','z','x'));
//     });

// });

describe('cryptoHash()', () => {
    const xyz = 'xyz';
    const abc = 'abc';
    const pqr = 'pqr';
    const sha256xyz = '3608bca1e44ea6c4d268eb6db02260269892c0b42b86bbf1e77a6fa16c3c9282';

    it('returns a SHA-256 hashed output', () => {
        expect(cryptoHash(xyz)).toEqual(sha256xyz);
    });

    it('returns the same SHA-256 hash regardless of the order of the same input arguments', () => {
        expect(cryptoHash(xyz,abc,pqr)).toEqual(cryptoHash(abc,pqr,xyz));
    });
});