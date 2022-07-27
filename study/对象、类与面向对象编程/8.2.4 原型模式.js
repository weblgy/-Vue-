/* 
    每个函数都会创建一个prototype属性，这个属性是一个对象，包含应该由特定引用类型的实例共享的属性和方法。
    实际上，这个对象就是通过调用构造函数创建的对象的原型。使用原型对象的好处就是，在它上面定义的属性和方法可以被对象实例共享。
    原来在构造函数中直接赋给对象实例的值，可以直接赋值给它们的原型，如下所示：
 */
    function Person() {}
    Person.prototype.name = 'Nicholas'
    Person.prototype.age = 29
    Person.prototype.job = 'Software Engineer'
    Person.prototype.sayName = function() {
        console.log(this.name);
    }
    let person1 = new Person()
    person1.sayName() // 'Nicholas'

    let person2 = new Person()
    person2.sayName() //'Nicholas'

    console.log(person1.sayName == person2.sayName); // true

    /* 
        这里，所有属性和sayName()方法都直接添加到了Person的prototype属性上，构造函数体中什么也没有。但这样定义之后，调用构造函数创建的新对象仍然拥有相应的属性和方法、
        与构造函数模式不同，使用这种原型模式定义的属性和方法是由所有实例共享的。因此person1和person2访问的都是相同的属性和相同的sayName()函数，要理解这个过程，必须理解ES中原型的本质
    */