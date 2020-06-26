51.N皇后：
n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。

每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

示例：
```
输入: 4
输出: [
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
解释: 4 皇后问题存在两个不同的解法。

```

```js
var solveNQueens = function(n) {
  if (n < 1) return []
  let result = []
  let cols = new Set()
  let pie = new Set()
  let na = new Set()
  
  const dfs = function(row, n, cur_state) {
    if (row >= n) {
      result.push(cur_state)
      return
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || pie.has(row + col) || na.has(row - col)) continue

      cols.add(col)
      pie.add(row + col)
      na.add(row - col)

      dfs(row + 1, n, cur_state.concat([col]))

      cols.delete(col)
      pie.delete(row + col)
      na.delete(row - col)
    }
  }
  dfs(0, n, [])
  return gen_result(result,n)
}

var gen_result = function(res, n) {
  let list = []
  for (let i = 0; i < res.length; i++) {
    let item = []
    for (let j = 0; j < res[i].length; j++) {
      let str = ''
      for (let k = 0; k < n; k++) {
        if (res[i][j] === k) str += 'Q'
        else str += '.'
      }
      item.push(str)
    }
    list.push(item)
  }
  return list
}
```