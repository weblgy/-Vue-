/* 
    1.使用var的函数作用域声明
    在使用var声明变量时，变量会被自动添加到最接近的上下文。在函数中，最接近的上下文就是函数的局部上下文。
    在with语句中最接近的上下文也是函数上下文。如果变量未经声明就被初始化了，那么他就会自动被添加到全局上下文，如下面的例子所示：
*/
// function add(num1,num2) {
//     sum = num1 + num2
//     return sum
// }

// let result = add (10,20) //30
// console.log(sun); // 报错：sum在这里不是有效变量

/* 
    这里，函数add()定义了一个局部变量sum，保存加法操作的结果。这个值作为函数的值被返回,但变量sum在函数外部是访问不到的。
    如果省略上面例子中的关键字var，那么sum在add()被调用之后就变成可以访问的了,如下所示:
*/
/* function add(num1,num2) {
    sum = num1 + num2
    return sum
}
let result = add(10,20) // 30
console.log(sum); // 30 */
/* 
    这一次，变量sum被用加法操作的结果初始化时并没有使用var声明。
    在调用add()之后，sum被添加到了全局上下文，在函数退出之后依然存在，从而在后面可以访问到。
 */

/*
    2.使用let的块级作用域声明
    ES6新增的let关键字跟var很相似，但它的作用域是块级的，这就是JavaScript中的新概念。
    块级作用域由最近的一对包含花括号{}界定。换句话说，if块、while块、function块，甚至连单独的块也是let声明变量的作用域
 */
/* if(true){
    let a
}
console.log(a); // a没有定义

while (true) {
    let b
}
console.log(b); // b没有定义

function foo () {
    let c
}
console.log(c); // c没有定义 */

// 这不是对象字面量，而是一个独立的块
// JavaScript解释器会根据其中内容识别出它来
/* {
    let d
}
console.log(d); // d没有定义 */

/* 
    let与var的另一个不同之处是在同一作用域内不能声明两次。重复的var声明会被忽略，而重复的let声明会抛出SyntaxError
*/
/* var a;
var a;
// 不会报错
{
    let b;
    let b;
} */
// SyntaxError： 标识符b已经声明过了

/* let的行为非常适合在循环中声明迭代变量。使用var声明的迭代变量会泄露到循环外部，这种情况应该避免。来看下面的例子： */
/* for(var i = 0; i<10; ++i){}
console.log(i); // 10

for(let j = 0; j<10;++j){}
console.log(j); // ReferenceError: j没有定义
 */
/* 
    严格来讲，let在JavaScript运行中也会被提升，但由于'暂时性死区'的缘故,实际上不能在声明之前使用let变量。
    因此，从写JavaScript代码的角度说，let的提升跟var是不一样的
*/

/* 
    3.使用const的常量声明
    除了let，ES6同时还增加了const关键字。使用const声明的变量必须同时初始化某个值。
    一经声明，在其生命周期的任何时候都不能再重新赋予新值。
*/
const a //SyntaxError: 常量声明时没有初始化
const b = 3
console.log(b); // 3
b = 4 // TypeError: 给常量赋值

/* 
    const 除了要遵循以上规则，其他方面与let声明是一样的
*/

/* 
    const声明只应用到顶级原语或者对象。换句话是，赋值为对象的const变量不能再被重新赋值为其他引用值，但对象的键则不受限制。
*/
const ol ={}
ol = {} // TypeError: 给常量赋值

const o2 = {}
o2.name = 'Jack'
console.log(o2.name); // 'Jack‘

/* 
    如果想让整个对象都不能修改，可以使用Object.freeze(),这样再给属性赋值时虽然不会报错，但是会静默失败
*/

const o3 = Object.freeze({});
o3.name = 'Jake'
console.log(o3.name); // undefined
