// Task 7: factorial(n) with a loop.

function factorial(n) {
  let result = 1;

  for (let i = 1; i <= n; i++) {
    result = result * i;
  }

  return result;
}

console.log(factorial(5)); // 120
console.log(factorial(0)); // 1
