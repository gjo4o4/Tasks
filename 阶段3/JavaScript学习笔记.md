# JavaScript学习笔记

## 输出

- 显示数据
  1. 使用 window.alert() 弹出警告框。
  2. 使用 document.write() 方法将内容写到 HTML 文档中。
  3. 使用 innerHTML 写入到 HTML 元素。
  4. 使用 console.log() 写入到浏览器的控制台。



---



## 语法

- 语法

- 字面量

  1. 数字

     eg：

     ```
     3.14
     
     1001
     
     123e5
     ```

  2. 字符串

     eg：

     ```
     "John Doe"
     
     'John Doe'
     ```

  3. 表达式

     eg：

     ```
     5 + 6
     
     5 * 10
     ```

  4. 数组

     eg：

     ```
     [40, 100, 1, 5, 25, 10]
     ```

  5. 对象

     eg：

     ```
     {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"}
     ```

  6. 函数

     eg：

     ```
     function myFunction(a, b) { return a * b;}
     ```

- 变量

  JavaScript 使用关键字 **var** 来定义变量， 使用等号来为变量赋值

  eg:

  ```
  var x, length
  
  x = 5
  
  length = 6
  ```

- 操作符

  1. 使用 算术运算符 来计算值

     eg：

     ```
     (5 + 6) * 10
     ```

  2. 使用赋值运算符给变量赋值

     eg：

     ```
     x = 5
     y = 6
     z = (x + y) * 10
     ```

  3. 运算符

     | 类型                   | 实例      | 描述                   |
     | :--------------------- | :-------- | :--------------------- |
     | 赋值，算术和位运算符   | = + - * / | 在 JS 运算符中描述     |
     | 条件，比较及逻辑运算符 | == != < > | 在 JS 比较运算符中描述 |

- 语句

  在 HTML 中，JavaScript 语句用于向浏览器发出命令。

  语句是用分号分隔：

  eg：

  ```
  x = 5 + 6;
  y = x * 10;
  ```

- 关键字

  JavaScript 关键字用于标识要执行的操作。

  和其他任何编程语言一样，JavaScript 保留了一些关键字为自己所用。

  | abstract | else       | instanceof | super        |
  | -------- | ---------- | ---------- | ------------ |
  |          |            |            |              |
  | boolean  | enum       | int        | switch       |
  |          |            |            |              |
  | break    | export     | interface  | synchronized |
  |          |            |            |              |
  | byte     | extends    | let        | this         |
  |          |            |            |              |
  | case     | false      | long       | throw        |
  |          |            |            |              |
  | catch    | final      | native     | throws       |
  |          |            |            |              |
  | char     | finally    | new        | transient    |
  |          |            |            |              |
  | class    | float      | null       | true         |
  |          |            |            |              |
  | const    | for        | package    | try          |
  |          |            |            |              |
  | continue | function   | private    | typeof       |
  |          |            |            |              |
  | debugger | goto       | protected  | var          |
  |          |            |            |              |
  | default  | if         | public     | void         |
  |          |            |            |              |
  | delete   | implements | return     | volatile     |
  |          |            |            |              |
  | do       | import     | short      | while        |
  |          |            |            |              |
  | double   | in         | static     | with         |

- 注释

  不是所有的 JavaScript 语句都是"命令"。双斜杠 **//** 后的内容将会被浏览器忽略。

  eg：

  ```
  // 我不会执行喔
  ```

- 数据类型

  JavaScript 有多种数据类型：数字，字符串，数组，对象等等

  eg：

  ```
  var length = 16;                                  // Number 通过数字字面量赋值
  var points = x * 10;                              // Number 通过表达式字面量赋值
  var lastName = "Johnson";                         // String 通过字符串字面量赋值
  var cars = ["Saab", "Volvo", "BMW"];              // Array  通过数组字面量赋值
  var person = {firstName:"John", lastName:"Doe"};  // Object 通过对象字面量赋值
  ```

  如果没有使用数据类型，将无法执行。

  eg：

  ```
  16 + "Volvo"
  "16Volvo"
  ```

- 函数

  JavaScript 语句可以写在函数内，函数可以重复引用：

  引用一个函数 = 调用函数(执行函数内的语句)。

  eg：

  ```
  function myFunction(a, b) {
      return a * b;                                // 返回 a 乘以 b 的结果
  }
  ```

- 字母大小写

  JavaScript 对大小写是敏感的。

  eg：变量 **myVariable** 与 **MyVariable** 是不同的。

- 字符集

  JavaScript 使用 Unicode 字符集。

  Unicode 覆盖了所有的字符，包含标点等字符。



---



## 语句

JavaScript 语句向浏览器发出的命令。语句的作用是告诉浏览器该做什么。

- 语句

  JavaScript 语句是发给浏览器的命令。

  eg：

  ```
  document.getElementById("demo").innerHTML = "你好 Dolly";
  ```

