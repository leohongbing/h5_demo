// 接口对象
interface in1 {
    label: string; // 必须属性
    t1?: number; // 非必须属性
    readonly r1: number; // 只读属性
    [propName: string]: any; // 索引签名
}
function f(o: in1): { t1: number } {
    let o1 = {t1: 1}
    return o1
}
let o1: in1 = { label: 'l1', r1: 1}
// o1.r1 = 2
f(o1)

let arr = [1,2,3]
let arr1: ReadonlyArray<number> = arr
arr[0] = 2
// arr1[0] = 1
console.log(arr1 as number[])

// f({ label: '1', t2: 3, r1:1 } as in1)
f({ label: '1', t2: 3, r1:1 })

// 接口函数
interface fn {
    (arg1: string, arg2: object): string
}
let fn1: fn;
fn1 = function (a: string, b: object): string {
    return '1'
}

interface in3 {
    [index: string]: string;
    t: string;
}


interface class1 {
    currentTime: Date;
    setTime(t: Date);
}
class class2 implements class1 {
    currentTime: Date;
    setTime(t: Date) {
    }
    constructor() {
    }
}
