let BitSet = (function() {
    
    //symbol to ofuscate the data array
    const dataSymbol = Symbol('data');

    //toString return value
    const stringRepresentation = "[object BitSet]";
    
    //number of bits per integer
    const BITS = 32;

    /* Private method to convert N to byte, bit */
    const convert = function(n) {
        if (n >= this.length) return null;
        let byte = n / BITS | 0,
            bit = n % BITS;

        return {byte , bit};
    }

    const checkOtherParamTypeAndLength = function(other) {
        if (other.toString() != stringRepresentation) {
            throw "Only can modify a BitSet with another BitSet";
        } else if (other.length != this.length) {
            throw "Only can modify BitSets with the same length";
        }
    }

    /* Constructor 
    @param legnth [optional] can receive either:
        - an integer indicating the number of bits in the bit vector
        - or an array with actual data to be loaded
    @param value [optional] 1 or 0, initial value for all bits in the array
        - if first param is an array, value is ignored
    */
    function BitSet(length=32, value=0) {
        
        if (typeof length == "string") {
            let bits = length.split('');
            if (!bits.every(x => x == '1' || x == 0)) {
                throw "BitSet can convert an string only composed by 0s and 1s"
            }
            
            //initialize array with 0s 
            this.length = bits.length;
            this[dataSymbol] = Array.apply(null, Array(Math.ceil(bits.length / BITS))).map((x) => 0);
            
            bits.reverse().forEach((item, i) => {
                if (item == '1') this.set(i);
            });
        }
        else if (Array.isArray(length)) {
            this.length = BITS * length.length;
            this[dataSymbol] = length;
        } else {
            //cache length
            this.length = length;
            
            //how many ints we need for the bits required
            let ints = Math.ceil(length / BITS);

            //initialize the backing array with the desired values
            this[dataSymbol] = Array.apply(null, Array(ints)).map((x) => !value ? 0 : -1);
        }

    }

    
	/* ------------------  Public Methods --------------------*/

    //get the n desired byte (calls convert to get the exact location)
    BitSet.prototype.get = function(n) {
        let pos = convert.call(this, n);
        return pos ? (this[dataSymbol][pos.byte] & 1 << pos.bit) > 0 : null;
    };

    //set the n desired byte to 1 (calls convert to get the exact location)
    BitSet.prototype.set = function(n) {
        let pos = convert.call(this, n);
        if (pos) this[dataSymbol][pos.byte] |= 1 << pos.bit;
        return pos != null;
    }

    //set the n desired byte to 1 (calls convert to get the exact location)
    BitSet.prototype.toggle = function(n) {
        let pos = convert.call(this, n);
        if (pos) this[dataSymbol][pos.byte] ^= 1 << pos.bit;
        return pos != null;
    }

    //set the n desired byte to 0 (calls convert to get the exact location)
    BitSet.prototype.clear = function(n) {
    	let pos = convert.call(this, n);
		if (pos) this[dataSymbol][pos.byte] &= ~(1 << pos.bit);
		return pos != null;
    }

    //inverts the array of bits
    BitSet.prototype.invert = function () {
        this[dataSymbol] = this[dataSymbol].map(x => ~x);
        return this;
    };

    //return the backing data as an array of integers
    BitSet.prototype.getData = function() {
    	return this[dataSymbol];
    }

    //string type of the object
    BitSet.prototype.toString = function() {
        return "[object BitSet]";
    }

    //return the array of boolean values 1|0
    BitSet.prototype.toArray = function() {
    	let buffer = [];
        for (let i = 0; i < this.length; i++) {
            buffer.push(this.get(i) ? 1 : 0);
        }
        return buffer;
    }

    //stringifies the array of bits as 00101100...
    BitSet.prototype.stringify = function() {
    	return this.toArray().reverse().join("");
    }

    //count number of 1s in the array
    BitSet.prototype.count = function() {
        return this.toArray().filter(x => !!x).length;
    }

    //xor two bitsets
    BitSet.prototype.xor = function(other) {
        checkOtherParamTypeAndLength.call(this, other);
        let otherData = other.getData();
        this[dataSymbol] = this[dataSymbol].map((x, i) => x ^ otherData[i]);
        return this;
    }

    //or two bitsets
    BitSet.prototype.or = function(other) {
        checkOtherParamTypeAndLength.call(this, other);
        let otherData = other.getData();
        this[dataSymbol] = this[dataSymbol].map((x, i) => {console.log(x,otherData[i], (x|otherData[i])); return x | otherData[i] });
        return this;
    }

    //and two bitsets
    BitSet.prototype.and = function(other) {
        checkOtherParamTypeAndLength.call(this, other);
        let otherData = other.getData();
        this[dataSymbol] = this[dataSymbol].map((x, i) => x & otherData[i]);
        return this;
    }



    return BitSet;
}());


/* Exports for browser's global object or exports as commonJS */
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = BitSet;
else
    window.BitSet = BitSet;

