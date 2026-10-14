// Task 11: sumDigits(n) returns the sum of all digits in a number.

function sumDigits(n) {
  let sum = 0;
  let str = String(n);

  for (let i = 0; i < str.length; i++) {
    sum += Number(str[i]);
  }

  return sum;
}

console.log(sumDigits(4821)); // 15
