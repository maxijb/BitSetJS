jest.autoMockOff();
let BitSet = require('../lib/BitSet');

describe('BitSet of 1 integer', () => {

	//crating a default bitset and getting its backing data 
    let bitset = new BitSet();
    let data = bitset.getData();
    
    it('Bit array length', () => expect(bitset.length).toBe(32) );

    it('Type of data', () => expect(Array.isArray(data)).toBeTruthy() );

    it('Length of array data', () => expect(data.length).toBe(1) );

    it('First bit value', () => expect(bitset.get(0)).toBe(false) );

    it('setting second bit', () => expect(bitset.set(1)).toBe(true) );

    it('second bit value after setting', () => expect(bitset.get(1)).toBe(true) );

    it('clearing second bit', () => expect(bitset.clear(1)).toBe(true) );

    it('second bit value after clearing', () => expect(bitset.get(1)).toBe(false) );
    
    it('31 bit should be the last', () => expect(bitset.get(31)).toBe(false) );

    it('32 bit should be out of index', () => expect(bitset.get(32)).toBe(null) );

    it('stringify should return 32 0s in a row', () => expect(bitset.stringify()).toBe("00000000000000000000000000000000"));

});



describe('BitSet of 3 integers and all 1s', () => {

	//crating biset and getting its backing data 
    let bitset = new BitSet(96, 1);
    let data = bitset.getData();
    
    it('Bit array length', () => expect(bitset.length).toBe(96) );

    it('Type of data', () => expect(Array.isArray(data)).toBeTruthy() );

    it('Length of array data', () => expect(data.length).toBe(3) );

    it('Middle bit value', () => expect(bitset.get(48)).toBe(true) );

    it('clearing middle bit', () => expect(bitset.clear(48)).toBe(true) );
    
    it('Middle bit value after clearing', () => expect(bitset.get(48)).toBe(false) );

    it('Setting middle bit', () => expect(bitset.set(48)).toBe(true) );

    it('Middle bit value after setting', () => expect(bitset.get(1)).toBe(true) );

});


describe('Mixed BitSet of 5 bits', () => {

	//crating biset and getting its backing data 
    let bitset = new BitSet(5, 1);
    let data = bitset.getData();
    bitset.clear(2);
    bitset.clear(4);
    
    it('Bit array length', () => expect(bitset.length).toBe(5) );

    it('Type of data', () => expect(Array.isArray(data)).toBeTruthy() );

    it('Length of array data', () => expect(data.length).toBe(1) );

    it('toString object bitset', () => expect(bitset.toString()).toBe("[object BitSet]"));
    
    it('stringify 5 bits', () => expect(bitset.stringify()).toBe("11010"));

    it('7th bit should be out of index', () => expect(bitset.get(7)).toBe(null) );

});