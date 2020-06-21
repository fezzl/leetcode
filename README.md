## 数据结构与算法

### 时间复杂度和空间复杂度

时间复杂度：是执行当前算法所执行的时间
空间复杂度：是执行当前算法需要占用多少内存空间

常见的时间复杂度量级有：
- 常数阶O(1)
- 对数阶O(logN)
- 线性阶O(n)
- 线性对数阶O(nlogN)
- 平方阶O(n^2)
- 立方阶O(n^3)
- k次方阶O(n^k)
- 指数阶O(2^n)

上面从上到下依次时间复杂度越来越大，执行效率越来越低

常见的空间复杂度量级有
- O(1)
- O(n)
- O(n^2)


### 链表

题目：
链表反转：定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

示例：
```
输入：1->2->3->4->5->NULL
输出：5->4->3->2->1->NULL
```

题解：
1. 双指针
```js
var reverseList = function(head) {
  // 定义两个指针 pre 和 cur; pre 代表前一个元素，cur 代表前一个元素
  let pre = null
  let cur = head
  while(cur !== null) {
    // 获取当前元素的下一个值
    let cnext = cur.next
    // 局部反转
    cur.next = pre
    // cur 和 pre 同时向前一步
    pre = cur
    cur = cnext
  }
  return pre
}
```
2. 递归

```js
var reverseList = function(head) {
  if (head === null || head.next === null) {
    return head
  }
  // 使用递归函数，一直递归到链表最后一个节点，该节点就是反转后的头结点，记作 ret
  // 此后，每次函数在返回过程中，让当前节点的下一个节点的 next 的指向当前节点
  // 同时让当前节点的 next 指向 null，从而实现从链表尾部开始的局部反转
  // 当递归函数全部出栈，链表反转完成
  let ret = reverseList(head.next)
  head.next.next = head
  head.next = null
  return ret
}

```

题目：
两两交换链表中的节点：

给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

示例：
```
给定 1->2->3->4, 你应该返回 2->1->4->3.
```

1. 递归
```js
var swapPairs = function(head) {
  // 终止条件，当前无节点或者只有一个节点
  if (head === null || head.next === null) {
    return head
  }
  // 获取每轮递归的下一个节点，交换 head 和 next
  let next = head.next
  head.next = swapPairs(next.next)
  next.next = head
  // 返回值，因为 next 交换后变成头节点
  return next
}
```

2. 迭代
```js
var swapPairs = function(head) {
  let prev = new ListNode(0)
  prev.next = head
  let temp = prev
  while(temp.next !== null && temp.next.next !== null) {
    // 获取每轮迭代的第一个和第二个节点
    let startNode = temp.next
    let endNode = temp.next.next
    // 交换两个节点，实现局部反转
    temp.next = endNode
    startNode.next = endNode.next
    endNode.next = startNode
    // temp 向前移动
    temp = startNode
  }
  return prev.next
}
```

题目：
环形链表

判断链表是否有环

1. Set
```js
var hasCycle = function(head) {
  // 创建一个 set 用于判断是否已存在节点
  let hashset = new Set()
    while(head !== null) {
        // 
        if(hashset.has(head)) {
            return true
        } else {
            hashset.add(head)
        }
        head = head.next
    }
    return false
}
```
2. 双指针
```js
var hasCycle = function(head) {
  if (head === null || head.next === null) {
    return false
  }
  // 创建两个指针，一个快指针，一个慢指针
  // 快指针每次走两步，慢指针每次走一步
  // 如果链表有环，则快慢指针会相遇
  let slow = head
  let fast = head.next
  while(fast !== slow) {
    if (fast === null || fast.next === null) {
      return false
    }
    slow = slow.next
    fast = fast.next.next
  }
  return true
}
```

题目：
环形链表2

给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null
1. set
```js
var detectCycle = function(head) {
  // 创建一个 set 用于判断是否已存在节点
  let hashset = new Set()
    while(head !== null) {
        // 
        if(hashset.has(head)) {
            return head
        } else {
            hashset.add(head)
        }
        head = head.next
    }
    return null
}
```
2. 双指针
```js
var detectCycle = function(head) {
    let fast = head
    let slow = head
    while(true) {
        if (fast === null || fast.next === null) {
            return null
        }
        fast = fast.next.next
        slow = slow.next
        if (fast === slow) break;
    }
    fast = head
    while(slow !== fast) {
        fast = fast.next
        slow = slow.next
    }
    return fast
};
```

### 栈和队列

题目：
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串

栈实现
```js
var isValid = function(s) {
    let map = {
        '(': ')',
        '{': '}',
        '[': ']'
    }
    let stack = []
    for (let key of s) {
        if (key in map) {
            stack.push(key)
        } else if(map[stack.pop()] !== key) {
            return false
        }
    }
    return stack.length === 0
}
```

使用栈实现队列的下列操作：

push(x) -- 将一个元素放入队列的尾部。
pop() -- 从队列首部移除元素。
peek() -- 返回队列首部的元素。
empty() -- 返回队列是否为空。

