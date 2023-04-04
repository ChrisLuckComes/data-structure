class Node {
  val = null;
  next = null;
  // prev = null;
  constructor(val = null, next = null) {
    this.val = val;
    this.next = next;
  }
}

class DoublyNode extends Node {
  prev = null;
  constructor(val = null, next = null, prev = null) {
    super(val, next);
    this.prev = prev;
  }
}

export class LinkedList {
  head = null;
  count = 0;
  push(element) {
    let node = new Node(element),
      current;
    if (this.head == null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
  }

  /**
   * 工具函数，获取传入下标的节点
   * @param {*} index
   * @returns
   */
  getElementAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
      return current;
    }
    return undefined;
  }

  removeAt(index) {
    if (index === 0) {
      this.head = this.head.next;
    } else {
      let prev = this.getElementAt(index - 1),
        current = prev.next;
      prev.next = current.next;
    }
    this.count--;
  }

  insertAt(element, index) {
    if (index >= 0 && index < this.count) {
      let node = new Node(element);
      if (index === 0) {
        let curr = this.head;
        node.next = curr;
        this.head = node;
      } else {
        let prev = this.getElementAt(index - 1),
          curr = prev.next;
        prev.next = node;
        node.next = curr;
      }
      this.count++;
      return true;
    }
    return false;
  }

  indexOf(element) {
    let current = this.head,
      index = 0;
    while (current && index < this.count) {
      if (current === element) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  remove(element) {
    const index = this.indexOf(element);
    this.removeAt(index);
  }

  size() {
    return this.count;
  }

  getHead() {
    return this.head;
  }

  isEmpty() {
    return this.size() === 0;
  }

  toString() {
    if (!this.head) {
      return "";
    }
    let result = `${this.head.val}`,
      current = this.head.next;
    for (let i = 1; i < this.size() && current; i++) {
      result = `${result},${current.val}`;
      current = current.next;
    }
    return result;
  }
}

class DoubleLinkedList extends LinkedList {
  head = null;
  tail = null;
  constructor() {}

  add(item) {
    let node = new Node(item);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      // 把当前的尾部设为新节点的prev
      node.prev = this.tail;
      // 当前尾节点的next指向新节点
      this.tail.next = node;
      this.tail = node;
    }
  }

  addAt(element, index) {
    if (index >= 0 && index <= this.count) {
      let node = new DoublyNode(element),
        current = this.head;
      if (index === 0) {
        //头部插入
        if (!this.head) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = this.head;
          current.prev = node;
          this.head = node;
        }
      } else if (index === this.count) {
        //尾部插入
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
      } else {
        // 中间插入
        let prev = this.getElementAt(index - 1);
        current = prev.next;
        node.next = current;
        prev.next = node;
        current.prev = node;
        node.prev = prev;
      }
      this.count++;
      return true;
    }
    return false;
  }

  remove(item) {
    let current = this.head;

    while (current) {
      if (current.val === item) {
        // 目标链表只有它一个节点
        if (current === this.head && current === this.tail) {
          this.head = null;
          this.tail = null;
        } else if (current === this.head) {
          this.head = this.head.next;
          this.head.prev = null;
        } else if ((current = this.tail)) {
          this.tail = this.tail.prev;
          this.tail.next = null;
        } else {
          current.prev.next = current.next;
          current.next.prev = current.prev;
        }
      }
      current = current.next;
    }
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        //移除头部
        this.head = current.next;
        // 如果只有一项，更新tail
        if (this.count === 1) {
          this.tail = null;
        } else {
          this.head.prev = null;
        }
      } else if (index === this.count - 1) {
        //移除尾部
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = null;
      } else {
        //移除中间
        let prev = this.getElementAt(index - 1);
        current = prev.next;
        prev.next = current.next;
        current.next.prev = prev;
      }
      this.count--;
      return current.val;
    }
    return undefined;
  }

  find(item) {
    let current = this.head,
      count = 0;
    while (current) {
      if (current.val === item) {
        return count;
      }
      current = current.next;
      count++;
    }
    return false;
  }

  length() {
    let curr = this.head;
    let len = 0;
    while (curr) {
      curr = curr.next;
      len++;
    }
    return len;
  }
}

// function reverse(head) {
//   let curr = head,
//     prev = null,
//     nextTemp = null;

//   while (curr) {
//     nextTemp = curr.next;
//     curr.next = prev;
//     prev = curr;
//     curr = nextTemp;
//   }

//   return prev;
// }

// function reverse(head, prev = null) {
//   let curr = head,
//     nextTemp = null;

//   if (curr) {
//     nextTemp = curr.next;
//     curr.next = prev;
//     prev = curr;
//     curr = nextTemp;
//     return reverse(curr, prev);
//   }

//   return prev;
// }

// let node = new Node(1),
//   node1 = new Node(2),
//   node2 = new Node(3);

// node.next = node1;
// node1.next = node2;

// let n = reverse(node);

// console.log(n);
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  if (!head || !head.next) {
    return head;
  }

  let tail = head;
  for (let i = 0; i < k; i++) {
    if (tail === null) {
      return head;
    }
    tail = tail.next;
  }

  let newHead = reverse(head, tail);
  head.next = reverseKGroup(tail, k);

  return newHead;
};

function reverse(head, tail) {
  let nextTemp = null,
    prev = null;

  while (head !== tail) {
    nextTemp = head.next;
    head.next = prev;
    prev = head;
    head = nextTemp;
  }

  return prev;
}
