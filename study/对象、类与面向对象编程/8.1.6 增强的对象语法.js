/* 1.属性值简写
let name = 'Matt'
let person = {
    name:name
}
console.log(person); */

/* 简写属性名只要使用变量名（不用再填写冒号）就会自动被解释为同名的属性名，如果没有找到同名变量则会抛出ReferenceError
以下代码和之前的是等价的
let name = 'Matt'
let person = {
    name
}
console.log(person); */

/* 代码压缩程序会在不同作用域间保留属性名，以防止找不到引用，以下面的代码为例： */

/* function makePerson(name) {
    return {
        name
    }
}
let person = makePerson('Matt')
console.log(person.name); */

/* 在这里参数标识符只限定于函数作用域，编译器也会保留初始的name标识符，如果使用Google Closure 编译器压缩，那么函数参数会被缩短，而属性名不变 */
/* function makePerson(a) {
    return {
        name: a
    }
}

var person = makePerson("Matt")
console.log(person.name); */

/* 可计算属性
   在引入计算属性之前，如果想使用变量的值作为属性，那么必须先声明对象，然后使用中括号语法来添加属性。换句话说，不能在对象字面量中直接动态命名属性。比如：
*/

/* const nameKey = 'name'
const ageKey = 'age'
const jonKey = 'job'

let person = {}
person[nameKey] = 'Matt'
person[ageKey] = 27
person[jonKey] = 'Software engineer'

console.log(person);
 */
/* 有了可计算属性，就可以在对象字面量中完成动态属性赋值，中括号包围的对象属性键告诉运行时将其作为JavaScript表达式而不是字符串来求值： */
/* const nameKey = 'name'
const ageKey = 'age'
const jonKey = 'job'

let person = {
    [nameKey] : 'Matt',
    [ageKey] : 27,
    [jonKey]: 'Software engineer'
}

console.log(person); */

/* 可计算属性本身可以是复杂的表达式，在实例化时再求值： */
/* const nameKey = 'name'
const ageKey = 'age'
const jonKey = 'job'
let uniqueToken = 0

function getUniqueKey(key) {
    return `${key}_${uniqueToken++}`
}

let person = {
    [getUniqueKey(nameKey)] : 'Matt',
    [getUniqueKey(ageKey)] : 27,
    [getUniqueKey(jonKey)] : 'Software engineer'
}

console.log(person); */

/* 3.简写方法名
    在给对象定义方法时，通常都要写一个方法名、冒号，然后再引用一个匿名函数表达式，如下所示：
*/

/* let person = {
    sayName: function (name) {
        console.log(`My name is ${name}`);
    }
}

person.sayName('Matt') */

/* 简写方法 */

/* let person = {
    sayName(name) {
        console.log(`My name is ${name}`);
    }
}
person.sayName('Matt')
 */

/* 简写方法对获取函数和设置函数也是使用的 */
/* let person = {
    name_: '',
    get name () {
        return this.name_
    },
    set name (name) {
        this.name_ = name
    },
    sayName(){
        console.log(`My name is ${this.name_}`);
    }
}

person.name = 'Matt'
person.sayName() */

/* 简写方法名可与计算属性键相互兼容 */

const methodKey = 'sayName'

let person = {
    [methodKey](name){
        console.log(`My name is ${name}`);
    }
}

person.sayName('Matt')





