function bigSum(a, b) {
  let maxLength = Math.max(a.length, b.length);

  // 用 0 补齐长度
  a = a.padStart(maxLength, 0);
  b = b.padStart(maxLength, 0);

  let sum = "";
  let t = 0;
  let f = 0; // 进位
  for (let i = maxLength - 1; i >= 0; i--) {
    t = parseInt(a[i]) + parseInt(b[i]) + f;
    f = Math.floor(t / 10);
    sum = (t % 10) + sum;
  }
  if (f === 1) {
    sum = "1" + sum;
  }
  return sum;
}
console.log(9007199254740991 + 1234567899999999999);
console.log(bigSum("9007199254740991", "1234567899999999999"));
