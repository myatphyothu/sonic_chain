const Blockchain = require('./blockchain');
const Block = require('./block');


describe('Blockchain', () => {
    let blockchain, newChain, originalChain;

    beforeEach(() => { 
        blockchain = new Blockchain(); 
        newChain = new Blockchain();
        originalChain = blockchain.chain;
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

    describe('replaceChain()', () => {
        let errorMock, logMock;

        beforeEach(() => {
            errorMock = jest.fn();
            logMock = jest.fn();

            global.console.error = errorMock;
            global.console.log = logMock;
        });

        describe('when the newChain is not longer', () => {
            beforeEach(() => {
                newChain.chain[0] = { new: 'xxdataxx' };
                blockchain.replaceChain(newChain.chain);
            })

            it('does not replace the chain', () => {
                expect(blockchain.chain).toEqual(originalChain);
            });

            it('logs an error', () => {
                expect(errorMock).toHaveBeenCalled();
            });
        });

        describe('when the newChain is longer', () => {
            beforeEach(() => {
                newChain.addBlock({data: 'Monday'});
                newChain.addBlock({data: 'Orange'});
                newChain.addBlock({data: 'Lavender'});
            });

            describe('and the newChain is not valid', () => {
                beforeEach(() => {
                    newChain.chain[2].hash = 'invalid hash';
                    blockchain.replaceChain(newChain.chain);
                });

                it('does not replace the chain', () => {
                    expect(blockchain.chain).toEqual(originalChain);
                });

                it('logs an error', () => {
                    expect(errorMock).toHaveBeenCalled();
                });
            });

            describe('and the newChain is valid', () => {
                beforeEach(() => {
                    blockchain.replaceChain(newChain.chain);
                });

                it('replaces the chain', () => {
                    expect(blockchain.chain).toEqual(newChain.chain);
                });

                it('logs new chain to the console', () => {
                    expect(logMock).toHaveBeenCalled();
                });
            });
        });
    });
});



