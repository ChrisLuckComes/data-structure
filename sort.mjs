// @ts-nocheck
import { swap } from "./tool.mjs";

var findKthLargest = function (nums, k) {
  //   function swap(nums, a, b) {
  //     [nums[a], nums[b]] = [nums[b], nums[a]];
  //   }

  //   function partition(nums, left, right, pivotIndex) {
  //     let pivot = nums[pivotIndex];
  //     swap(nums, pivotIndex, right); //为了方便比较除了pivot之外的所有元素，将它放到最右
  //     let storeIndex = left; //暂时保存left，left的值在循环中会变化

  //     //循环和pivot比较，如果比它小则放左边，比它大放右边
  //     for (let i = left; i <= right; i++) {
  //       if (nums[i] < pivot) {
  //         swap(nums, storeIndex, i);
  //         storeIndex++;
  //       }
  //     }

  //     swap(nums, storeIndex, right); //遍历完成之后再换回原本位置

  //     return storeIndex;
  //   }

  //   function quickSort(nums, left, right, kSmallest) {
  //     if (left === right) {
  //       return nums[left];
  //     }

  //     let pivotIndex = Math.random() * (right - left + 1) + left;
  //     pivotIndex = partition(nums, left, right, pivotIndex);

  //     if (kSmallest === pivotIndex) {
  //       return nums[kSmallest];
  //     } else if (kSmallest < pivotIndex) {
  //       return quickSort(nums, left, pivotIndex - 1, kSmallest);
  //     } else {
  //       return quickSort(nums, pivotIndex + 1, right, kSmallest);
  //     }
  //   }

  //   let len = nums.length;
  //   return quickSort(nums, 0, len - 1, len - k);

  function quickSort(nums, k) {
    let len = nums.length;
    if (len === 1) {
      return nums[0];
    }

    let mid = Math.ceil(len / 2),
      leftArr = [],
      rightArr = [],
      midArr = [];

    for (let i = 0; i < len; i++) {
      if (nums[i] === nums[mid]) {
        midArr.push(nums[i]);
      } else if (nums[i] > nums[mid]) {
        rightArr.push(nums[i]);
      } else {
        leftArr.push(nums[i]);
      }
    }

    if (rightArr.length >= k) {
      return quickSort(rightArr, len - k);
    } else if (midArr.length >= k - rightArr.length) {
      return nums[mid];
    } else {
      return quickSort(leftArr, len - rightArr.length - midArr.length);
    }
  }

  return quickSort(nums, k);
};

// let res = findKthLargest([3, 2, 1, 5, 6, 4], 2);
// console.log(res); //5

/**
 * @desc 选择排序，每次选定一个最小/最大值来比较,然后将最小/最大值放在头部/末尾。时间复杂度O(n^2)
 *
 */
function selectionSort(arr) {
  let minIndex;

  for (let i = 0; i < arr.length; i++) {
    minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex > i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
}

/**
 * @desc 插入排序 每次排一个数组项。假定第一项有序，接着比较第二项，如果比它小则插到第一项之前，否则不动，然后前两项就有序了。以此类推
 * 此算法排序小型数组时比冒泡和选择性能要好
 * @param {*} arr
 */
function insertSort(arr) {
  let target;
  for (let i = 1; i < arr.length; i++) {
    target = arr[i];
    let j = i;
    while (j > 0 && arr[j - 1] > target) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = target;
  }
}

export function fastSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let index = partition(arr, left, right);
    fastSort(arr, left, index - 1);
    fastSort(arr, index + 1, right);
  }
  return arr;
}

function partition(arr, left, right) {
  // [left,right]随机取元
  let pivotIndex = Math.floor(Math.random() * (right - left) + left);

  // 将该元放到端点
  swap(arr, left, pivotIndex);
  // 临时保存元，因为left会变化,此时left可以看作是空位
  let temp = arr[left];

  // 重复运行，直到相遇
  while (left < right) {
    //从右逐渐往元逼近
    while (left < right && temp <= arr[right]) {
      right--;
    }
    // 此时已经找完了右边，将元素赋值给左指针
    arr[left] = arr[right];
    // 从左往元逼近
    while (left < right && temp >= arr[left]) {
      left++;
    }
    // 将元素赋值给右指针
    arr[right] = arr[left];
  }

  arr[left] = temp;

  return left;
}

