/* 
    const的行为与let基本相同，唯一一个重要的区别是用它声明变量时必须同时初始化变量，且尝试修改const声明的变量会导致运行时错误
*/

// const age = 26
// age = 36 // 报错

// const 也不允许重复声明
// const name ='Matt'
// const name = 'Nicholas'

// const 声明的作用域也是块
const name = 'Matt'
if (true) {
    const name = 'Nicholas'
}
console.log(name); // Matt

/*
 const 声明的限制只适用于它指向的变量的引用。换句话说，如果const变量引用的是一个对象，那么修改这个对象内部的属性并不违反const的限制 
 */
const person = {}
person.name = 'Matt' //ok

/* JavaScript引擎会为for循环中的let声明分别创建独立的变量实例，虽然const变量跟let变量很相似，但是不能用const来声明迭代变量（因为迭代变量会自增） */
for(const i = 0; i<10;++i){}
/* 不过，如果你只想用const 声明一个不会被修改的for循环变量，那么也是可以的，也就是说，每次迭代只是创建一个新变量。这对for-of和for-in循环特别有意义 */
let i = 0
for(const j =7; i< 5; ++i ){
    console.log(j);
}
//7,7,7,7,7

for(const key in {a:1,b:2}){
    console.log(key);
}
// a,b

for(const value of [1,2,3,4,5]){
    console.log(value);
}
// 1,2,3,4,5