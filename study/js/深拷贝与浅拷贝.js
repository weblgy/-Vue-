// 浅拷贝
// 分析
function shallowCopy(obj) {
    let copyObj = {};
    for (let i in obj) {
        copyObj[i] = obj[i];
    }
    return copyObj;
}

// 实例
let a = {
    name: '张三',
    age: 19,
    like: ['打篮球', '唱歌', '跳舞']
}

let b = shallowCopy(a);

a.name = '李四';
a.like[0] = '打打乒乓球';
//   console.log(a);
//   console.log(b);

// 递归实现深拷贝
// 分析
function deepCopy(obj) {
    // 判断是否为引用数据类型
    if (typeof obj === 'object') {
        let result = obj.constructor === Array ? [] : {};
        // 对引用类型继续进行遍历，如果遍历没有结束的话
        for (let i in obj) {
            result[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i];
        }

        return result;
    }
    // 为基本数据类型，直接赋值返回
    else {
        return obj;
    }
}

// 实例 - 利用递归函数做深拷贝
let c = {
    name: '张三',
    age: 12,
    like: [
        '打乒乓球',
        '打羽毛球',
        '打太极'
    ]
}

let d = deepCopy(c);

c.name = '李四';
c.like[0] = '打篮球';
// console.log(c);
// console.log(d);

//JSON实现深拷贝
// 实例 - 利用json函数做深拷贝
let g = {
    name: '张三',
    age: 19,
    like: ['打羽毛球', '唱歌', '跳舞']
}

let f = JSON.parse(JSON.stringify(g));

// 注意： JSON函数做深度拷贝时不能拷贝正则，Date，方法函数等

g.name = '李四';
g.like[0] = '打乒乓球';

console.log(g);
console.log(f);

//封装函数getUrlParams, 将URL地址的参数解析为对象
function getUrlParams(url) {
    let obj = {};

    if (url.indexOf('?') === -1) {
        return obj;
    }

    let first_res = url.split('?')[1];
    let second_res = first_res.split('&');

    for (let i in second_res) {
        third = second_res[i].split('=');
        obj[third[0]] = third[1];
    }
    return obj;
}


// 测试代码

let URL = 'https://www.sogou.com/web?ie=UTF-8&query=搜索内容&_em=3';
console.log(getUrlParams(URL));

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr.sort(() => Math.random() - 0.5);
//利用sort，返回结果为大于等于0时被交换位置，小于0时交换位置。

// 对比数组中对象
var arr1 = [{a: 1}, {b: 2}, {c: 3}, {d: 4}]
var arr2 = [{a: 2}, {b: 1}, {c: 3}]
var arr3 = arr1.filter((item, i) => {
    if (arr2[i]) {
        let key = Object.keys(arr2[i])
        return item[key] !== arr2[i][key]
    }
})
console.log(arr3);