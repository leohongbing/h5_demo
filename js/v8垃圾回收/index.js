// 弱引用
// 手动执行一次垃圾回收保证内存数据准确
global.gc();

// 查看当前占用的内存，主要关心heapUsed字段，大小约为4.4MB
process.memoryUsage();

// 创建一个WeakMap
let wm = new WeakMap();

// 创建一个数组并赋值给变量key
let key = new Array(1000000);

// 将WeakMap的键名指向该数组
// 此时该数组存在两个引用，一个是key，一个是WeakMap的键名
// 注意WeakMap是弱引用
wm.set(key, 1);

// 手动执行一次垃圾回收
global.gc();

// 再次查看内存占用大小，heapUsed已经增加到约12MB
process.memoryUsage();

// 手动清除变量key对数组的引用
// 注意这里并没有清除WeakMap中键名对数组的引用
key = null;

// 再次执行垃圾回收
global.gc()

// 查看内存占用大小，发现heapUsed已经回到了之前的大小(这里约为4.8M，原来为4.4M，稍微有些浮动)
console.log(process.memoryUsage())
