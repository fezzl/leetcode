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