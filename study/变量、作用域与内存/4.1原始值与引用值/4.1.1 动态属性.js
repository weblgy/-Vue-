/*  
    原始值和引用值的定义方式很类似，都是创建一个变量，然后给它赋一个值。不过，在变量保存了这个值之后，可以对这个值做什么，则大有不同。
    对于引用值而言，可以随时添加、修改、和删除其属性和方法。比如，看下面的例子“
*/
// let person = new Object()
// person.name = 'Nicholas'
// console.log(person.name);

/* 这里，首先创建了一个对象，并把它保存在变量person中，然后，给这个对象添加了一个名为name的属性，并给这个属性赋值了一个字符串'Nicholas' 
    在此之后，就可以访问这个新属性，直到对象被销毁或属性被显式地删除
    原始值不能有属性，尽管尝试给原始值添加属性不会报错。比如：
*/
let name = 'Nicholas'
name.age = 27
console.log(name.age); // undefined

/* 
    在此，代码想给字符串name定义一个age属性并给该属性赋值27.紧接着在下一行，属性不见了，记住，只有引用值可以动态添加后面可以使用的属性
*/
/* 注意，原始类型的初始化可以只使用原始字面量形式。如果使用的是new关键字，则JavaScript会创建一个Object类型的实例，但其行为类似原始值。下面来看看这两种初始化方式的差异 */
let name1 = 'Nicholas'
let name2 = new String('Matt')
name1.age = 27
name2.age = 26
console.log(name1.age); //undefined
console.log(name2.age); //26
console.log(typeof name1); // string
console.log(typeof name2); // object
