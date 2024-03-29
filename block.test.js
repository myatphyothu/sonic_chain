const Block = require("./block");
const { GENESIS_DATA } = require("./config");
const cryptoHash = require('./crypto-hash');

describe ('Block', () => {
    const timestamp = '01/01/21';
    const lastHash = 'lastHash';
    const hash = 'hash';
    const data = ['data1', 'data2'];
    const nonce = 1;
    const difficulty = 1;
    const block = new Block({timestamp, lastHash, hash, data, nonce, difficulty});

    it('has a timestamp property', () => { expect(block.timestamp).toEqual(timestamp); });
    it('has a lastHash property', () => { expect(block.lastHash).toEqual(lastHash); })
    it('has a hash property', () => { expect(block.hash).toEqual(hash); })
    it('has a data property', () => { expect(JSON.stringify(block.data)).toEqual(JSON.stringify(data)); })
    it('has a nonce property', () => { expect(block.nonce).toEqual(nonce); });
    it('has a difficulty property', () => { expect(block.difficulty).toEqual(difficulty); });


    describe('genesis()', () => {
        it('returns an instance of Block class', () => {
            expect(Block.genesis() instanceof Block).toBe(true);
        })
    
        it('returns genesis data', () => {
            expect(Block.genesis()).toEqual(GENESIS_DATA);
        })
    })

    describe('mineBlock()', () => {
        const lastBlock = Block.genesis();
        const data = "mined data";
        const minedBlock = Block.mineBlock({ lastBlock, data });

        it('returns an instance of Block class', () => {
            expect(minedBlock instanceof Block).toBe(true);
        });

        it('sets the `lastHash` of minedBlock to be the `hash` of lastBlock', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
        });

        it('sets the `data`', () => {
            expect(minedBlock.data).toEqual(data);
        });

        it('sets the `timestamp`', () => {
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });

        it('creates a SHA-256 `hash` based on the propert inputs', () => {
            expect(minedBlock.hash).toEqual(
                cryptoHash(
                    minedBlock.timestamp,
                    minedBlock.nonce,
                    minedBlock.difficulty, 
                    data, 
                    lastBlock.hash
                )
            );
        });

        it('sets the `hash` that matches the difficulty criteria', () => {
            expect(minedBlock.hash.substring(0, minedBlock.difficulty)).toEqual('0'.repeat(minedBlock.difficulty));
        });

    });
    
});



