/**
 * @param {number[]} nums
 * @return {boolean[]}
 */
var prefixesDivBy5 = function(nums) {
    let result = [];
    let num = 0;
    for (let bit of nums) {
        num = (num * 2 + bit) % 5;
        result.push(num === 0);
    }
    return result;
};

