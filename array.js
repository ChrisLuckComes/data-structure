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

function threeSum(nums) {
  nums.sort((a, b) => a - b);

  let len = nums.length,
    result = [];

  for (let i = 0; i < len; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    let j = i + 1,
      k = len - 1;

    if (nums[i] + nums[j] + nums[k] > 0) {
      break;
    }

    while (j < k) {
      if (nums[i] + nums[j] + nums[k] === 0) {
        result.push([nums[i], nums[j], nums[k]]);
      } else if (nums[i] + nums[j] > nums[k]) {
        k--;
      } else {
        j++;
      }

      while (j < k && nums[k] === nums[--k]) {}
      while (j < k && nums[j] === nums[++j]) {}
    }
  }

  return result;
}

// console.log(threeSum([0, 1, -1, -1, 2]));
