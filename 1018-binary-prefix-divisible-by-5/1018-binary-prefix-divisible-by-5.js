/**
 * @param {number[]} nums
 * @return {boolean[]}
 */
var prefixesDivBy5 = function(nums) {
    const ans = [];
    let rem = 0; // remainder of current prefix modulo 5

    for (let i = 0; i < nums.length; i++) {
        rem = (rem * 2 + nums[i]) % 5;
        ans.push(rem === 0);
    }

    return ans;
};
