// 保证输入与返回的类型一样
function f1<T>(n: Array<T>): Array<T> {
    return n
}

// f1<string>('2')
// f1('2')

// 泛型类
class cls1<T> {
    name: T;
    constructor(name: T) {
        // this.name = name
    }
}
new cls1('s')


class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!
