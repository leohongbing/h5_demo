// public private protected只有在类里面能访问‘
class Animal {
    static test1: object = {a: 'a'} // 放到实例本身上
    private name: string;
    readonly test: number;
    private _lastName: string;

    constructor(theName: string) {
        this.name = theName;
        this.test = 1
        console.log(Animal.test1)
    }

    get lastName(): string {
        console.log(1)
        return this._lastName
    }

    set lastName(s: string) {
        console.log(2)
        this._lastName = s
    }
}

class Rhino extends Animal {
    constructor() {
        super("Rhino");
    }
}

class Employee {
    private name: string;

    constructor(theName: string) {
        this.name = theName;
    }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

// animal = rhino;
// animal = employee; // 错误: Animal 与 Employee 不兼容.
// animal.test = 'w'

rhino.lastName = 'LN'
console.log(rhino.lastName, animal)


// 抽象类
abstract class cls1 {
    constructor(public name: string) {
    }
    abstract absMethod(n: number): void
}

class cls2 extends cls1{
    constructor(name: string) {
        super(name);
    }
    // 实现抽象类的方法
    absMethod(n: number) {
    }
}

// new cls1('a')
// 实例化抽象类子类
const cls2Child = new cls2('bob')

// 把类当做接口使用
class cls3 {
    prop1: string;
    prop2: string
}
interface inter extends cls3{
    prop3: string
}
let o: inter = {prop1: 'a', prop2: 'b', prop3: 'c'}