示例：
```
MyQueue queue = new MyQueue();

queue.push(1);
queue.push(2);  
queue.peek();  // 返回 1
queue.pop();   // 返回 1
queue.empty(); // 返回 false

```
双栈实现队列
```js
var MyQueue = function() {
  this.inputStack = []
  this.outputStack = []
}

MyQueue.prototype.push = function(x) {
  if (!this.inputStack.length) this.font = x
  this.inputStack.push(x)
}

MyQueue.prototype.pop = function() {
  if (!this.outputStack.length) {
    while (this.inputStack.length) {
      this.outputStack.push(this.inputStack.pop())
    }
  }
  return this.outputStack.pop()
}

MyQueue.prototype.peek = function() {
  if (this.outputStack.length) {
    return this.outputStack[this.outputStack.length - 1]
  }
  return this.font
}

MyQueue.prototype.empty = function() {
  return this.inputStack.length === 0 && this.outputStack.length === 0
}
```

题目：
使用队列实现栈的下列操作：

push(x) -- 元素 x 入栈
pop() -- 移除栈顶元素
top() -- 获取栈顶元素
empty() -- 返回栈是否为空

```js
var MyStack = function() {
  this.q1 = []
}

MyStack.prototype.push = function(x) {
  this.q1.push(x)
  let size = this.q1.length
  while (size < 1) {
    this.q1.push(this.q1.shift())
    size--
  }
}

MyStack.prototype.pop = function() {
  return this.q1.shift()
}

MyStack.prototype.top = function() {
  return this.q1[0]
}

MyStack.prototype.empty = function() {
  return this.q1.length === 0
}
```

题目：
设计一个找到数据流中第K大元素的类（class）。注意是排序后的第K大元素，不是第K个不同的元素。

你的 KthLargest 类需要一个同时接收整数 k 和整数数组nums 的构造器，它包含数据流中的初始元素。每次调用 KthLargest.add，返回当前数据流中第K大的元素。

示例：
```
int k = 3;
int[] arr = [4,5,8,2];
KthLargest kthLargest = new KthLargest(3, arr);
kthLargest.add(3);   // returns 4
kthLargest.add(5);   // returns 5
kthLargest.add(10);  // returns 5
kthLargest.add(9);   // returns 8
kthLargest.add(4);   // returns 8

```

```java
class KthLargest {
    private int limit;
    private PriorityQueue<Integer> queue;
    public KthLargest(int k, int[] nums) {
        limit = k;
        queue = new PriorityQueue<>(k);
        for (int n : nums) add(n);
    }
    
    public int add(int val) {
        if (queue.size() < limit) {
            queue.add(val);
        } else if (queue.peek() < val) {
            queue.poll();
            queue.add(val);
        }
        return queue.peek();
    }
} 

```

题目：
给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。

返回滑动窗口中的最大值。

示例：
```
输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
输出: [3,3,5,5,6,7] 
解释: 

  滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7

```

```js
// 1. 优先队列，最大堆，时间复杂度O(n logk)
// 2. 双端队列，时间复杂度O(n)

var maxSlidingWindow = function(nums, k) {
  let len = nums.length
  class slideWindow {
    constructor() {
      this.data = []
    }
    push(val) {
      let data = this.data
      while (data.length > 0 && data[data.length - 1] < val) {
        data.pop()
      }
      data.push(val)
    }
    pop(val) {
      let data = this.data
      if (data.length > 0 && data[0] === val) {
        data.shift()
      }
    }
    max() {
      return this.data[0]
    }
    let res = []
    let window = new slideWindow()
    if (let i = 0; i < len; i++) {
      if (i < k - 1) {
        window.push(nums[i])
      } else {
        window.push(nums[i])
        res.push(window.max())
        window.pop(nums[i - k + 1])
      }
    }
    return res
  }
}
```

题目：给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

示例：
```
输入: s = "anagram", t = "nagaram"
输出: true
```

```
输入: s = "rat", t = "car"
输出: false
```

```js
// map 映射，遍历 s，把每个字母出现的次数累加，放入 map -> m1 中
// 遍历 t, 如果字母在 m1 中出现的话就减 1，直到减到 0，则把该 key 删除
// 最后判断 m1.size，通过判断 size 是否为 0 来判断是否是字母异位词
var isAnagram = function(s, t) {
  if (s.length !== t.length) return false
  let m1 = new Map()
  for (let key of s) {
    if (!m1.has(key)) {
      m1.set(key, 1)
    } else {
      m1.set(key, m1.get(key) + 1)
    }
  }
  for (let key of t) {
    let getMap = m1.get(key)
    if (getMap === 1) {
      m1.delete(key)
    } else if (getMap) {
      m1.set(key, getMap - 1)
    } else {
      m1.set(key, 1)
    }
  }
  if (m1.size) return false
  return true
}
```

题目：
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

示例：
```
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

```

