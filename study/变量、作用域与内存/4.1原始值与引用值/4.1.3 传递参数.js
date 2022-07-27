/* 
    ES中所有函数的参数都是按值传递的。这意味着函数外的值会被复制到函数内部的参数中，就像从一个变量复制到另一个变量一样。
    如果是原始值，那么就跟原始值变量的复制一样，如果是引用值，那么就跟引用值变量的复制一样
*/

/* 
    在按值传递参数时。值会被复制到一个局部变量（即一个命名参数，或者用ES的话，就是arguments对象中的一个槽位）。
    在按引用传递参数时，值在内存中的位置会被保存在一个局部变量，这意味着对本地变量的修改会反映到函数外部。（这在ES中是不可能的）来看下面这个例子：
*/
// function addTen(num) {
//     num += 10;
//     return num
// }
// let count = 20
// let result  = addTen(count)
// console.log(count); // 20 没有变化
// console.log(result); // 30
/* 
    这里，函数addTen()有一个参数num，它其实是一个局部变量。在调用是。变量count作为参数传入。
    count的值是20.这个值被复制到参数num以便在addTen()内部使用。在函数内部。参数num的值被加上了10，
    但这不会影响函数外部的原始变量count。参数num和变量count互不干扰，它们只不过碰巧保存了一样的值。
    如果num是按引用传递的，那么count的值会被修改为30.这个事实在使用数值这样的原始值时是非常明显的。
    但是，如果变量中传递的是对象，就没那么清楚了。比如，再看这个例子：
*/
// function setName(obj){
//     obj.name = 'Nicholas'
// }
// let person = new Object()
// setName(person)
// console.log(person.name); // Nicholas

/* 
    这一次，我们创建了一个对象并把它保存在变量person中。然后，这个对象被传给setName（）方法，并被复制到参数obj中。在函数内部，onj和person都指向同一个对象。
    结果就是，即使对象是按值传进函数的，obj也会通过引用访问对象，当函数内部给obj设置了name属性时，函数外部对的对象也会反映这个变化,因为obj指向的对象保存在全局作用域的堆内存中
*/
function setName(obj){
    obj.name = 'Nicholas'
    obj = new Object()
    obj.name = 'Greg'
}
let person = new Object()
setName(person)
console.log(person.name); // 'Nichloas'
/*
    这个例子前后唯一的变化就是setName()中多了两行代码，将obj重新定义一个有着不同name的新对象。
    当person传入setName()时，其name属性被设置为'Nichloas'然后变量obj被设置为一个新对象且name属性被设置为'Nichloas'
    然后变量obj被设置为一个新对象且name属性被设置为'Greg'。如果person是按引用传递的，那么person应该自动将指针改为指向name为'Greg'的对象
    可是，当我们再次访问person.name时，它的值是'Nicholas',这表明函数中参数的值改变之后，原始的引用仍然没变。当obj在函数内部被重写时，
    它变成了一个指向本地对象的指针。而那个本地对象在函数执行结束时就被销毁了
 */