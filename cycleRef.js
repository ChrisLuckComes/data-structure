function hasCycleRef(obj, parent = [obj]) {
  for (let i in obj) {
    if (typeof obj[i] === "object") {
      let flag = false;
      parent.forEach((p) => {
        if (p === obj[i]) {
          flag = true;
        }
      });
      if (flag) {
        return true;
      }

      flag = hasCycleRef(obj[i], [...parent, obj[i]]);

      if (flag) {
        return true;
      }
    }
  }

  return false;
}
