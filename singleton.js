function Singleton() {
  if (!this instanceof Singleton) {
    return new Singleton();
  }

  if (!Singleton.instance) {
    Singleton.instance = this;
  }

  return Singleton.instance;
}

let a = new Singleton(),
  b = new Singleton();

console.log(a === b);
