var recursion = function (levle, params1, params2) {
  // 递归终止条件
  if (levle > "MAX_LEVEL") return "result";

  // 处理当前层逻辑
  process_data(levle, ...data);

  // 再递归一层
  recursion(levle + 1, p1, p2);

  // 还原状态
  reverse_state(levle);
};
