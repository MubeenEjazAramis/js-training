const output = document.getElementById("output");

function show(text) {
  output.textContent = text;
  console.log(text);
}

function problem01() {
  let a = prompt("Enter first number:", "2");
  if (a === null) return;
  let b = prompt("Enter second number:", "3");
  if (b === null) return;

  function sum(x, y) {
    return x + y;
  }

  let result = sum(Number(a), Number(b));
  show("sum(" + a + ", " + b + ") => " + result);
}

function problem02() {
  let val = prompt("Enter a number to check if even:", "7");
  if (val === null) return;

  function isEven(n) {
    return n % 2 === 0;
  }

  let num = Number(val);
  show("isEven(" + num + ") => " + isEven(num));
}

function problem03() {
  let val = prompt("Enter Celsius temperature:", "100");
  if (val === null) return;

  function celsiusToFahrenheit(c) {
    return (c * 9 / 5) + 32;
  }

  let c = Number(val);
  show("celsiusToFahrenheit(" + c + ") => " + celsiusToFahrenheit(c));
}

function problem04() {
  let a = prompt("Enter first number:", "5");
  if (a === null) return;
  let b = prompt("Enter second number:", "12");
  if (b === null) return;
  let c = prompt("Enter third number:", "8");
  if (c === null) return;

  function max3(x, y, z) {
    let max = x;
    if (y > max) max = y;
    if (z > max) max = z;
    return max;
  }

  let numA = Number(a);
  let numB = Number(b);
  let numC = Number(c);
  show("max3(" + numA + ", " + numB + ", " + numC + ") => " + max3(numA, numB, numC));
}

function problem05() {
  let val = prompt("Enter score (0 - 100):", "85");
  if (val === null) return;

  function grade(score) {
    if (score < 0 || score > 100) {
      return "Invalid";
    } else if (score >= 90) {
      return "A";
    } else if (score >= 80) {
      return "B";
    } else if (score >= 70) {
      return "C";
    } else if (score >= 60) {
      return "D";
    } else {
      return "F";
    }
  }

  let score = Number(val);
  show("grade(" + score + ") => " + grade(score));
}

function problem06() {
  let list = [];
  for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      list.push("FizzBuzz");
    } else if (i % 3 === 0) {
      list.push("Fizz");
    } else if (i % 5 === 0) {
      list.push("Buzz");
    } else {
      list.push(i);
    }
  }
  show(list.join("\n"));
}

function problem07() {
  let val = prompt("Enter a number for factorial:", "5");
  if (val === null) return;

  function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
      result = result * i;
    }
    return result;
  }

  let n = Number(val);
  show("factorial(" + n + ") => " + factorial(n));
}

function problem08() {
  let str = prompt("Enter a string to reverse:", "hello");
  if (str === null) return;

  function reverseString(s) {
    let reversed = "";
    for (let i = s.length - 1; i >= 0; i--) {
      reversed += s[i];
    }
    return reversed;
  }

  show('reverseString("' + str + '") => ' + reverseString(str));
}

function problem09() {
  let str = prompt("Enter a string to check palindrome:", "Never odd or even");
  if (str === null) return;

  function isPalindrome(s) {
    let cleanStr = "";
    for (let i = 0; i < s.length; i++) {
      let char = s[i].toLowerCase();
      if (char !== " ") {
        cleanStr += char;
      }
    }
    let reversedStr = "";
    for (let i = cleanStr.length - 1; i >= 0; i--) {
      reversedStr += cleanStr[i];
    }
    return cleanStr === reversedStr;
  }

  show('isPalindrome("' + str + '") => ' + isPalindrome(str));
}

function problem10() {
  let str = prompt("Enter a string to count vowels:", "Lahore Pakistan");
  if (str === null) return;

  function countVowels(s) {
    let count = 0;
    let vowels = "aeiouAEIOU";
    for (let i = 0; i < s.length; i++) {
      if (vowels.includes(s[i])) {
        count++;
      }
    }
    return count;
  }

  show('countVowels("' + str + '") => ' + countVowels(str));
}

function problem11() {
  let val = prompt("Enter number to sum digits:", "4821");
  if (val === null) return;

  function sumDigits(n) {
    let sum = 0;
    let str = String(n);
    for (let i = 0; i < str.length; i++) {
      sum += Number(str[i]);
    }
    return sum;
  }

  show("sumDigits(" + val + ") => " + sumDigits(val));
}

function problem12() {
  let val = prompt("Enter a number to check prime:", "17");
  if (val === null) return;

  function isPrime(n) {
    if (n <= 1) {
      return false;
    }
    for (let i = 2; i < n; i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

  let num = Number(val);
  show("isPrime(" + num + ") => " + isPrime(num));
}

function problem13() {
  let val = prompt("Enter n for nth Fibonacci number:", "10");
  if (val === null) return;

  function fibonacci(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;
    let a = 0;
    let b = 1;
    for (let i = 2; i <= n; i++) {
      let next = a + b;
      a = b;
      b = next;
    }
    return b;
  }

  let n = Number(val);
  show("fibonacci(" + n + ") => " + fibonacci(n));
}

function problem14() {
  let str = prompt("Enter a sentence to capitalize words:", "learn javascript today");
  if (str === null) return;

  function capitalizeWords(s) {
    let words = s.split(" ");
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      if (word.length > 0) {
        words[i] = word[0].toUpperCase() + word.slice(1);
      }
    }
    return words.join(" ");
  }

  show('capitalizeWords("' + str + '") => ' + capitalizeWords(str));
}

function problem15() {
  let result = "typeof null => " + typeof null + "\n" +
               "typeof [] => " + typeof [] + "\n" +
               "typeof function(){} => " + typeof function(){};
  show(result);
}

function Guessing() {
  let secretNumber = Math.floor(Math.random() * 100) + 1;
  let tries = 0;

  while (true) {
    let input = prompt("Enter your guess (1-100):");
    if (input === null) {
      show("Guessing game cancelled.");
      return;
    }

    let trimmed = input.trim();
    let guess = Number(trimmed);

    if (trimmed === "" || isNaN(guess) || !Number.isInteger(guess) || guess < 1 || guess > 100) {
      alert("Invalid input! Please enter a whole number from 1 to 100.");
      continue;
    }

    tries++;

    if (guess > secretNumber) {
      alert("Too high");
    } else if (guess < secretNumber) {
      alert("Too low");
    } else {
      alert("Correct in " + tries + " tries");
      show("Guessing Game:\nCorrect in " + tries + " tries! Secret number was " + secretNumber + ".");
      break;
    }
  }
}