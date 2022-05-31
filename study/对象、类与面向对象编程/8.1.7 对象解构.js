/* Es6 新增了对象解构语法，可以在一条语句中使用嵌套数据实现一个或者多个赋值操作
    简单来说，对象解构就是使用与对象匹配的结构来实现对象属性赋值
*/

/* 不使用对象解构 */
/* let person = {
    name: 'Matt',
    age: 27
}

let personName = person.name
    personAge = person.age

console.log(personName); // Matt
console.log(personAge); // 27 */

/* 使用对象解构 */
/* let person = {
    name: 'Matt',
    age: 27
}

let { name: personName, age: personAge } = person
console.log(personName); // Matt
console.log(personAge); // 27 */

/* 如果想让变量直接使用属性的名称，那么可以使用简写语法 */
/* let person = {
    name: 'Matt',
    age: 27
}

let { name, age} = person

console.log(name); // Matt
console.log(age); // 27 
 */

/* 如果引用属性不存在，则该变量的值技术undefined */
/* let person = {
    name: 'Matt',
    age: 27
}

let {name,job} = person
console.log(name);  // Matt
console.log(job); // undefined */

/* 也可以在解构赋值的同时定义默认值 */
/* let person = {
    name: 'Matt',
    age: 27
}

let { name, job = 'Software engineer' } = person
console.log(name);  // Matt
console.log(job); // Software engineer */


/* 解构在内部使用函数ToObject，对象解构上下文中，原始值会被当成对象，null和undefined不能被解构，否则抛出错误 */
/* let {length} = 'foobar'
console.log(length);

let { constructor: c} = 4
console.log(c === Number); // true

let {_} = null //TypeError
let {_} = undefined //TypeError
 */

/* 解构并不要求变量必须在解构表达式中声明，如果给事先声明的变量赋值，则赋值表达式必须包含在一对括号中： */
/* let personName, personAge;
let person = {
    name: 'Matt',
    age: 27
}

({ name: personName, age: personAge } = person)

console.log(personName, personAge); */

/* 
1.嵌套解构 
解构对于引用嵌套的属性或赋值目标没有限制。为此，可以通过解构来复制对象属性：
*/

/* let person = {
    name: 'Matt',
    age:27,
    job:{
        title:'Software engineer'
    }
}
let personCopy = {}

({
    name:personCopy.name,
    age:personCopy.age,
    job:personCopy.job
} = person) */
/* 
因为一个对象的引用被赋值给personCopy，所以修改 
person.job对象的属性也会影响personCopy
*/
// person.job.title = 'Hacker'
// console.log(person);
// {name:'Matt',age:27,job:{title:'Hacker}}
// console.log(personCopy);
// {name:'Matt',age:27,job:{title:'Hacker}}

/* 解构赋值可以使用嵌套结构，以匹配嵌套的属性 */
/* let person = {
    name: 'Matt',
    age:27,
    job:{
        title:'Software engineer'
    }
}
// 声明title变量并将person.job.title的值赋给它
let {job: {title}} = person
console.log(title); // Software engineer */

/* 在外层属性没有定义的情况下不能使用嵌套解构。无论源对象还是目标对象都一样： */
/* let person = {
    job: {
        title:'Software engineer'
    }
}
let personCopy = {}
// foo在源对象上是undefined
({
    foo: {
        bar:personCopy.bar
    }
} = person)
// TypeError: cannot destructure property 'bar' of 'undefined' or 'null'

// job在目标对象上是undefined
({
    job:{
        title:personCopy.job.title
    }
} = person)
// TypeError: Cannot set property 'title' of undefined */

/* 
2.部分解构 
如果一个解构表达式涉及多个赋值，开始的赋值成功而后面的赋值出错，则整个解构赋值只会完成一部分
*/

/* let person = {
    name: 'Matt',
    age:27
}
let personName,personBar,personAge

try {
    // person.foo 是undefined 因此会抛出错误
    ({name:personName,foo: {bar: personBar},age:personAge} = person)
} catch(e) {
}
console.log(personName,personBar,personAge);
//Matt undefined undefined */

/* 
3.参数上下文匹配
在函数参数列表中也可以进行解构赋值。对参数的解构赋值不会影响arguments对象，但可以在函数秦明中声明在函数体内使用局部变量：
*/
let person = {
    name: 'Matt',
    age:27
}

function printPerson(foo,{name,age},bar) {
    console.log(arguments);
    console.log(name,age);
}

function printPerson2(foo,{name:personName,age:personAge},bar) {
    console.log(arguments);
    console.log(personName,personAge);
}

printPerson('1st',person,'2nd')

printPerson2('1st',person,'2nd')