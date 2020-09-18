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

// 方法和constructor检查
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface{
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}

let digital = createClock(DigitalClock, 12, 17);

// 接口继承
interface shape {
    color: string
}
interface penStroke {
    penWidth: number
}

interface square extends shape,penStroke {
    sideLen: number
}
let s = <square>{};
s.sideLen = 1
s.color = 'red'
s.penWidth = 2
console.log(s)


// 混合类型 对象和函数
interface in4 {
    (start: number): string;
    interval: string;
    reset(): void
}
let counter = <in4>function (start) {return '1'}
counter.interval = '1000'
counter.reset = function () {console.log(123)}
console.log(counter.interval)


//  接口继承类
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

// 类只能继承一个接口
class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    // select() { }
}

// 错误：“Image”类型缺少“state”属性。
// class Image implements SelectableControl{
//     select() { }
// }
