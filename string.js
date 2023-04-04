/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  let res = "",
    carry = 0;
  let i = num1.length - 1,
    j = num2.length - 1;

  while (i >= 0 || j >= 0 || carry > 0) {
    if (i >= 0) {
      carry += +num1[i--];
    }
    if (j >= 0) {
      carry += +num2[j--];
    }

    res = `${carry % 10}${res}`;
    carry = Math.floor(carry / 10);
  }

  return res;
};

// let res = addStrings("77", "463");
// console.log(res);

function lengthOfLongestSubstring(s) {
  let len = s.length;
  if (len === 0) {
    return 0;
  }

  let res = 1,
    startIndex = 0;

  for (let i = 0; i < len; i++) {
    let index = s.indexOf(s[i], startIndex);
    if (index < i) {
      startIndex = index + 1;
    } else {
      res = Math.max(res, i - startIndex + 1);
    }
  }

  console.log(res);
  return res;
}

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let len = s.length;

  function getLongestRange(start, range) {
    let left = start,
      right = start;

    while (right < len && s[right + 1] === s[start]) {
      right++;
    }

    let endIndex = right;

    while (left > 0 && right < len && s[left - 1] === s[right + 1]) {
      left--;
      right++;
    }

    if (right - left > range[1] - range[0]) {
      range[0] = left;
      range[1] = right;
    }

    return endIndex;
  }

  let range = [0, 0];

  for (let i = 0; i < len; i++) {
    i = getLongestRange(i, range);
  }

  return s.substring(range[0], range[1] + 1);
};

let res = longestPalindrome("caba");
console.log(res);
