/**
 * 集合，不允许值重复的顺序数据结构
 */
class MySet {
  items = {};
  constructor() {}
  add(element) {
    if (!this.has(element)) {
      this.items[element] = element;
      return true;
    }
    return false;
  }

  delete(element) {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }

  has(element) {
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }

  clear() {
    this.items = {};
  }

  size() {
    return Object.keys(this.items).length;
  }

  values() {
    return Object.values(this.items);
  }

  // 并集
  union(otherSet) {
    let unionSet = new MySet();
    this.values().forEach((value) => unionSet.add(value));
    otherSet.values().forEach((value) => unionSet.add(value));
    return unionSet;
  }

  // 交集 优化版本
  intersection(otherSet) {
    let intersectionSet = new MySet();
    let values = this.values(),
      otherValues = otherSet.values();

    let smallerSet = otherValues,
      biggerSet = values;
    if (otherValues.length > values.length) {
      biggerSet = otherValues;
      smallerSet = values;
    }
    smallerSet.forEach((value) => {
      if (biggerSet.includes(value)) {
        intersectionSet.add(value);
      }
    });
    return intersectionSet;
  }

  // 差集
  difference(otherSet) {
    let differenceSet = new MySet();

    this.values().forEach((value) => {
      if (!otherSet.has(value)) {
        differenceSet.add(value);
      }
    });
    return differenceSet;
  }

  // 子集
  isSubSetOf(otherSet) {
    return (
      this.size() <= otherSet.size() &&
      this.values().every((value) => otherSet.has(value))
    );
  }
}

// let set = new MySet();

// set.add(1);
// console.log(set.values());
// console.log(set.has(1));
// console.log(set.size());

// set.add(2);
// console.log(set.values());
// console.log(set.has(1));
// console.log(set.size());

// set.delete(1);
// console.log(set.values());

// set.delete(2);
// console.log(set.values());

const setA = new MySet();
setA.add(1);
setA.add(2);
setA.add(3);
const setB = new MySet();
setB.add(3);
setB.add(4);
setB.add(5);
setB.add(6);

const setC = new MySet();
setC.add(1);
setC.add(2);
setC.add(3);
setC.add(4);

// const unionAB = setA.union(setB); //[1, 2, 3, 4, 5, 6]
// const intersectionAB = setA.intersection(setB); // [3]
// const differenceAB = setA.difference(setB); //[1, 2]
// console.log(setA.isSubSetOf(setB), setA.isSubSetOf(setC)); // false,true
