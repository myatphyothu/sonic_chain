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

    static isValidChain() {

    }
}

module.exports = Blockchain;