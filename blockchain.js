const cryptoHash = require('./crypto-hash');
const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    genesis() {
        return this.chain[0];
    }

    last() {
        return this.chain[this.chain.length-1];
    }

    addBlock({ data }) {
        const newBlock = Block.mineBlock({ lastBlock: this.last(), data });
        this.chain.push(newBlock);
    }

    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
            return false;

        for (let i = 1; i < chain.length; ++i) {
            const {timestamp, lastHash, hash, data, nonce, difficulty} = chain[i];
            const prevBlock = chain[i-1];

            if (lastHash !== prevBlock.hash) 
                return false;

            const validatedHash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);

            if (hash !== validatedHash)
                return false;
            
        }

        return true;
    }

    replaceChain(chain) {
        if (chain.length <= this.chain.length) {
            console.error('The incoming chain is not longer. Chain replacement did not happen.');
            return;
        }

        if (Blockchain.isValidChain(chain)) {
            console.log('replacing chain with', chain);
            this.chain = chain;
        }else
            console.error('The incoming chain is not valid. Chain replacement did not happen.');
    }
}

module.exports = Blockchain;