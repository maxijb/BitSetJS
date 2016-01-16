# BitSetJS
Library to create and deal with a BitSet in ES6.
BitSet creates a bit array, which allows us to store a big amount of binary flags in a very memory-wise efficient manner.

This library supports these operations:

- getting, setting and toggling of individual bits
- counting how many 1s bits are in the array
- serialization to and from strings (`001101` binary format)
- serialization to and from arrays 
- Use in the Browser, or as a CommonJS module

## Usage
```
a = new BitArray(6);
a.set(0);
a.set(3);
a.stringify(); // "001001"
a.get(1); // false
a.get(3); // true
```

Internally, the library stores the bit array, into 32 bits integers objects. So, if you create a 64 bits array, the library will internally hold an array of 2 integers. You can call **bitset.getData()** to get this private array of integers, and transfer this array in client-server communications.

## API

You can initialiaze a BitSet with threee different constructors:

**BitSet(size=32 :int, value=0 :boolean)**

Creates a new bit array with the given size and the selected value as default. Value can be 0 or 1. Ex: 
`new Bitset(3, 1).stringify() == '111'`

**BitSet(binary : string)**

Takes a binary number *0101*, and converts it to the correspondent bits in the array. The rightmost carachter is the bit 0.

**BitSet(ints : array[int])**

Sets the the array of integers as the backing stored data of the bitset. Ex:
`new BitSet([3]).stringify() == '00000000000000000000000000000011';`


The operations supported by the BitSet:

**length**

This property contains the number of bits in the bitset.

**set(N)**

Sets the N bit to 1. Returns `true` if the operation was succesful. 

**get(N)**

Returns the value of the bit at `N` (boolean)

**toggle(N)**

Toggles (inverts) the bit at `N` index. 

**toString()**

Returns "[object BitSet]" in order to identify the object as a Bitset.

**stringify()**

Returns the binary representation of the bitSet.

**getData()**

Gets the data with the integers holding the bits information. Ex: 
`new BitSet("101").getData() // [5]`

**count()**

Returns the total number of bits set to 1 in this BitSet.

**invert()**

Inverts this BitSet.


## How to include

This library has been writen in ES6. However, an ES5 version (compiled by babel 5) is also distributed.

Also, by npm:

```
> npm install bit-set-js
```

## Licence

GNU GENERAL PUBLIC LICENSE
