/**
 * @desc 最少硬币找零问题，贪心法，倒序遍历硬币，尽量使用最大的硬币，但是它并不一定能得到最优解。
 * @param {*} coins
 * @param {*} amount
 */
function minCoinChange(coins, amount) {
  let change = [],
    total = 0;

  for (let i = coins.length - 1; i >= 0; i--) {
    let coin = coins[i];
    while (total + coin <= amount) {
      change.push(coin);
      total += coin;
    }
  }

  return change;
}

console.log(minCoinChange([1, 3, 4], 6));
