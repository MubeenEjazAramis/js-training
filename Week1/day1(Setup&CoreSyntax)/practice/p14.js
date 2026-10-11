// Task 14: capitalizeWords(s) capitalizes the first letter of each word.

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

console.log(capitalizeWords("learn javascript today")); // Learn Javascript Today
