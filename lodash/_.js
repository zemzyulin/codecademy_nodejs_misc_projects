const _ = {
    clamp(number, lowerBound, upperBound) {
        lowerClampedValue = Math.max(number, lowerBound);
        clampedValue = Math.min(lowerClampedValue, upperBound);
        return clampedValue;
    },
    inRange(number, start, end) {
        // declare temp vars
        let tmpStart = start;
        let tmpEnd = end;
        // check all possible conditions and return result
        if (end === undefined) {
            tmpStart = 0;
            tmpEnd = start;
        }
        if (end < start) {
            tmpStart = end;
            tmpEnd = start;
        }
        if (number >= tmpStart && number < tmpEnd) {
            return true;
        }
        else {
            return false;
        }
    },
    words(string) {
        // trim string off spaces and declare temp vars
        string = string.trim();
        let counter = 0;
        let result = [];
        let tmpString = '';
        // loop through string, split into words, push words into array
        for (let i = 0; i < string.length; i++) {
            if (string[i] === ' ') {
                result[counter] = tmpString;
                tmpString = ''
                counter++;
            }
            else {
                tmpString = tmpString.concat(string[i]);
            }
        }
        result[counter] = tmpString;
        // return the array of words
        return result;
    },
    pad(string, length) {
        // check short and equal length
        if (string.length >= length) {
            return string;
        }
        // check odd/even padding and concatenate string
        let padding = length - string.length;
        let result = string;
        if (padding % 2 !== 0) {
            result = result.concat(' ');
            for (let i = 0; i < (padding - 1) / 2; i++) {
                result = ' ' + result + ' ';
            }
        }
        else {
            for (let i = 0; i < padding / 2; i++) {
                result = ' ' + result + ' ';
            }
        }
        // return padded string
        return result;
    },
    has(obj, key) {
        if (obj[key] !== undefined) {
            return true;
        }
        else {
            return false;
        }
    },
    invert(obj) {
        const newObj = {};
        for (const prop in obj) {
            newObj[obj[prop]] = prop;
        }
        return newObj;
    },
    findKey(obj, func) {
        for (const x in obj) {
            if (func(obj[x])) {
                return x;
            }
        }
        return undefined;
    },
    drop(arr, num) {
        return (!num ? arr.slice(1) : arr.slice(num));
    },
    dropWhile(arr, func) {
        newArr = arr;
        for (let i = 0; i < arr.length; i++) {
            if (func(arr[i], i, arr)) {
                newArr = newArr.slice(1);
            }
            else {
                return newArr;
            }
        }
    },
    chunk(arr, size) {
        let newArr = [];
        if (!size) {
            size = 1;
        }
        for (let i = 0, j = 0; i < arr.length; i += size, j++) {
            newArr[j] = arr.slice(i, i + size);
        }
        return newArr;
    }
};






// Do not write or modify code below this line.
module.exports = _;