```js
// map 映射，key 存数组的值，value 存数组的下标
// 遍历一次 nums，每次计算出 diff = target - nums[i]，在 map 中找出对应的值的 value
var twoSum = function(nums, target) {
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    let diff = target - nums[i]
    if (map.has(diff)) {
      return [map.get(diff), i]
    } else {
      map.set(nums[i], i)
    }
  }
}
```
题目：
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

示例：
```
给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]

```

```js
var threeSum = function(nums) {
  let len = nums.length
  let res = []
  if (nums === null || nums.length < 3) return res
  nums.sort((a,b) => a - b)
  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let L = i + 1
    let R = len - 1
    while (L < R) {
      let sum = nums[i] + nums[L] + nums[R]
      if (sum === 0) {
        res.push([nums[i], nums[L] + nums[R]])
        while(L < R && nums[L] === nums[L + 1]) L++
        while(L < R && nums[R] === nums[R - 1]) R--
        L++
        R--
      } else if (sum < 0) {
        L++
      } else {
        R--
      }
    }
  }
  return res
}

```
题目：
给定一个二叉树，判断其是否是一个有效的二叉搜索树。

假设一个二叉搜索树具有如下特征：

节点的左子树只包含小于当前节点的数。
节点的右子树只包含大于当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树。

示例：
```
输入:
    2
   / \
  1   3
输出: true
```

```
输入:
    5
   / \
  1   4
     / \
    3   6
输出: false
解释: 输入为: [5,1,4,null,null,3,6]。
     根节点的值为 5 ，但是其右子节点值为 4 。
```

```js
// 中序遍历，左 -> 根 -> 右，如果是二叉搜索树的话遍历出来的就是升序的数组
var isValidBST = function(root) {
  let prev = null
  var helper = function(root) {
    if (root === null) return true
    if (!helper(root.left)) return false
    if (prev !== null && prev.val >= root.val) return false
    prev = root
    return helper(root.right)
  }
  return helper(root)
}
```
题目：
给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

例如，给定如下二叉树:  root = [3,5,1,6,2,0,8,null,null,7,4]

![image](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/15/binarytree.png)

示例1：
```
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出: 3
解释: 节点 5 和节点 1 的最近公共祖先是节点 3。

```

示例2：
```
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出: 5
解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。

```

```js
// 递归
var lowestCommonAncestor = function(root, p, q) {
  if (root === null || root === p || root === q) return root
  let left = lowestCommonAncestor(root.left, p, q)
  let right = lowestCommonAncestor(root.right, p, q)
  return left === null ? right : right === null ? left : root
}
```
题目：
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

题目：
给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

示例1：
```
输入: [3,2,3]
输出: 3
```

示例2：
```
输入: [2,2,1,1,1,2,2]
输出: 2
```

```js
var majorityElement = function(nums) {
  let map = {}
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] in map) {
      map[nums[i]] += 1
    } else {
      map[nums[i]] = 1
    }
  }
  let max = 0
  let res = null
  for (let key in map) {
    if (map[key] > max) {
      max = map[key]
      res = key
    }
  }
  if (max > nums.length/2) return res
}
```

题目：
给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

实例：
```
输入: [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。

```

```js
// 贪心算法
var maxProfit = function(prices) {
  let profit = 0
  for (let i = 1; i < prices.length; i++) {
    let tmp = prices[i] - prices[i - 1]
    if (tmp > 0) profit += tmp
  }
  return profit
}
```
题目：
给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）

示例：
```
    3
   / \
  9  20
    /  \
   15   7
```
返回其层次遍历的结果：
```
[
  [3],
  [9,20],
  [15,7]
]
```

```js
// BFS
var levelOrder = function(root) {
    let queue = []
    let res = []
    if (root !== null) queue.push(root)
    while (queue.length > 0) {
        let val = []
        let size = queue.length
        for (let i = 0; i < size; i++) {
            let node = queue.shift()
            val.push(node.val)
            if (node.left !== null) queue.push(node.left)
            if (node.right !== null) queue.push(node.right)
        }
        res.push(val)
    }
    return res
};
```

题目：
给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7],
```
   3
   / \
  9  20
    /  \
   15   7
```
返回它的最大深度 3

```js
// DFS
var maxDeth = function(root) {
  if (root === null) return 0
  if (root.left === null) return 1 + maxDeth(root.right)
  if (root.right === null) return 1 + maxDeth(root.left)

  return 1 + Math.max(maxDeth(root.left), maxDeth(root.right))
}
```

题目：
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

示例：
```
输入：n = 3
输出：[
       "((()))",
       "(()())",
       "(())()",
       "()(())",
       "()()()"
     ]
```

```js
var generateParenthesis = function(n) {
    let list = []
    const dfs = function(left, right, n, result){
        if (left === n && right === n) {
            list.push(result)
            return
        }
        if (left < n) dfs(left + 1, right, n, result + '(')
        if (left > right && right < n) dfs(left, right + 1, n, result + ')')
    }
    dfs(0,0,n,'')
    return list
};
```

题目：
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