/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let path = [],
    set = new Set(),
    res = [];

  function backTracking() {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (path.length === 0 || !set.has(nums[i])) {
        path.push(nums[i]);
        set.add(nums[i]);
        backTracking();
        set.delete(nums[i]);
        path.pop();
      }
    }
  }

  backTracking();

  return res;
};

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let len = nums.length,
    left = 0,
    right = 0,
    sum = 0,
    res = Infinity;

  while (right < len) {
    sum += nums[right++];
    while (sum >= target) {
      res = Math.min(res, right - left);
      sum -= nums[left++];
    }
  }

  return res > len ? 0 : res;
};

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));
