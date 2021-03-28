var dynamicProgramming = function (m, n) {
  // 状态定义
  let dp = Array.from(new Array(m), () => new Array(n));

  // 状态初始化
  dp[0][0] = x;
  dp[0][1] = y;

  // dp 状态方程
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j - 1], etc);
    }
  }

  // 最优解
  return dp[m][n];
};
