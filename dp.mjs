/**
 * @desc 动态规划 - 硬币找零问题
 * @param {*} coins
 * @param {*} amount
 */
function minCoinChange(coins, amount) {
  const cache = [],
    makeChange = (value) => {
      if (!value) {
        return [];
      }
      if (cache[value]) {
        return cache[value];
      }

      let min = [],
        newMin,
        newAmount;

      for (let i = 0; i < coins.length; i++) {
        const coin = coins[i];
        newAmount = value - coin;
        if (newAmount >= 0) {
          newMin = makeChange(newAmount);
        }
        if (
          newAmount >= 0 &&
          (newMin.length < min.length - 1 || !min.length) &&
          (newMin.length || !newAmount)
        ) {
          min = [coin, ...newMin];
          console.log(`new Min ${min} for ${amount}`);
        }
      }
      return (cache[value] = min);
    };
  return makeChange(amount);
}

/**
 * @desc 动态规划法求最小数量
 * @param {*} coins
 * @param {*} amount
 * @returns
 */
function minChange(coins, amount) {
  let dp = new Array(amount + 1).fill(Infinity);

  dp[0] = 0;

  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

/**
 * @desc 动态规划法求组合数量
 * @param {*} coins
 * @param {*} amount
 * @returns
 */
function minChangeResult(coins, amount) {
  let dp = new Array(amount + 1).fill(0);

  dp[0] = 1;

  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      dp[j] += dp[j - coins[i]];
    }
  }

  return dp[amount];
}

/**
 * @desc 不同路径
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  let dp = new Array(m).fill([]).map((x) => Array(n).fill(0));

  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
  }

  for (let j = 1; j < n; j++) {
    dp[0][j] = 1;
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i][j - 1] + dp[i - 1][j];
    }
  }

  return dp[m - 1][n - 1];
};

/**
 * @desc 最长公共子序列
 * 'acbaed'
 * 'abcadf'
 */
function lcs(wordX, wordY) {
  let lenX = wordX.length,
    lenY = wordY.length;

  let dp = new Array(lenX + 1).fill([]).map((x) => new Array(lenY + 1).fill(0)),
    max = 0;

  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[0].length; j++) {
      if (wordX[i - 1] == wordY[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
      max = Math.max(max, dp[i][j]);
    }
  }

  printSolution(dp, wordX, max);

  return max;
}

function printSolution(dp, wordX, max) {
  let str = "",
    maxValue = max;
  label: for (let i = dp.length - 1; i > 0; i--) {
    for (let j = dp[0].length - 1; j > 0; j--) {
      if (
        dp[i][j] > dp[i - 1][j] &&
        dp[i][j] > dp[i][j - 1] &&
        dp[i][j] > dp[i - 1][j - 1]
      ) {
        str += wordX[i - 1];
        if (--maxValue == 0) {
          break label;
        }
      }
    }
  }
  console.log(Array.from(str).reverse());
}

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findLength = function (nums1, nums2) {
  let dp = new Array(nums1.length + 1)
      .fill([])
      .map((x) => new Array(nums2.length + 1).fill(0)),
    max = 0;

  for (let i = 0; i < dp.length; i++) {
    for (let j = 0; j < dp[0].length; j++) {
      if (nums1[i] === nums2[j]) {
        dp[i][j] = 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
      max = Math.max(max, dp[i][j]);
    }
  }

  return max;
};

/**
 * @desc 最长递增子序列以及结果输出
 * @param {number[]} arr
 * @return {number}
 */
var lengthOfLIS = function (arr) {
  let res = 1,
    len = arr.length,
    dp = new Array(len).fill(1);

  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    res = Math.max(res, dp[i]);
  }

  let max = res,
    result = [];

  for (let i = len - 1; i >= 0; i--) {
    if (dp[i] === max) {
      result.unshift(arr[i]);
      max--;
    }
  }

  return res;
};

// lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]);
