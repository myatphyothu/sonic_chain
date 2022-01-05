console.log('quickchain');

const quickHash = (data) => {
    return data + "*";
}

class Block {
    constructor(data, hash, lastHash) {
        this.data = data;
        this.hash = hash;
        this.lastHash = lastHash;
    }
}

class Blockchain {
    constructor() {
        const genesis = new Block ('genesis-quickchain', 'genesis-hash', 'genesis-lastHash');
        this.chain = [genesis];
    }

    addBlock(data) {
        const lastHash = this.chain[this.chain.length-1].hash;
        const hash = quickHash(data + lastHash);
        const block = new Block(data, hash, lastHash);
        this.chain.push(block);
    }
}

const quickchain = new Blockchain();
quickchain.addBlock("one-");
quickchain.addBlock("two-");
quickchain.addBlock("three-");
console.log(quickchain);