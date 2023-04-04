//1. 发布订阅

class EventEmitter {
  data = {};
  constructor() {
    this.data = {};
  }

  subscribe(event, callback) {
    if (!this.data[event]) {
      this.data[event] = [];
    }
    this.data[event].push(callback);
  }

  notify(event, ...args) {
    let events = this.data[event];
    if (events) {
      events.forEach((e) => e.apply(this, args));
    } else {
      console.error("no such event: " + event);
    }
  }

  removeEvent(event) {
    if (this.data[event]) {
      delete this.data[event];
    }
  }
}

let eventEmitter = new EventEmitter();

eventEmitter.subscribe("a", (args) => {
  console.log(`event a args :${args}`);
});

eventEmitter.subscribe("a", (args) => {
  console.log(`event a1 args :${args}`);
});

eventEmitter.notify("a", 666);

eventEmitter.removeEvent("a");

eventEmitter.notify("a", 666);
