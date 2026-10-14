// Task 9: isPalindrome(s) ignoring case and spaces.

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

console.log(isPalindrome("Never odd or even")); // true
console.log(isPalindrome("hello"));              // false
