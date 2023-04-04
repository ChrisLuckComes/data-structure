const { get } = require("request");

function defaultToString(item) {
  if (item === null) {
    return "NULL";
  } else if (item === undefined) {
    return undefined;
  } else if (typeof item === "string" || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

function djb2HashCode(key) {
  const tableKey = this.toStrFn(key);
  let hash = 5381;
  for (let i = 0; i < tableKey.length; i++) {
    hash = hash * 33 + tableKey.charCodeAt(i);
  }
  return hash % 1013;
}

class ValuePair {
  key = "";
  value = "";
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

class Dictionary {
  table = {};

  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
  }

  set(key, value) {
    if (key !== null && value !== null) {
      let tableKey = this.toStrFn(key);
      this.table[tableKey] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }

  hasKey(key) {
    return this.table[this.toStrFn(key)] !== null;
  }

  get(key) {
    let ValuePair = this.table[this.toStrFn(key)];
    return ValuePair.value ?? undefined;
  }

  clear() {
    this.table = {};
  }

  size() {
    return Object.keys(this.table).length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  keys() {
    return this.keyValues().map((valuePair) => valuePair.key);
  }

  values() {
    return this.keyValues().map((valuePair) => valuePair.value);
  }

  keyValues() {
    return Object.values(this.table);
  }

  forEach(callback) {
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      let result = callback(valuePairs[i].key, valuePairs[i].value);
      if (result === false) {
        break;
      }
    }
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    const valuePairs = this.keyValues(),
      result = `${valuePairs[0].toString()}`;
    for (let i = 0; i < valuePairs.length; i++) {
      result = `${result}, ${valuePairs[i].toString()}`;
    }
    return result;
  }
}

// const dict = new Dictionary();
// dict.set("email", "luoyunlai@gmail.com");
// dict.set("name", "luoyunlai");
// console.log(dict.hasKey("email"));
// console.log(dict.size());
// console.log(dict.keys());
// console.log(dict.values());
// console.log(dict.get("email"));

// dict.remove("email");

// console.log(dict.keyValues());

// dict.forEach((key, value) => console.log(key, value));

/**
 * 散列表，存在相同key值覆盖的问题
 */
class HashTable {
  table = {};
  constructor(toStrfn = defaultToString, djb2HashCode = djb2HashCode) {
    this.toStrFn = toStrfn;
    this.djb2HashCode = djb2HashCode;
  }

  hashCode(key) {
    return this.djb2HashCode(key);
  }

  put(key, value) {
    if (key !== null && value !== null) {
      const position = this.hashCode(key);
      this.table[position] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  remove(key) {
    const hash = this.hashCode(key),
      valuePair = this.table[hash];
    if (valuePair !== null) {
      delete this.table[hash];
      return true;
    }
    return false;
  }

  get(key) {
    const valuePair = this.table[this.hashCode(key)];
    return valuePair.value ?? undefined;
  }
}

/**
 * 分离链接法处理重复key，给散列表的每一个位置创建链表存储元素，需要额外的存储空间。
 */
class HashTableSeparateChaining {
  table = {};
  constructor(toStrfn = defaultToString, djb2HashCode = djb2HashCode) {
    this.toStrFn = toStrfn;
    this.djb2HashCode = djb2HashCode;
  }

  hashCode(key) {
    return this.djb2HashCode(key);
  }

  put(key, value) {
    if (key !== null && value !== null) {
      const position = this.hashCode(key);
      if (!this.table[position]) {
        this.table[position] = new LinkedList();
      }
      this.table[position].push(new ValuePair(key, value));
      return true;
    }
    return false;
  }

  get(key) {
    const position = this.hashCode(key),
      linkedList = this.table[position];
    if (linkedList && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while (current) {
        if (current.val.key === key) {
          return current.val.value;
        }
        current = current.next;
      }
    }
    return undefined;
  }

  remove(key) {
    const position = this.hashCode(key),
      linkedList = this.table[position];
    if (linkedList && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while (current) {
        if (current.val.key === key) {
          linkedList.remove(current.val);
          if (linkedList.isEmpty()) {
            delete this.table[position];
          }
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }
}

/**
 * 线性探查法，如果当前位置存在元素，则前往下一个位置
 */
class HashTableLinearProbing {
  table = {};
  constructor(toStrfn = defaultToString, djb2HashCode = djb2HashCode) {
    this.toStrFn = toStrfn;
    this.djb2HashCode = djb2HashCode;
  }

  hashCode(key) {
    return this.djb2HashCode(key);
  }

  put(key, value) {
    if (key !== null && value !== null) {
      const position = this.hashCode(key);
      if (!this.table[position]) {
        this.table[position] = new ValuePair(key, value);
      } else {
        let index = position + 1;
        while (!this.table[index]) {
          index++;
        }
        this.table[index] = new ValuePair(key, value);
      }
      return true;
    }
    return false;
  }

  get(key) {
    const position = this.hashCode(key);
    if (this.table[position]) {
      if (this.table[position].key === key) {
        return this.table[position].value;
      }
      let index = this.table[position] + 1;
      while (this.table[index] && this.table[index].key !== key) {
        index++;
      }
      if (this.table[index] && this.table[index].key === key) {
        return this.table[index].value;
      }
    }
    return undefined;
  }

  /**
   * 处理删除元素后的副作用，如果删除位置之后的元素的hash<=原始hash或者<=上一个被删除的hash，说明需要往前移动
   * @param {*} key
   * @param {*} removedPosition
   */
  verifyRemoveSideEffect(key, removedPosition) {
    const hash = this.hashCode(key);
    let index = removedPosition + 1;
    while (this.table[index]) {
      const posHash = this.hashCode(this.table[index].key);
      if (posHash <= hash || posHash <= removedPosition) {
        this.table[removedPosition] = this.table[index];
        delete this.table[index];
        removedPosition = index;
      }
      index++;
    }
  }

  remove(key) {
    const position = this.hashCode(key);
    if (this.table[position]) {
      if (this.table[position].key === key) {
        delete this.table[position];
        this.verifyRemoveSideEffects(key, position);
        return true;
      }
      let index = this.table[position] + 1;
      while (this.table[index] && this.table[index].key !== key) {
        index++;
      }
      if (this.table[index] && this.table[index].key === key) {
        delete this.table[index];
        this.verifyRemoveSideEffects(key, index);
        return true;
      }
    }
    return false;
  }
}