- 分号

  1. 分号用于分隔 JavaScript 语句。

  2. 通常我们在每条可执行的语句结尾添加分号。使用分号的另一用处是在一行中编写多条语句。

     eg：

     ```
     a = 5;
     b = 6;
     c = a + b;
     or
     a = 5; b = 6; c = a + b;
     ```

- 代码

  JavaScript 代码是 JavaScript 语句的序列。

  eg：

  ```
  document.getElementById("demo").innerHTML="你好 Dolly";
  document.getElementById("myDIV").innerHTML="你最近怎么样?";
  ```

- 代码块

  1. JavaScript 可以分批地组合起来。

  2. 代码块以左花括号开始，以右花括号结束。

  3. 代码块的作用是一并地执行语句序列。

     eg：

     ```
     function myFunction()
     {
         document.getElementById("demo").innerHTML="你好Dolly";
         document.getElementById("myDIV").innerHTML="你最近怎么样?";
     }
     ```

- 语句标识符

  JavaScript 语句通常以一个 **语句标识符** 为开始，并执行该语句。

  语句标识符是保留关键字不能作为变量名使用。

  | 语句         | 描述                                                         |
  | :----------- | :----------------------------------------------------------- |
  | break        | 用于跳出循环。                                               |
  | catch        | 语句块，在 try 语句块执行出错时执行 catch 语句块。           |
  | continue     | 跳过循环中的一个迭代。                                       |
  | do ... while | 执行一个语句块，在条件语句为 true 时继续执行该语句块。       |
  | for          | 在条件语句为 true 时，可以将代码块执行指定的次数。           |
  | for ... in   | 用于遍历数组或者对象的属性（对数组或者对象的属性进行循环操作）。 |
  | function     | 定义一个函数                                                 |
  | if ... else  | 用于基于不同的条件来执行不同的动作。                         |
  | return       | 返回结果，并退出函数                                         |
  | switch       | 用于基于不同的条件来执行不同的动作。                         |
  | throw        | 抛出（生成）错误 。                                          |
  | try          | 实现错误处理，与 catch 一同使用。                            |
  | var          | 声明一个变量。                                               |
  | while        | 当条件语句为 true 时，执行语句块。                           |

- 空格

  JavaScript 会忽略多余的空格。您可以向脚本添加空格，来提高其可读性。

  eg：

  ```
  var person="runoob";
  var person = "runoob";
  ```

- 折行

  可以在文本字符串中使用反斜杠对代码行进行换行。

  eg：

  ```
  document.write("你好 \
  世界!");
  ```

  

---



## 注释

JavaScript 注释可用于提高代码的可读性。

- 是什么

  JavaScript 不会执行注释，我们可以添加注释来对 JavaScript 进行解释，或者提高代码的可读性。

  单行注释以 **//** 开头。

  eg：

  ```
  // 输出标题：
  document.getElementById("myH1").innerHTML="欢迎来到我的主页";
  // 输出段落：
  document.getElementById("myP").innerHTML="这是我的第一个段落。";
  ```

