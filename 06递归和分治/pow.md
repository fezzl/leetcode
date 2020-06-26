50.Pow(x,n)：
实现 pow(x, n) ，即计算 x 的 n 次幂函数。

示例1：
```
输入: 2.00000, 10
输出: 1024.00000
```
示例2：
```
输入: 2.00000, -2
输出: 0.25000
解释: 2-2 = 1/22 = 1/4 = 0.25
```

```js
// 分治算法，时间复杂度O(logN)
var myPow = function(x, n) {
  if (n === 0) return 1
  if (n < 0) retrn myPow(x, -n)
  if (n % 2) {
    return x * myPow(x, n - 1)
  } else {
    return myPow(x*x, n/2)
  }
}
```