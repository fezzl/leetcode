23.合并 k 个升序链表
给你一个链表数组，每个链表都已经按升序排列。
请你将所有链表合并到一个升序链表中，返回合并后的链表。

示例：

```
输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6

```

题解：

1. 暴力解

```js
var mergeKLists = function (lists) {
  return lists
    .reduce((res, list) => {
      while (list) {
        res.push(list);
        list = list.next;
      }
      return res;
    }, [])
    .sort((a, b) => a.val - b.val)
    .reduceRight((p, n) => {
      n.next = p;
      p = n;
      return p;
    }, null);
};
```

2. 分治
   时间复杂度 O(kn\*logk)
   空间复杂度 O(logk)

```js
var mergeKLists = function (lists) {
  if (lists === null || lists.length === 0) return null;
  return merge(lists, 0, lists.length - 1);
};

var merge = function (lists, left, right) {
  if (left === right) return lists[left];
  let mid = left + (right - left) / 2;
  let l1 = merge(lists, left, mid);
  let l2 = merge(lists, mid + 1, right);
  return mergeTwoLists(l1, l2);
};

var mergeTwoLists = function (l1, l2) {
  if (l1 === null) return l2;
  if (l2 === null) return l1;
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
```