- 多行注释

  多行注释以 **/\*** 开始，以 ***/** 结尾。

  eg：

  ```
  /*
  下面的这些代码会输出
  一个标题和一个段落
  并将代表主页的开始
  */
  document.getElementById("myH1").innerHTML="欢迎来到我的主页";
  document.getElementById("myP").innerHTML="这是我的第一个段落。";
  ```

- 阻止执行

  1. 用于阻止其中一条代码行的执行

     eg：

     ```
     // document.getElementById("myH1").innerHTML="欢迎来到我的主页";
     document.getElementById("myP").innerHTML="这是我的第一个段落。";
     ```

  2. 用于阻止代码块的执行

     eg：

     ```
     /*
     document.getElementById("myH1").innerHTML="欢迎来到我的主页";
     document.getElementById("myP").innerHTML="这是我的第一个段落。";
     */
     ```

- 在行末使用注释

  eg：

  ```
  var x=5;    // 声明 x 并把 5 赋值给它
  var y=x+2;  // 声明 y 并把 x+2 赋值给它
  ```

  

---



## 变量

- 是什么

  1. 变量是用于存储信息的"容器"。并可以在程序执行过程中动态更改。

  2. 变量可以存储各种类型的数据，如数字、字符串、对象、函数等。

  3. 在 JavaScript 中，可以使用 **var**、**let** 和 **const** 关键字来声明变量。

     eg：

     - **`var`**：ES5 引入的变量声明方式，具有函数作用域。

     - **`let`**：ES6 引入的变量声明方式，具有块级作用域。

     - **`const`**：ES6 引入的常量声明方式，具有块级作用域，且值不可变。

       eg：

       ```
       var x=5;
       var y=6;
       var z=x+y;
       ```

- 变量

  JavaScript 变量可用于存放值（x = 5）和表达式（z = x + y）。

  变量可以使用短名称（比如 x 和 y），也可以使用描述性更好的名称（比如 age, sum, totalvolume）。

  1. 变量必须以字母开头
  2. 变量也能以 $ 和 _ 符号开头（不过我们不推荐这么做）
  3. 变量名称对大小写敏感（y 和 Y 是不同的变量）

- 数据类型

  1. JavaScript 变量还能保存其他数据类型

  2. 当向变量分配文本值时，应该用双引号或单引号包围这个值。

  3. 当向变量赋的值是数值时，不要使用引号。如果您用引号包围数值，该值会被作为文本来处理。

- 声明

  1. 声明

     在 JavaScript 中创建变量通常称为"声明"变量。

     我们使用 var 关键词来声明变量：

     eg：

     ```
     var carname;
     ```

     变量声明之后，该变量是空的（它没有值）。

     如需向变量赋值，请使用等号：

     eg：

     ```
     carname="Volvo";
     ```

     也可以这样

     ```
     var carname="Volvo";
     ```

  2. 重新声明

     如果重新声明 JavaScript 变量，该变量的值不会丢失

     eg：

     ```
     var
     carname="Volvo"; 
     var carname;
     ```

- value=undefined

  未使用值来声明的变量，其值实际上是 undefined。

  在执行过以下语句后，变量 carname 的值将是 undefined：

  ```
  var carname;
  ```

- 算数

  可以通过 JavaScript 变量来做算数，使用的是 = 和 + 这类运算符

  eg:

  ```
  y=5;
  x=y+2;
  ```

- let&const

  1. let

     let 是 ES6 引入的新变量声明方式

     语法：

     ```
     let variableName = value;
     ```

  2. const

     const 用于定义常量，即一旦赋值后，变量的值不能再被修改。

     语法：

     ```
     const variableName = value;
     ```

     

---



## 数据类型

- 数据类型

  1. 值类型
     - 字符串（String）
     - 数字(Number)
     - 布尔(Boolean)
     - 空（Null）
     - 未定义（Undefined）
     - Symbol
  2. 引用数据类型
     - 对象(Object)
     - 数组(Array)
     - 函数(Function)
     - 正则（RegExp）
     - 日期（Date）

- 动态类型

  JavaScript 拥有动态类型，相同的变量可用作不同的类型

  eg：

  ```
  var x;               // x 为 undefined
  var x = 5;           // 现在 x 为数字
  var x = "John";      // 现在 x 为字符串
  ```

- 字符串

  字符串是存储字符（比如 "Bill Gates"）的变量。

  字符串可以是引号中的任意文本，可以使用单引号或双引号：

  eg：

  ```
  var carname="Volvo XC60";
  var carname='Volvo XC60';
  ```

- 数字

  JavaScript 只有一种数字类型。数字可以带小数点，也可以不带。

  eg：

  ```
  var x1=34.00;      //使用小数点来写
  var x2=34;         //不使用小数点来写
  or
  var y=123e5;      // 12300000
  var z=123e-5;     // 0.00123
  ```

- 布尔

  布尔（逻辑）只能有两个值：true 或 false。

  eg：

  ```
  var x=true;
  var y=false;
  ```

- 数组

  eg：创建名为 cars 的数组

  ```
  var cars=new Array();
  cars[0]="Saab";
  cars[1]="Volvo";
  cars[2]="BMW";
  ```

- 对象

  对象由花括号分隔。在括号内部，对象的属性以名称和值对的形式 (name : value) 来定义。属性由逗号分隔

  eg：

  ```
  var person={firstname:"John", lastname:"Doe", id:5566};
  ```

- undefined&null

  Undefined 这个值表示变量不含有值。

  可以通过将变量的值设置为 null 来清空变量。

  eg：

  ```
  cars=null;
  person=null;
  ```

- 声明

  当声明新变量时，可以使用关键词 "new" 来声明其类型

  eg：

  ```
  var carname=new String;
  var x=      new Number;
  var y=      new Boolean;
  var cars=   new Array;
  var person= new Object;
  ```

  

---



## 对象

- 对象

  JavaScript 对象是拥有属性和方法的数据。

- 定义

  可以使用字符来定义和创建 JavaScript 对象。（可以跨越多行）

  eg：

  ```
  var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
  ```

- 属性

  JavaScript 对象是键值对的容器

  写法：

  1. PHP 中的关联数组
  2. Python 中的字典
  3. C 语言中的哈希表
  4. Java 中的哈希映射
  5. Ruby 和 Perl 中的哈希表

- 访问对象属性

  1. 1

     ```
     person.lastName;
     ```

  2. 2

     ```
     person["lastName"];
     ```

- 对象方法

  1. 对象的方法定义了一个函数，并作为对象的属性存储。

  2. 对象方法通过添加 () 调用 (作为一个函数)。

     eg：

     ```
     name = person.fullName();
     ```

- 访问对象方法

  语法

  eg:

  ```
  创建：
  methodName : function() {
      // 代码 
  }
  访问：
  objectName.methodName()
  ```

  











