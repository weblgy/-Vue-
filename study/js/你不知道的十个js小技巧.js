// 1.使用const定义
// 在开发中不要过度声明变量，尽量使用表达式和链式调用形式。然后一般能用const就不用let，这种模式写多了以后，你会发现项目中几乎找不到几个写let的地方：
// bad
// let result = false
// if (userInfo.age > 30) {
//     result = true
// }
// good
// const result = userInfo.age > 30;

// 在项目中很多同事会这样写：
// function handleFormChange(e) {
//     let isUpload;
//     if (e.target.value === 'upload') {
//         isUpload = true;
//     } else {
//         isUpload = false;
//     }
// }

// 但实际上 == 和 === 的表达式可以直接给变量赋值
// function handleFormChange(e) {
//     const isUpload = (e.target.value === 'upload')
// }

// 2.有条件地向对象添加属性
// 可以用扩展运算符有条件的向对象中添加属性：
// const condition = true
// const preson = {
//     id: 1,
//     name: "byd",
//     ...(condition && {
//         age: 12
//     })
// }
// console.log(preson.age);

// 4.解构赋值
// 解构赋值非常方便，项目中经常使用，可以分为以下两个场景：
// 对象/数组的解构； 函数参数解构
// 这里介绍四种常用技巧

// 1.深度解构
// 大部分时候我们都只解构一层，但实际上解构赋值是可以深度解构的

// const obj = {
//     name: 'byd',
//     a: {
//         b: 1
//     }
// }

// const {
//     a: {
//         b
//     }
// } = obj
// console.log(b);

// 2.解构时使用别名
// 假如后端返回的键名不是我们想要的，可以使用别名:

// const obj = {
//     aaa_bbb_ccc: {
//         name: 'byd',
//         age: 12,
//         sex: true
//     }
// }
// const {
//     aaa_bbb_ccc: user
// } = obj
// console.log(user);

// 3.解构时使用默认值
// fetchUserInfo().then(({aaa_bbb_ccc: user = {}}) => {
//    // ...
// })
// 以上三个特性可以结合使用

// 4.使用短路避免报错
// 解构赋值虽然好用，但是要注意解构的对象不能为undefined、null 否者会报错，故要给被赋值的对象一个默认值
// const {a,b,c,d,e} = obj || {}


//从 Date 对象中获取时间
//使用 Date 对象的 .toTimeString() 方法转换为时间字符串，之后截取字符串即可
// const timeForDate = date =>  date.toTimeString().slice(0,8)
// console.log(timeForDate(new Date(2021, 0, 10, 17, 30, 0))); 

