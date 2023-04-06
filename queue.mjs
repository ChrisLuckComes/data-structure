import { LinkedList } from "./linkedList.mjs";

export default class Queue {
  #count = 0;
  #lowestCount = 0;
  #items = {};

  enqueue(element) {
    this.#items[this.#count++] = element;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.#items[this.#lowestCount];
    delete this.#items[this.#lowestCount];
    this.#lowestCount++;
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.#items[this.#lowestCount];
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.#count - this.#lowestCount;
  }

  clear() {
    this.#items = {};
    this.#count = 0;
    this.#lowestCount = 0;
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }

    let result = `${this.#items[this.#lowestCount]}`;
    for (let i = this.#lowestCount + 1; i < this.#count; i++) {
      result = `${result},${this.#items[i]}`;
    }

    return result;
  }
}

// const queue = new Queue();

// console.log(queue.isEmpty());

// queue.enqueue("luo");
// queue.enqueue("yun");

// console.log(queue.toString());

// queue.enqueue("lai");
// console.log(queue.toString());
// console.log(queue.size());
// console.log(queue.isEmpty());
// queue.dequeue();
// queue.dequeue();
// console.log(queue.toString());

class Deque {
  #count = 0;
  #lowestCount = 0;
  #items = {};

  addFront(element) {
    if (this.isEmpty()) {
      this.addBack(element);
    } else if (this.#lowestCount > 0) {
      this.#items[--this.#lowestCount] = element;
    } else {
      // 从#count开始遍历，相当于往后延长，最后留出开头的位置。
      for (let i = this.#count; i > 0; i--) {
        this.#items[i] = this.#items[i - 1];
      }
      this.#count++;
      this.#lowestCount = 0;
      this.#items[0] = element;
    }
  }

  addBack(element) {
    this.#items[this.#count++] = element;
  }

  removeFront(element) {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.#items[this.#lowestCount];
    delete this.#items[this.#lowestCount];
    this.#lowestCount++;
    return result;
  }

  removeBack(element) {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.#items[this.#count - 1];
    delete this.#items[this.#count - 1];
    this.#count--;
    return result;
  }

  peekFront() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.#items[this.#count - 1];
  }

  peekBack() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.#items[this.#lowestCount];
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.#count - this.#lowestCount;
  }

  clear() {
    this.#items = {};
    this.#count = 0;
    this.#lowestCount = 0;
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }

    let result = `${this.#items[this.#lowestCount]}`;
    for (let i = this.#lowestCount + 1; i < this.#count; i++) {
      result = `${result},${this.#items[i]}`;
    }

    return result;
  }
}

// const deque = new Deque();
// deque.addBack("luo");
// deque.addBack("yun");
// console.log(deque.toString());
// deque.addBack("lai");
// console.log(deque.size());
// deque.removeFront();
// console.log(deque.toString());
// deque.removeBack();
// console.log(deque.toString());
// deque.addFront("luo");
// console.log(deque.toString());

/**
 * 击鼓传花游戏
 */
function hotPotato(elementList, num) {
  const queue = new Queue();
  // list = []; //记录被淘汰的人

  //将人加入队列
  for (let i = 0; i < elementList.length; i++) {
    queue.enqueue(elementList[i]);
  }

  // 当队列只剩1人退出
  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }
    // 每一轮过后，队列末尾的人就出局。
    // list.push(queue.dequeue());
    queue.dequeue();
  }

  return {
    // eliminated: list,
    winner: queue.dequeue()
  };
}

hotPotato([0, 1, 2, 3, 4], 3);

// let { winner } = hotPotato(["a", "b", "c", "d", "e"], 7);

// eliminated.forEach((x) => console.log(`${x}被淘汰`));

// console.log(`${winner}赢了`);
/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var lastRemaining = function (n, m) {
  let queue = [];

  for (let i = 0; i < n; i++) {
    queue.push(i);
  }

  while (queue.length > 1) {
    for (let i = 1; i < m; i++) {
      queue.push(queue.shift());
    }
    queue.shift();
  }

  return queue.shift();
};

lastRemaining(70866, 116922);
