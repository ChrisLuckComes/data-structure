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

  let dp = new Array(lenX + 1).fill([]).map((x) => new Array(lenY + 1).fill(0));

  for (let i = 0; i <= lenX; i++) {
    for (let j = 0; j <= lenY; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] === 0;
      } else if (wordX[i - 1] === wordY[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[lenX][lenY];
}

function lcs_Solution(wordX, wordY) {
  let lenX = wordX.length,
    lenY = wordY.length;

  let dp = new Array(lenX + 1).fill([]).map((x) => new Array(lenY + 1).fill(0)),
    solution = new Array(lenX + 1)
      .fill([])
      .map((x) => new Array(lenY + 1).fill("0"));

  for (let i = 0; i <= lenX; i++) {
    for (let j = 0; j <= lenY; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 0;
      } else if (wordX[i - 1] === wordY[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        solution[i][j] = "diagonal";
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        solution[i][j] = dp[i][j] === dp[i - 1][j] ? "top" : "left";
      }
    }
  }

  // return dp[lenX][lenY];
  return printSolution(solution, dp, lenX, lenY);
}

function printSolution(solution, wordX, m, n) {
  let a = m,
    b = n,
    x = solution[a][b],
    answer = "";

  while (x !== "0") {
    if (solution[a][b] === "diagonal") {
      answer = wordX[a - 1] + answer;
      a--;
      b--;
    } else if (solution[a][b] === "left") {
      b--;
    } else if (solution[a][b] === "top") {
      a--;
    }
    x = solution[a][b];
  }
  console.log(answer);
  return answer;
}
