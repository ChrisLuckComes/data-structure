class MyPromise {
  status = "";
  value = undefined;
  reason = undefined;
  onResolvedCallbacks = [];
  onRejectedCallbacks = [];

  constructor(executor) {
    this.status = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = (data) => {
      if (this.status === "pending") {
        this.value = data;
        this.status = "resolved";
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    let reject = (reason) => {
      if (this.status === "pending") {
        this.reason = reason;
        this.status = "rejected";
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (y) => y;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };

    let promise2;
    if (this.status === "resolved") {
      promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    }
    if (this.status === "rejected") {
      promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let reason = onRejected(this.reason);
            resolvePromise(promise2, reason, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    }
    if (this.status === "pending") {
      promise2 = new MyPromise((resolve, reject) => {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let reason = onRejected(this.reason);
              resolvePromise(promise2, reason, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      });
    }

    return promise2;
  }

  catch(onFulfilled, onRejected) {
    return this.then(null, onRejected);
  }
}

MyPromise.all = function (promises) {
  return new MyPromise((resolve, reject) => {
    let arr = [],
      i = 0;

    function processData(data, index) {
      arr[index] = data;
      if (++index === promises.length) {
        resolve(arr);
      }
    }

    for (let i = 0; i < promises.length; i++) {
      promises[i].then((data) => processData(data, index));
    }
  });
};

MyPromise.race = function (promises) {
  return MyPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[j].then((resolve, reject));
    }
  });
};

MyPromise.allSettled = function (promises) {
  if (promises.length === 0) {
    return MyPromise.resolve([]);
  }
  return new MyPromise((resolve, reject) => {
    let arr = [],
      save = (data) => {
        arr.push(data);
        if (arr.length === promises.length) {
          resolve(arr);
        }
      };
    promises.forEach((p, index) => {
      p.then(
        (res) => {
          save({ status: "fulfilled", value: res });
        },
        (err) => {
          save({ status: "rejected", reason: err });
        }
      );
    });
  });
};

MyPromise.resolve = function (data) {
  return new MyPromise((resolve) => resolve(data));
};

MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => reject(reason));
};

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    // 防止循环引用
    reject("循环引用");
  }

  if (x !== null && (typeof x === "function" || typeof x === "object")) {
    let called;
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) {
              return;
            }
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) {
              return;
            }
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) {
        return;
      }
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

let a = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

let b = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("1");
  }, 2000);
});

MyPromise.all([a, b]).then((res) => {
  console.log(res);
});