// /**
//  * @param {number[]} nums1
//  * @param {number} m
//  * @param {number[]} nums2
//  * @param {number} n
//  * @return {void} Do not return anything, modify nums1 in-place instead.
//  */
// var merge = function (nums1, m, nums2, n) {
//   let i = m,
//     j = n,
//     index = m + n - 1;
//   while (j) {
//     if (i === 0 || nums1[i - 1] <= nums2[j - 1]) {
//       nums1[index--] = nums2[--j];
//     } else {
//       nums1[index--] = nums1[--i];
//     }
//   }
// };

/**
 * @desc 冒泡排序，两两比较相邻项。时间复杂度O(n^2)
 * @param {Array} arr
 */
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      //减去外循环已跑过的轮数
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}

/**
 * @desc 归并排序，时间复杂度O(nlogn)。思想就是将数组分成切分成小数组直到长度为1，然后再合并为排序完成的数组。
 * @param {*} arr
 * @returns
 */
function mergeSort(arr) {
  if (arr.length > 1) {
    let len = arr.length,
      middle = Math.floor(len / 2),
      left = mergeSort(arr.slice(0, middle)),
      right = mergeSort(arr.slice(middle, len));
    arr = merge(left, right);
  }
  return arr;
}

/**
 * @desc 归并辅助函数，用于将连接数组
 * @param {*} left
 * @param {*} right
 * @returns
 */
function merge(left, right) {
  let i = 0,
    j = 0,
    result = [];

  while (i < left.length && j < right.length) {
    result.push(left[i] < right[j] ? left[i++] : right[j++]);
  }

  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}

/**
 * @desc 计数排序，它是分布式排序，使用辅助数据结构，然后合并，只能用于排序整数。时间复杂度为O(n+k);
 * @param {*} arr
 */
function countingSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const counts = new Array(Math.max.apply(null, arr) + 1);

  arr.forEach((element) => {
    if (!counts[element]) {
      counts[element] = 0;
    }
    counts[element]++;
  });

  let sortedIndex = 0;
  counts.forEach((count, i) => {
    while (count > 0) {
      arr[sortedIndex++] = i;
      count--;
    }
  });

  return arr;
}

/**
 * @desc 桶排序，它也是分布式排序算法。它将元素分为不同的桶，然后使用一个简单的排序算法对桶进行排序，最后合并。
 * @param {*} arr
 * @param {*} bucketSize
 */
function buckerSort(arr, bucketSize = 5) {
  if (arr.length < 2) {
    return arr;
  }
  const buckets = createBuckets(arr, bucketSize);
  return sortBuckets(buckets);
}

/**
 * @desc 创建桶，并将元素分配到不同的桶中
 * @param {*} arr
 * @param {*} bucketSize
 * @returns
 */
function createBuckets(arr, bucketSize) {
  let min = arr[0],
    max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    } else if (arr[i] > max) {
      max = arr[i];
    }
  }
  // 确定桶的数量
  const bucketCount = Math.floor((max - min) / bucketSize) + 1,
    buckets = [];

  for (let i = 0; i < bucketCount; i++) {
    buckets[i] = [];
  }

  // 元素分配
  for (let i = 0; i < arr.length; i++) {
    const bucketIndex = Math.floor((arr[i] - min) / bucketSize);
    buckets[bucketIndex].push(arr[i]);
  }

  return buckets;
}

function sortBuckets(buckets) {
  const sortedArr = [];
  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i] != null) {
      insertSort(buckets[i]);
      sortedArr.push(...buckets[i]);
    }
  }
  return sortedArr;
}

// console.log(buckerSort([23, 4545, 577, 22, 22, 576]));
