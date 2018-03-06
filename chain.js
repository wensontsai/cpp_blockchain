
const SHA256 = require('sha256');

class Block {

    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

}

class Blockchain {
    
    // Section 1 Genesis block creation
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "03/05/2018", "Genesis Block", "0");
    }

    // Section 2 adding new blocks
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addblock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    // Section 3 validating the chain
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
        }

        if (currentBlock.previousHash !== previousBlock.hash) {
            return false;
        }

        return true;
    }
}

// Run chain.
let testChain = new Blockchain();
testChain.addblock(new Block(1, "01/01/2020", { amount: 4 }));
testChain.addblock(new Block(2, "01/02/2020", { amount: 15 }));

console.log(testChain);