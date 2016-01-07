let BitSet = (function() {
    
    //symbol to ofuscate the data array
    const dataSymbol = Symbol('data');

    //number of bits per integer
    const BITS = 32;

    /* Private method to convert N to byte, bit */
    const convert = function(n) {
        if (n >= this.length) return null;
        let byte = n / BITS | 0,
            bit = n % BITS;

        return {byte , bit};
    }

    /* Constructor 
    @param legnth [optional] can receive either:
        - an integer indicating the number of bits in the bit vector
        - or an array with actual data to be loaded
    @param value [optional] 1 or 0, initial value for all bits in the array
        - if first param is an array, value is ignored
    */
    function BitSet(length=32, value=0) {
        
        if (Array.isArray(length)) {
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

    //set the n desired byte to 0 (calls convert to get the exact location)
    BitSet.prototype.clear = function(n) {
    	let pos = convert.call(this, n);
		if (pos) this[dataSymbol][pos.byte] &= ~(1 << pos.bit);
		return pos != null;
    }

    //return the backing data as an array of integers
    BitSet.prototype.getData = function() {
    	return this[dataSymbol];
    }

    //string type of the object
    BitSet.prototype.toString = function() {
        return "[object BitSet]";
    }

    //stringifies the array of bits as 00101100...
    BitSet.prototype.stringify = function() {
    	let buffer = "";
        for (let i = 0; i < this.length; i++) {
            buffer += this.get(i) ? "1" : "0";
        }
    	return buffer;
    }

    return BitSet;
}());


/* Exports for browser's global object or exports as commonJS */
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = BitSet;
else
    window.BitSet = BitSet;

