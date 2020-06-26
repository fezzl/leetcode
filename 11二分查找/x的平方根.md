69.x的平方根：
实现 int sqrt(int x) 函数。

计算并返回 x 的平方根，其中 x 是非负整数。

由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

示例1：
```
输入: 4
输出: 2
```

```js
// 二分查找
var mySqrt = function(x) {
    if (x === 0 || x === 1) return x
    let L = 1
    let R = x
    let res
    while(L <= R) {
        let mid = Math.floor((L + R)/2)
        if (mid === x/mid) {
            return mid
        } else if (mid < x/mid) {
            L = mid +1
            res = mid
        } else {
            R = mid - 1
        }
    }
    return res
};
```