exports.shuffle = (arr) => {
  const arrLen = arr.length;

  for (let i = 0; i < arrLen; i++) {
    const randIdx = Math.floor(Math.random() * (i + 1));
    const tmp = arr[randIdx];

    arr[randIdx] = arr[i];
    arr[i] = tmp;
  }

  return arr;
};
