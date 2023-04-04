/**
 * 节点类
 */
class Node {
  val = "";
  left = "";
  right = "";
  constructor(val = null, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1
};

function defaultCompareFn(a, b) {
  if (a === b) {
    return 0;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]];
}

/**
 * @desc 堆是一种特殊的二叉树，它能高效快速的找出最大值和最小值，常被应用于优先队列，也被用于著名的堆排序算法中，有如下特性：
 * 1. 它是完全二叉树，树的每一层都有左右节点，并且最后一层的叶子节点尽可能都是左节点。
 * 2. 它不是最小堆就是最大堆。所有的节点都大于等于(最大堆)或小于等于(最小堆)每个它的子节点。
 * 它并不一定是二叉搜索树，BST的左节点小于右节点。
 */
class MinHeap {
  heap = [];
  constructor(compareFn = defaultCompareFn) {
    this.compareFn = compareFn;
  }

  /**
   * 对于给定节点，左子节点的计算公式：2*index + 1;
   */
  getLeftIndex(index) {
    return 2 * index + 1;
  }
  /**
   * 对于给定节点，右子节点的计算公式：2*index + 2;
   */
  getRightIndex(index) {
    return 2 * index + 2;
  }
  /**
   * 对于给定节点，父节点的计算公式：(index-1)/2;
   */
  getParentIndex(index) {
    if (index === 0) {
      return undefined;
    }
    return Math.floor((index - 1) / 2);
  }

  /**
   * @desc 将值插入堆的叶子节点(数组末尾)，然后执行siftUp上移，将它和父节点交换，直到父节点小于插入的值为止。
   * @param {*} value
   * @returns {boolean}
   */
  insert(value) {
    if (value != null) {
      this.heap.push(value);
      this.siftUp(this.heap.length - 1);
      return true;
    }
    return false;
  }

  /**
   * @desc 上移操作
   * @param {*} index
   */
  siftUp(index) {
    let parent = this.getParentIndex(index); // 获取父级的index
    // 如果父级存在且比插入值大，那么交换
    while (
      index > 0 &&
      this.compareFn(this.heap[parent], this.heap[index]) ===
        Compare.BIGGER_THAN
    ) {
      swap(this.heap, parent, index); //交换
      index = parent; //index设为父级
      parent = this.getParentIndex(index); //父级设为它的父级
    }
  }

  /**
   * @desc 下移操作，将元素和最小子节点和最大子节点进行交换，并且不能和自己交换。
   * @param {*} index
   */
  siftDown(index) {
    let element = index,
      left = this.getLeftIndex(index),
      right = this.getRightIndex(index),
      size = this.size();
    if (
      left < size &&
      this.compareFn(this.heap[element], this.heap[left]) ===
        Compare.BIGGER_THAN
    ) {
      element = left;
    }

    if (
      right < size &&
      this.compareFn(this.heap[element], this.heap[right]) ===
        Compare.BIGGER_THAN
    ) {
      element = right;
    }

    if (index !== element) {
      swap(this.heap, index, element);
      this.siftDown(element);
    }
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  /**
   * 移除数组中的第一个元素(根节点)，然后执行下移操作，使堆的结构正常
   */
  extract() {
    if (this.isEmpty()) {
      return undefined;
    }
    if (this.size() === 1) {
      return this.heap.shift();
    }
    const removedValue = this.heap.shift();
    this.siftDown(0);
    return removedValue;
  }

  findMin() {
    return this.isEmpty() ? undefined : this.heap[0];
  }
}

function reverseCompare(compareFn) {
  return (a, b) => compareFn(b, a);
}

class MaxHeap extends MinHeap {
  heap = [];
  constructor(compareFn = defaultCompareFn) {
    super(compareFn);
    this.compareFn = reverseCompare(compareFn);
  }
}

function heapify(arr, index, size, compareFn) {
  let element = index,
    left = 2 * index + 1,
    right = 2 * index + 2;
  if (
    left < size &&
    compareFn(arr[element], arr[left]) === Compare.BIGGER_THAN
  ) {
    element = left;
  }

  if (
    right < size &&
    compareFn(arr[element], arr[right]) === Compare.BIGGER_THAN
  ) {
    element = right;
  }

  if (index !== element) {
    swap(arr, index, element);
    heapify(element, index, size, compareFn);
  }
}

function buildMaxHeap(arr, compareFn) {
  for (let i = Math.floor(arr.length / 2); i >= 0; i -= 1) {
    heapify(arr, i, arr.length, compareFn);
  }
  return arr;
}

function heapSort(arr, compareFn = defaultCompareFn) {
  let heapSize = arr.length;
  buildMaxHeap(arr, compareFn);
  while (heapSize > 1) {
    swap(arr, 0, --heapSize);
    heapify(arr, 0, heapSize, compareFn);
  }
  return arr;
}

let array = [7, 6, 3, 5, 4, 1, 2];

console.log(heapSort(array));
