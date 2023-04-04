let axios = require("axios");

function leDecorator(target, propertyKey, descriptor) {
  let oldValue = descriptor.value;
  descriptor.value = function () {
    console.log(`调用 "${propertyKey}" with`, arguments, target);
    let value = oldValue.apply(null, [arguments[1], arguments[0]]);
    console.log(`函数已执行`);
    return `${value}; 装饰器完成`;
  };
}

function debounce(timeout) {
  return function (target, propertyKey, descriptor) {
    let oldValue = descriptor.value;
    let timer = null;
    descriptor.value = function () {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(oldValue.apply(this, arguments), timeout);
    };
    return descriptor;
  };
}

// export class Test {
//   @debounce(5000)
//   test1() {
//     console.log(1, Date.now());
//   }
// }

function sum() {
  let args = Array.from(arguments);
  return function (...args1) {
    if (!args || args1.length == 0) {
      return args.reduce((p, c) => p + c, 0);
    } else {
      return sum(...args, ...args1);
    }
  };
}

function deepClone(obj, map = new Map()) {
  if (typeof obj === "function") {
    return function () {
      obj.apply(this, arguments);
    };
  }
  if (typeof obj === "object") {
    let result = Array.isArray(obj) ? [] : {};
    if (map.has(obj)) {
      return map.get(obj);
    }
    map.set(obj, result);
    for (let key in obj) {
      result[key] = deepClone(obj[key], map);
    }
    return result;
  }

  return obj;
}


// let a = { a: 1, b: () => console.log(1) };

// let b = deepClone(a);

// console.log(b);
// b.b();
// console.log(b.b === a.b);

function multiRequest(urls = [], maxNum) {
  let len = urls.length,
    result = new Array(len).fill(false),
    count = 0;

  return new Promise((resolve, reject) => {
    while (count < maxNum) {
      next();
    }

    function next() {
      let current = count++;
      if (current >= len) {
        if (!result.includes(false)) {
          resolve(result);
          return;
        }
      }

      let url = urls[current];
      axios.get(url)
        .then((res) => {
          result[current] = res;
          if (current < len) {
            next();
          }
        })
        .catch((err) => {
          result[current] = err;
          if (current < len) {
            next();
          }
        });
    }
  });
}

console.log(
  multiRequest(
    ["http://www.baidu.com", "http://www.baidu.com", "http://www.baidu.com"],
    2
  )
);

function threeSum(nums) {
  if (nums.length < 3) {
    return [];
  }

  nums.sort((a, b) => a - b);

  let res = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) {
      break;
    }
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    let j = i + 1,
      k = nums.length - 1;

    while (j < k) {
      let sum = nums[i] + nums[j] + nums[k];
      if (sum < 0) {
        j++;
        continue;
      }
      if (sum > 0) {
        k--;
        continue;
      }
      res.push([nums[i], nums[j], nums[k]]);
      while (j < k && nums[j] === nums[++j]);
      while (j < k && nums[k] === nums[-k]);
    }
  }

  return res;
}

function lianxu(arr) {
  let result = [],
    temp = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1] + 1) {
      temp.push(arr[i]);
      if (i === arr.length - 1) {
        result.push(`${temp[0]}->${temp[temp.length - 1]}`);
      }
    } else {
      if (temp.length > 1) {
        result.push(`${temp[0]}->${temp[temp.length - 1]}`);
        temp = [arr[i]];
      } else {
        result.push(temp[0]);
        temp = [arr[i]];
      }

      if (i === arr.length - 1) {
        result.push(arr[i]);
      }
    }
  }

  return result;
}

class Test {
  events = {};
  onceEvents = {};
  on(eventName, callback) {
    this.events[eventName] = callback;
  }

  emit(eventName) {
    if (Reflect.has(this.onceEvents, eventName)) {
      this.onceEvents[eventName]();
      Reflect.deleteProperty(this.onceEvents, eventName);
    }
    if (Reflect.has(this.events, eventName)) {
      this.events[eventName]();
    }
  }

  off(eventName) {
    Reflect.deleteProperty(this.events, eventName);
  }

  once(eventName, callback) {
    this.onceEvents[eventName] = callback;
  }
}

function fibo(n) {
  if (n === 1) {
    return [1];
  }

  if (n === 2) {
    return [1];
  }

  let add1 = 1,
    add2 = 1,
    sum = 0,
    list = [1, 1];

  for (let i = 3; i <= n; i++) {
    sum = add1 + add2;
    add2 = add1;
    add1 = sum;
    list.push(sum);
  }

  return list;
}

