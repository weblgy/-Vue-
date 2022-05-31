// function foo(something) {
//     console.log(this.a, something);
//     return this.a + something;
// }

// function bind(fn, obj) {
//     return function () {
//         return fn.apply(obj, arguments);
//     };
// }
// var obj = {
//     a: 2
// }
// var bar = bind(foo, obj);
// bar(1)

function foo() {
    return (a) => {
        console.log(this.a);
    }
}

let obj1 = {
    a: 2
};

let obj2 = {
    a: 3
};

let bar1 = foo.call(obj1);
let bar2 = bar1.call(obj2);

console.log(bar1); // object
console.log(bar2); // 2 undefind