/**
 * @desc 大O表示法
 * @param O(1) 常数的
 * @param O(log(N)) 对数的
 * @param O(nlog(N)) 对数多项式的
 * @param O(n) 线性的
 * @param O(n^2) 二次的
 * @param O(n^c) 多次的
 * @param O(c^n) 指数的
 */

/**
 * @desc O(1)的例子
 * 该函数执行时间为X，不论参数是什么，执行时间都不会变化，函数性能都一样，所以它的复杂度是O(1)，常数级。
 */

function increment(num) {
  return ++num;
}

/**
 * @desc O(n)的例子
 * 该函数的执行时间取决于arr数组元素的个数
 */

function addLoop(arr, num) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] += num;
  }
}

/**
 * @desc O(n^2)的例子。如果用大小为n的数组执行，执行次数为n^2次
 */

function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 1; j < len - i - 1; j++) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      }
    }
  }
  console.log(arr);
  return arr;
}
