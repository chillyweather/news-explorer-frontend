const a = ['apple', 'abc', 'anime', 'liverpool fc'];

const keywordHandler = (arr) => {
  const result = [];
  while (result.length < 2) {
    const item = arr[Math.floor(Math.random() * arr.length)];
    if (!arr.some((i) => i === item)) {
      result.push(item);
    }
  }
  return result;
};
console.log(keywordHandler(a));
