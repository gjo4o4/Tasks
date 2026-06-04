# CSS 3

## 响应式布局

> 在不同屏幕的分辨率下，用一套代码以最佳的方式进行展示web端，平板以及手机端网页，元素的宽度尺寸以及展示方式可能会改变。通常使用@media多媒体查询方式来实现响应式布局，



1. 流式布局

   使用相对单位（百分比）而非固定的像素值来定义元素宽度。

   ```css
   .container {
     //这里是比例而非固定的width：1200px
     width: 90%;
     max-width: 1200px;
     margin: 0 auto;
   }
   ```

   只适合用于简单的网页设计，如需要在不同屏幕上保持相同比例的设计。但是网页的字体大小，间距等问题就解决不了。在使用过程中需要注意百分比是相对于父元素的，这可能导致嵌套元素的计算变得复杂。

2. 媒体查询

   可以根据不同的设备特性（如屏幕宽度，高度，方向等）来应用不同的CSS样式。当浏览器和设备的环境是你所指定的时候对应的CSS才会被使用。

   ![图片](https://i-blog.csdnimg.cn/direct/463ae23d411b4b598ea61bc474dd9308.png)

   ```css
   //基础样式：适用于所有设备
   .navigation {
     disaplay: flex;
     flex-direction: column;
   }
   //平板以上设备
   @media (min-width: 768px) {
    .navigation {
      flex-direction: row;
    }
   }
   //大屏设备
   @media (min-width: 1200px) {
     .container {
       padding: 0 50px;
     }
   }
   ```

   适用于所有响应式网站，且使用率极高，适合需要在不同的断点有明显布局变化的设计。但是断点过多可能会导致代码崩掉。

   媒体类型：

   - all:所有设备
   - print:用于打印机和打印浏览
   - screen:用于电脑屏幕，平板，手机屏幕
   - speech:用于屏幕阅读器等发声设备

3. 弹性盒子

   弹性盒子是CSS的一种新的布局模式。适合一维布局。可以在适应不同的屏幕大小以及设备类型时确保元素拥有恰当的行为。提供一种更加有效的方式来对一个容器中的子元素进行排列、对齐和分配空白空间。

   ```css
   .container {
     display: flex;
     flex-wrap: wrap;
     justify-content: space-between;
   }
   .item {
   //增长，收缩，基础宽度
     flex: 1 1 300px;
     margin: 10px;
   }
   @media (max-width: 600px) {
     .item {
   //在小屏幕上沾满整行
       flex: 1 1 100%;
     }
   }
   ```

   适用于导航菜单，卡片列表，居中对齐等场景。但是复杂的嵌套的flex容器可能出现问题

4. 网格布局

   网格是一组相交的水平线和垂直线，它定义了网格的列和行。CSS 提供了一个基于网格的布局系统，带有行和列，更适合二维布局。可以让我们在设计网页，无需使用浮动和定位。

   - 当设置为grid 或 inline-grid 后，它就变成了一个网格容器，这个元素的所有直系子元素就成为网格元素。

   - 网格轨道：grid-template-columns 和 grid-template-rows 属性来定义网格中的列和行。
   - fr单位：轨道可以使用任何长度单位进行定义。网格引入了fr 单位来帮助我们创建灵活的网格轨道。一个 fr 单位代表网格容器中可用空间的一等份。
   - 网格单元：是在一个网格元素中最小的单位。 一旦一个网格元素被定义在一个父级元素当中，那么他的子级元素将会排列在每个事先定义好的网格单元中。
   - 网格线：列与列，行与行之间的交接处就是网格线。Grid 会为我们创建编号的网格线来让我们来定位每一个网格元素。

   ```css
   .grid-container {
     display: grid;
     grid-template-columns: repeat(auto-fill,minmax(250px,1fr));
     gap: 20px;
   }
   @media (max-width: 768px) {
     .grid-container {
     //在移动设备上变成单列
       grid-template-columns: 1fr;
     }
   }
   ```

   适用于复杂的页面布局，图片，杂志风格布局，仪表盘等需要精确控制二维空间的场景。

5. Viewport单位

   vm,vh,vmin,vmax提供了相对于视口尺寸的大小设置方式，是创建响应式设计的有力工具。

   ```css
   .hero {
   //视口高度的80%
     height: 80vh;
   //视口高度的5%  
   }
   .responsive-text {
   //基础大小+相对增量
      font-size: calc(16px + 1vw);
   }
   ```

   适用于全屏英雄区域，响应式字体大小，需要相对于视口比例缩小的元素。在极大或者极小的屏幕上可能需要设置最小或者最大的限制，防止元素过小或者过大。

6. CSS函数

   clamp(),min(),max()这些函数提供了更智能的尺寸控制。

   ```css
   .container {
   //
     width: clamp(500px,80%,1200px);
   }
   .responsive-padding {
   //
     padding: max(10px,3vw);
   }
   .responsive-font {
   //
     font-size: clamp(16px,1rem + 2vw.24px)
   }
   ```

   适用于不同屏幕尺寸间平滑过渡的任何元素，特别是文本大小，容器宽度和边距。

7. 响应式图片技术

   图片通常是网页中最大的资源，优化他们对响应式性能至关重要。

   ```css
   //基础
   <img src="image-medium.jpg" alt="描述" style="max-width: 100%;height: auto;">
   //高级
   <picture>
     <source srcset="iamge-large.webp" media="(min-width: 1200px)"type="iamge/webp">
     <source srcset="iamge-media.webp" media="(min-width: 768px)"type="iamge/webp">
     <source srcset="iamge-small.webp" type="iamge/webp">
   //后备
   <img src="image-medium.jpg"alt="描述" style="max-width: 100%;">
   </picture>
   ```

   适用于任何包含图片的响应式网站。特别是图片密集型网站比如电商等。但要确保提供适当的格式与分辨率，

8. 容器查询

   容器查询是响应式的未来，它允许基于父容器的大小应用样式。

   ```css
   // 定义一个查询的容器
   .card-container {
     container-type: inline-size;
     container-name: card;
   }
   // 根据容器宽度应用样式
   @container card (max-width: 400px) {
     .card-title {
       font-size: 1rem;
     }
     .card-image {
       display: none
     }
   }
   
   ```
   

​         	适用于在不同布局上下文中保持响应性的元素。

## 媒体查询

@media规则可以针对不同媒体类型（显示器，便携设备，电视机...）可以定制不同的样式规则。

它可以用来检测很多东西：

- viewport（视窗）的宽度与高度
- 设备的宽度与高度
- 朝向（横屏竖屏...）
- 分辨率

核心语法：

多媒体查询由多种媒体组成，可以包含一个或多个表达式，表达式根据条件是否成立返回` true` 或` false`。

媒体类型+媒体特性+要应用的样式

```css
//基础语法
@media [媒体类型] and [媒体特性] {
//满足条件时生效的css样式
选择器 {
  属性： 值；
}
}
```

1. 媒体类型 (可选):指定样式应用的设备，常用值：

   | 值     | 描述                                 |
   | :----- | :----------------------------------- |
   | all    | 用于所有多媒体类型设备               |
   | print  | 用于打印机&打印预览模式              |
   | screen | 用于电脑屏幕，平板，智能手机等。     |
   | speech | 用于基于语音识别，屏幕阅读器等的设备 |

   主要作用是根据设备的类型来应用不同的样式规则，使得网站或网页能在不同设备上有良好的显示效果。

   ```css
   //适用于打印机或者打印预览模式的，其所定义的样式将会在打印界面中生效
   @media print {
       body { font-size: 10pt; }
   }
   //适用于电脑屏幕和智能手机等，其所定义的样式将会在这些设备的显示界面中生效
   @media screen {
       body { font-size: 13px; }
   }
   //同时适用
   @media screen,print {
       body { line-height: 1.2; }
   }
   ```

2. 媒体特性（必选）

   | 值                           | 描述                        |
   | :--------------------------- | :-------------------------- |
   | width/min-width/max-width    | 视口宽度（最常用）          |
   | height/min-height/max-height | 视口高度                    |
   | orientation                  | 横竖屏（landscape/portait） |
   | aspect-ratio                 | 视口宽高比                  |

   - `width`&`height`:主要用于描述设备显示区域的宽度和高度，可以用来调整设备下的网页布局。

     ```css
     @media sscreen and (max-width: 600px) { 
         body {
             background-color: lightblue;
         }
     } 
     //当设备屏幕宽度小于等于600px时，网页背景颜色边为浅蓝色
     ```

   - `orientation`:描述设备的方向，值可以是`landscape`(横屏)/`portrait`（竖屏）

     ```css
     @media screen and (orientation: portrait) {
         body {
               font-size: 1
         }
     }
     //当设备处于竖屏时，网页字体变为1.2em
     ```

   - `device-width/height`:用于描述设备的物理尺寸。

     ```css
     @media screen and(min-device-width: 1200px) {
         body {
            margin：0 auto；
            width：1200px；
         }
     }
     //若设备的物理屏幕宽度大于或等于1200px，网页主题将居中显示，平且宽度恒定为1200px
     ```

   - `resolution`：描述设备的分辨率

     ```css
     @media print and (min-resolution: 300dpi) {
        body {
            font-size: 12pt;
        }
     }
     //如果设备的打印分辨率至少为300dot per inch，网页字体变为12pt
     ```

   - aspect-ratio & device-aspect-ratio:描述显示区域的宽高比&描述设备物理屏幕的宽高比

     ```css
     @media screen and (aspect-redio: 16/9) {
        body {
            background: ur1('widescreen-bg.jpg'); 
        }
     }
     //如果设备的显示区域的宽高比是16：9，那么网页背景图设为widescreen-bg.jpg
     ```

3. 逻辑运算符 （可选） 

   - 运算符

     1. `and`：使用`and`操作符时可以同时匹配多个条件

        ```css
        @media screen and (min-width: 768px) and (max-width: 1024px) {
             xxx
        }
        //只有在屏幕宽度在768px和1024px之间才会应用这些规则
        ```

     2. `or`：使用 or 操作符可以匹配其中一个条件

        ```css
        @media (color) or (color-index) {
              xxx
        }
        //上面的代码只要设备支持颜色或颜色索引，就会应用这些规则。
        ```

     3. `not`：使用 not 操作符可以排除某个条件

        ```css
        @media not screen {
             xxx
        }
        //只有在非屏幕的设备上才会应用这些规则
        ```

     4. `only`：使用`only`操作符，可以隐藏样式表不会被旧的浏览器应用。这是因为老的浏览器不支持媒体查询，它们会忽略`only`关键字和后面的所有表达，而新的浏览器会把它作为普通的媒体查询来处理

        ```css
        @media only screen and (min-width: 600px) {
           sidebar {
             display: block;
           }
        }
        //只有设备类型为屏幕并且视口的最小宽度为600px时，侧边才显示，并且这个样式只会被支持媒体查询的·浏览器应用。
        ```

   - 一些设计

     1. 在移动端和桌面端显示不同的导航菜单

        ```css
        @media screen and (max-width: 768px) {
         //移动端
            .menu {
                display: none;
            }
            .mobile-menu {
                display: block;
            }
        }
        
        @media screen and (min-width: 768px) {
         //桌面端
            .menu {
                display: block;
            }
            .mobile-menu {
                display:none;
            }
        }
        ```

     2. 根据屏幕大小和朝向应用不同的背景

        ```css
        @media screen and (orientation: portrait) {
            .bg-image {
              background-image: url(portrait.jpg);
            }
        }
        
        @media screen and (orientation: landscape) {
           .bg-image: url(landscape.jpg)
        }
        ```

4. 其他媒体查询引入方式-`link`

   - ```html
     <link rel="stylesheet" media="(max-width: 768px)" href="example.css">
     ```

     在浏览器视口宽度小于或等于768px时，应应用`example.css`样式表

   - 注意！

     1. 应放置在`head`标签内部
     2. 有可能因为浏览器的原因，会无视`media`特性并加载样式表
     3. 尽量只使用一个css文件
     4. 媒体查询的条件必须包含在media属性里。基于设备特征的媒体查询如空格，冒号，括号等，需使用引号

5. 相应断点设置

   媒体查询的响应断点 的阈值设定通常是基于常见设备的屏幕尺寸进行设定的，但无固定标准，主要看项目需求和目标用户的设备种类。

   常见设备断点：

   - 小于 768px: 适用于手机及小屏设备。
   - 768px 至 1024px: 适用于平板电脑和小屏电脑设备。
   - 大于 1024px: 适用于大屏电脑和电视等设备。

6. 注意事项 

## Flex布局

`Flex`是`FlexibleBox`的缩写，意思为"弹性盒子"。`Flex`布局可轻松控制子元素的排列、对齐、分布，避免浮动和定位带来的的麻烦。`Flex`布局可以凭借灵活的空间分配和对齐能力，应用于各类一维布局场景：元素的水平/垂直居中，导航栏的均匀分配，卡片列表的自适应换行，侧边栏与主内容的布局...都能高效的解决问题。尤其非常适配于响应式设计

- 基本概念

  ![基本概念](https://i-blog.csdnimg.cn/blog_migrate/9a0ef4391ddbe39af2c40ec6e2535530.png)

  1. 容器（`Container`）：应用`display`：`flex`/`inline-flex`的父元素
  2. 项目（`Items`）：容器内的直接子元素，会自动成为弹性项
  3. 主轴（`Main Axis`）（x轴）：项目排列的主要方向（默认水平从左到右）
     - 主轴开始的位置(`main start`)：与边框的交叉点
     - 主轴结束的位置(`main end`)
     - 单个项目中占据的主轴空间：`main size`
  4. 交叉轴（`Cross Axis`）(y轴)：与主轴垂直的方向（摩恩垂直从上到下）
     - 交叉轴开始的位置（`cross start`）
     - 交叉轴结束的位置（`cross end`）
     - 单个项目占据的交叉轴的空间：`cross size`

- 使用语法

  

- 容器属性（作用于父元素）

  1. `display`:`flex`/`inline-flex`:开启flex布局

     定义容器为弹性容器，子元素自动变为弹性项

     - `flex`：容器为块级元素
     - `inline-flex`:容器为行内元素
     - 未使用`flex`

     ![](https://i-blog.csdnimg.cn/direct/963cf1aa1c3c4b7b9ae8eb70299983fa.png)

  2. `flex-direction`:设置主轴方向

     - `row`:主轴为横轴，元素**默认**由左向右排列

     - `row-reveerse`:主轴为横轴，元素由右向左排列

     - `colume`:主轴为纵轴，元素由上至下排列

     - `column-reverse`:主轴为纵轴，元素由下至上排列

       ![2](https://i-blog.csdnimg.cn/direct/84e8305fd92e490aa8995e7de88c21ec.png)

  3. `flex-wrap`:控制元素是否换行

     - `nowrap`:**默认**不换行，元素可能被压缩

     - `wrap`:换行，第一行在上方

     - `wrap-reverse`:换行，第一行在下方

       ![3](https://i-blog.csdnimg.cn/direct/02a43cb3f4e5497dafb8a4ef736373fb.png)

  4. `flex-flow`:`flex-direction` + `flex-wrap` 的简写

     语法:

     ```
     .box {
       flex-flow: <flex-direction><flex-wrap>
     } 
     ```

     ![](https://i-blog.csdnimg.cn/direct/cfb08a12fd594a06bab998509546e830.png)

  5. `justify-content`:主轴上的对齐方式

     - `flex-start`:**默认** 左对齐（主轴起点）
     - `flex-end`:右对齐（主轴终点）
     - `center`:居中对齐
     - `space-between`:两端对齐，项目间距相等
     - `space-around`:项目两侧间距相等（总间距是项目间间距的2倍）
     - `space-evenly`:项目间距和边缘间距完全相等

     ![](https://i-blog.csdnimg.cn/direct/aca5e9a729a241c786543932ed6eb134.png)

  6. `align-items`:主轴上的对齐方式

     - `stretch`((默认)：项目拉伸填满交叉轴
     - `flex-start`:交叉轴起点对齐
     - `flex-end`:交叉轴终点对其
     - `center`:交叉轴居中对齐
     - `baseline`:项目基线（文字底部）对齐

     ![](https://i-blog.csdnimg.cn/direct/e8b92b8b417d4cf4a0ce5174797c2d02.png)

  7. `align-content`:交叉轴上的对齐方式（单行）

     - `stretch`(默认)：多行拉伸填满交叉轴
     - `flex-start`:多行靠交叉轴起点对齐
     - `flex-end`:多行靠交叉轴终点对齐
     - `center`:多行居中对齐
     - `space-between`:多行两端对齐。行间距相等
     - `space-around`:多行两侧间距相等

     ![](https://i-blog.csdnimg.cn/direct/ee010c99d2094023ae5dc42d64aeda50.png)

- 项目属性（作用于子元素）

  1. `order`:控制项目排列顺序

     默认值为0，越小越靠前（可为负数）

     eg：order：-1；

  2. `flex-grow`:项目的拉伸比例（分配剩余空间）

     默认为0（不拉伸），数越大，占比越大

     eg：如果两个项目分别设置为：1和：2，则剩余空间按1：2分配

  3. `flex-shrink`:项目的收缩比例（空间不足时）

     默认为1（允许收缩），0表示不收缩

  4. `flex-basis`:项目在主轴上的初始尺寸

     默认为auto（项目自身尺寸），可设置具体值（如200px，50%）

  5. `flex`:`flex-grow`+`flex-shrink`+`flex-basis`的缩写

     常用：

     - `flex`: 0 1 auto (默认)  : 不拉伸，可收缩，尺寸自动
     - `flex`: 1 ：等价于 1 1 0% ：自适应拉伸和收缩
     - `flex`: none :等价于 0 0 auto ：不拉伸，不收缩

  6. `align-self`:单个项目的交叉轴对齐方式（覆盖容容器的align-items）

     取值同 `align-items`：`stretch`、`flex-start`、`flex-end`、`center`、`baseline`。

     eg：

     ```html
     align-self：flex-end
     ```

- 常见应用场景

  1. 水平/垂直居中:容器设置 `justify-content: center` /`align-items: center`
  2. 自适应布局：`flex=1`自动分配空间
  3. 导航栏排列：水平分布或者垂直堆叠
  4. 响应式换行：`flex-wrap: wrap`可实现项目在小屏幕自动换行

- 注意！

  1. Flexbox 是一维布局（一次处理一行或一列）。
  2. 项目默认不换行，需设置 `flex-wrap: wrap`。
  3. 主轴和交叉轴方向可通过 `flex-direction` 切换，影响所有对齐属性。

## Gird布局

- ...

  

## Flex VS Gird布局

- 

- | 特性           | Flexbox                | Grid                   |
  | :------------- | :--------------------- | :--------------------- |
  | **布局维度**   | 一维                   | 二维                   |
  | **最佳场景**   | 组件内部布局、线性排列 | 整体页面结构、复杂网格 |
  | **内容适配**   | 内容驱动               | 容器驱动               |
  | **代码复杂度** | 简单                   | 较高                   |
  | **浏览器支持** | 更广泛                 | 较新                   |