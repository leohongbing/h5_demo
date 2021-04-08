let arr = [[1, 2, 3], 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", {name: "弹铁蛋同学"}];

// console.log(arr.flat(Infinity))
for (var i = 0; i < 10; i++) {
  arr = [].concat.apply([], arr)
}
console.log(arr)

function flat(arr) {
  let arrResult = [];
  arr.forEach(item => {
    if (Array.isArray(item)) {
      arrResult = arrResult.concat(flat(item));   // 递归
      // 或者用扩展运算符
      // arrResult.push(...arguments.callee(item));
    } else {
      arrResult.push(item);
    }
  });
  return arrResult;
}
console.log(flat(arr))

