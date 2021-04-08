// function MinCoinChange(coins){
//   var coins = coins;
//
//   var cache = {};
//
//   this.makeChange = function(amount){
//     var change = [], total = 0;
//
//     for(var i = coins.length; i >= 0; i--){
//       var coin = coins[i];
//       while(total + coin <= amount){
//         change.push(coin);
//         total += coin;
//       }
//     }
//
//     console.log(change)
//     return change;
//   }
// }
//
// var minCoinChange = new MinCoinChange([1, 5, 10, 25]);
// minCoinChange.makeChange(14);
//一个25, 一个10, 一个1

// 给定一个只包含三种字符的字符串：（ ，） 和 *，写一个函数来检验这个字符串是否为有效字符串。有效字符串具有如下规则：
//
// 任何左括号 ( 必须有相应的右括号 )。
// 任何右括号 ) 必须有相应的左括号 ( 。
// 左括号 ( 必须在对应的右括号之前 )。
// * 可以被视为单个右括号 ) ，或单个左括号 ( ，或一个空字符串。
// 一个空字符串也被视为有效字符串。
// 示例 1:
//
// 输入: "()"
// 输出: True
// 示例 2:
//
// 输入: "(*)"
// 输出: True
// 示例 3:
//
// 输入: "(*))"
// 输出: True
// 注意:
//
//   字符串大小将在 [1，100] 范围内。
//
// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/valid-parenthesis-string
//   著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

var checkValidString = function(s) {
  let l = 0
  let h = 0
  let star = 0

  for (var i = 0; i < s.length; i++) {
    var sE = s[i]

    if(sE == '('){
      l++;
      h++;
    }else if(sE == ')') {
      if(l > 0){
        --l;
      }
      if(h > 0){
        --h;
      }else {
        return false
      }
    }else {
      if(l > 0){
        l--
      }
      h++;
      // star++
    }
  }
  console.log(l,h,star)
  for (var j = 0; j < star; j++) {
    if(l >= 0){
      l--
    }else {
      l++
    }
  }
  console.log(l,h)
  return l <=0&&h>=0
};

console.log(checkValidString("((*)*)*)((*"))

