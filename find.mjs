import { fastSort } from "./sort.mjs";
import { swap } from "./tool.mjs";

/**
 * @desc 二分查找
 * @param {*} arr
 * @param {*} value
 * @returns
 */
function binarySearch(arr, value) {
  const sortedArr = fastSort(arr);
  let low = 0,
    high = sortedArr.length - 1,
    mid,
    element;

  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    element = sortedArr[mid];
    if (element < value) {
      low = mid + 1;
    } else if (element > value) {
      high = mid - 1;
    } else {
      return mid;
    }
  }

  return -1;
}

/**
 * @desc 洗牌算法，迭代数组，从最后一位开始将当前位置和随机位置进行交换。随机数需要比当前位置小，这样可以保证随机过的为止不会再随机一次。
 * @param {*} arr
 */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    swap(arr, randomIndex, i);
  }
  return arr;
}

// console.log(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]));
