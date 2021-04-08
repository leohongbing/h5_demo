// 剑指 Offer 25. 合并两个排序的链表
// 输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。
//
// 示例1：
//
// 输入：1->2->4, 1->3->4
// 输出：1->1->2->3->4->4
// 限制：
//
// 0 <= 链表长度 <= 1000

var mergeTwoLists = function (l1, l2) {
  return l1.concat(l2).sort((a, b) => a - b)
};

// 链表递归
/*
* Definition for singly-linked list.
* function ListNode(val) {
*     this.val = val;
*     this.next = null;
* }
*/
var mergeTwoLists1 = function (l1, l2) {
  if(!l1){
    return l2
  }
  if(!l2){
    return l1
  }

  if(l1.val <= l2.val){
    l1.next = mergeTwoLists1(l1.next, l2)
    return l1
  }else {
    l2.next = mergeTwoLists1(l1, l2.next)
    return l2
  }
};

console.log(mergeTwoLists([1, 2, 4,], [1, 3, 4, 5]))
