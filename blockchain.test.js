const Blockchain = require('./blockchain');
const Block = require('./block');


describe('Blockchain', () => {
    let blockchain;

    beforeEach(() => { 
        blockchain = new Blockchain(); 
    });

    it('contains a `chain` Array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    describe('genesis()', () => {
        it('returns the genesis block', () => {
            expect(blockchain.genesis()).toEqual(Block.genesis());
        });
    });
    
    describe('last()', () => {
        it('returns the last block of the blockchain', () => {
            expect(blockchain.last()).toEqual(blockchain.chain[blockchain.chain.length-1]);
        });
    });
    
    describe('addBlock()', () => {
        it('adds a new block to the chain', () => {
            const newData = 'new blockchain data';
            blockchain.addBlock({data: newData});
            expect(blockchain.last().data).toEqual(newData);
        });
    });
    
    describe('isValidChain()', () => {

        beforeEach(() => {
            blockchain.addBlock({data: 'Monday'});
            blockchain.addBlock({data: 'Orange'});
            blockchain.addBlock({data: 'Lavender'});
        });

        describe('when the multi-block chain does not start with the genesis block', () => {
            it('returns false', () => {
                blockchain.chain[0] = { data: 'fake genesis' };
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });
    
        describe('when the multi-block chain starts with the genesis block ', () => {
            describe('and the last hash value has changed', () => {
                it('returns false', () => {
                    blockchain.chain[2].lastHash = 'xxAAbbCCdd';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });
    
            describe('and the chain contains the block with an invalid field', () => {
                it('returns false', () => {
                    blockchain.chain[2].data = 'coffee';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });
    
            describe('and the chain does not contain any invalid blocks', () => {
                it('returns true', () => {
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                });
            })
        });
    });
});



