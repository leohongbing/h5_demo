// 布尔
let isDone: boolean = false

// 数字
let n: number = 18

// 字符串
let str: string = 'lei'
str = `${n}岁`

// 数组
let arr1: number[] = [1,2]
// 数组泛型
let arr2: Array<number|string> = [1, '123']

// 元组
let x: [number,string];
x = [1, '1'];
// x[2] = '1'

// 枚举
enum Color {
    Red = 1,
    Blue,
    Black
}
let c: Color = Color['1']
console.log(c, Color)

// any 不确定的数据类型
let notSure: any = ''
notSure = 123
notSure = false
// let oSure: object = 4
// oSure.valueOf()

// void 没有任何类型
let v: void = undefined
let v1: void = null
function v2(): void {
    console.log('v2')
}

// null undefined
let nu: number = null
nu = undefined
let nu1: null = null
let nu2: undefined = undefined

// never 函数有无法到达的终点
function f(): never {
    while (true) {

    }
    // throw Error('123')
}

// Object
declare function f1(o: object|null): void;
f1(null)

// 类型断言
let str1 = 'asasbaw ev'
let len: number = (str1 as string).length
