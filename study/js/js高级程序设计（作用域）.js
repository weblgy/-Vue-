let squared = 9
squared **= 0.5
console.log(squared); //3

let result = "Black".toLowerCase() < 'alphaber'.toLowerCase()
console.log(result); // false

let num = 0
outermost:
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (i == 5 && j == 5) {
                continue outermost
            }
            num++
        }
    }
console.log(num++); //95
// continue语句会强制循环继续执行，但不是继续执行内部循环，而是继续执行外部循环

let name1 = "Nich"
let name2 = new String("Matt")
name1.age = 27
name2.age = 26
console.log(name1.age); //undefined
console.log(name2.age); // 26
console.log(typeof name1); // String
console.log(typeof name2); // Object

// 如果使用 new 关键字，则JavaScript会创建一个Object类型的实例

function addTen(num) {
    num += 10
    return num
}
let count = 20
let result2 = addTen(count)
console.log(count); // 20
console.log(result2); // 30

//参数num其实是一个局部变量，在调用时count作为参数传入，count的值是20，这个值被复制到参数num以便在addTen内部使用

function setName(obj){
    obj.name = "Nick"
}
let person = new Object()
setName(person)
console.log(person.name); // Nick
// 在函数内部，obj和person都指向同一个对象，结果就是，即使对象是按值来传进函数的，obj也会通过引用访问对象。当函数内部给obj设置了name属性时，函数外部的对象也会反映该变化，因为obj指向的对象保存在全局作用域的堆内存上

// function setName(obj) {
//     obj.name = "Nick"
//     obj = new Object()
//     obj.name = "Greg"
// }
// let person = new Object()
// setName(person)
// console.log(person.name); //Nick
// 函数中参数的值改变之后，原始的引用仍然没变，当obj在函数内部被重写时，它变成了一个指向本地对象的指针，而那个本地对象在函数执行结束时就被销毁了