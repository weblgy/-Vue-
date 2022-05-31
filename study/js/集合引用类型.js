//Array form() 和 of()
// 字符串会被拆分为单字符数组
console.log(Array.from("Matt")); //[ 'M', 'a', 't', 't' ]

//可以使用from()将集合跟映射转换为一个新数组
const m = new Map().set(1, 2).set(3, 4)
const s = new Set().add(1).add(2).add(3).add(4)
console.log(Array.from(m)); //[ [ 1, 2 ], [ 3, 4 ] ]
console.log(Array.from(s)); //[ 1, 2, 3, 4 ]

//Array.from()对现有数组执行浅复制
const a1 = [1, 2, 3, 4]
const a2 = Array.from(a1)
console.log(a1); //[ 1, 2, 3, 4 ]
console.log(a1 === a2); //false

const iter = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
    }
}
console.log(Array.from(iter)); //[ 1, 2, 3, 4 ]

//arguments对象可以被轻松转换为数组
function getArgsArray() {
    return Array.from(arguments)
}
console.log(getArgsArray(1, 2, 3, 4)); //[ 1, 2, 3, 4 ]


const b1 = [1, 2, 3, 4]
const b2 = Array.from(b1, x => x ** 2)
const b3 = Array.from(b1, function (x) {
    return x ** this.expoent
}, {
    expoent: 2
})

console.log(b2); //[ 1, 4, 9, 16 ]
console.log(b3); //[ 1, 4, 9, 16 ]
console.log(Array.of(1, 2, 3, 4)); //[ 1, 2, 3, 4 ]
console.log(Array.of(undefined)); //[ undefined ]

//sort排序
let values = [0, 1, 5, 10, 15]
// values.sort((a, b) => a < b ? 1 : a > b ? -1 : 0)
// values.sort((a, b) => a - b) // a-b升序
values.sort((a, b) => b - a) // b-a降序
console.log(values);


//归并方法
let value = [1, 2, 3, 4, 5]
let sum = value.reduce((prev, cur, index, array) => {
    return prev + cur
})
console.log(sum); //15

//?? 与 ?.
const adventurer = {
    name: 'Alice',
    cat: {
        name: 'Dinah'
    }
};

const dogName = adventurer.dog ?.name;
console.log(dogName);
// expected output: undefined

console.log(adventurer.someNonExistentMethod ?.());
// expected output: undefined
//可选链操作符( ?. )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。?. 操作符的功能类似于 . 链式操作符，不同之处在于，在引用为空(nullish ) (null 或者 undefined) 的情况下不会引起错误，该表达式短路返回值

const foo = null ?? 'default string';
console.log(foo);
// expected output: "default string"

const baz = 0 ?? 42;
console.log(baz);
// expected output: 0

//空值合并操作符（??）
//只有当左侧为null和undefined时，才会返回右侧的数
//空值合并操作符（??）是一个逻辑操作符，当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。
//与逻辑或操作符（||）不同，逻辑或操作符会在左侧操作数为假值时返回右侧操作数。也就是说，如果使用 || 来为某些变量设置默认值，可能会遇到意料之外的行为。比如为假值（例如，'' 或 0）时。见下面的例子。