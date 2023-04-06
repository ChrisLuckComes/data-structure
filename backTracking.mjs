/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  let res = [],
    path = [];

  function backTracking(left, right) {
    if (path.length === n * 2) {
      res.push(path.join(""));
      return;
    }

    if (left < n) {
      path.push("(");
      backTracking(left + 1, right);
      path.pop();
    }

    if (right < left) {
      path.push(")");
      backTracking(left, right + 1);
      path.pop();
    }
  }

  backTracking(0, 0);

  return res;
};

generateParenthesis(3);
