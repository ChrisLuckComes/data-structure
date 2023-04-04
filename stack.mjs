/**
 * 最基本的栈结构
 */
export class Stack {
  items = [];

  constructors() {}

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  size() {
    return this.items.length;
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

/**
 * 二进制转换
 * @param num
 * @returns
 */
function toBinary(num) {
  let stack = new Stack(),
    binaryString = "";

  while (num > 0) {
    let rest = num % 2;
    stack.push(rest);
    num = Math.floor(num / 2);
  }

  while (!stack.isEmpty()) {
    binaryString += stack.pop().toString();
  }

  return binaryString;
}

function baseConverter(decNumber, base) {
  const stack = new Stack(),
    digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let number = decNumber,
    rem,
    baseString = "";

  if (base < 2 || base > 36) {
    return "";
  }

  while (number > 0) {
    rem = Math.floor(number % base);
    stack.push(rem);
    number = Math.floor(number / base);
  }

  while (!stack.isEmpty()) {
    baseString += digits[stack.pop()];
  }

  return baseString;
}

function _isPair(string) {
  let stack = new Stack(),
    hash = {
      "(": ")",
      "[": "]",
      "{": "}"
    };

  for (const s of string) {
    if (Reflect.has(hash, s)) {
      stack.push(s);
    } else {
      if (Reflect.get(hash, stack.peek()) === s) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.size() === 0;
}

// console.log(_isPair("{}"));
