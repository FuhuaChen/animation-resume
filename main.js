let css1 = `
/*大家好，我是陈富华，今天我以代码的形式来简单介绍一下自己。
 *首先我们准备一些样式
 */
 *{transition: all .5s;}
 
 /*背景颜色太单调了，我们加上背景*/
 body{
    background: #F5F2F0;
 }
 
 /*文字都快跑出去了，加个边框吧*/
 #code{ 
    border: 1px solid #aaa;
    position:fixed;left:0;top:0;
    width: 45vw;
    height: 90vh;
    padding: 20px;
    margin: 20px 10px;
    overflow: auto;
 }
 
 /*代码高亮一下吧*/
 .token.selector{
    color: #690;
 }
 .token.property,
 .token.number{
    color: #905;
 }
 .token.function{
    color: #DD4A68;
 }
 
 /*来点3D效果吧*/
 html{
    perspective: 1000px;
 }
 #code{
    transform: translate(50px) rotateY(10deg);
 }
 
 /*好了下面我来自我介绍一下吧，首先我需要一张纸*/
`

let css2 = `
 #paper{
    position:fixed;right:0;top:0;
    border: 1px solid #aaa;
    width: 45vw;
    height: 90vh;
 }
 #paperContent{
    height:100%;
    overflow: auto;
 }
 
/*然后我们给它做一下对称吧*/
  #paper{
    padding: 20px;
    margin: 20px 10px;
    overflow: auto;
    transform: translate(-50px) rotateY(-10deg);
  }
  
/*好了，接下来可以安心写简历了，请看右边*/
`

let css3 = `
/*我们发现简历的格式有点太挫了，
 *接下来我们用marked这个库把markdown变成html吧。
 */
`

let css4 = `
/*简历差不多完成了*/
pre:hover{
    box-shadow: 0 0 40px 5px rgba(0,0,0,0.3);
}

/*这就是我的会动的简历，谢谢观看*/
`

let md = `
# 自我介绍

我叫陈富华，1992年7月出生，毕业于厦门华厦职业学院，自学前端半年，希望应聘前端开发岗位


# 技能介绍

熟悉JavaScript、css、html


# 项目介绍

1. [个人简历](https://fuhuachen.github.io/resume/index.html)
2. [canvas画板](https://fuhuachen.github.io/canvas-demo/index.html)
3. [书签导航](https://fuhuachen.github.io/myBookmarks/index)
4. [无缝轮播](https://fuhuachen.github.io/slides-demo2/index.html)


# 联系方式

- QQ:874166712
- Email:874166712@qq.com
- 手机：18060912511
`

writeCode('',css1, ()=>{
    createPaper(()=>{
        writeCode(css1,css2,()=>{
            writeMarkdown(md,()=>{
                writeCode(css1+css2,css3,()=>{
                    markdownToHtml(()=>{
                        writeCode(css1+css2+css3,css4)
                    })
                })
            })
        })
    })
})




function writeCode(prefix,code,fn) {
    let n = 0
    let domCode = document.querySelector('#code')
    let styleTag = document.querySelector('#styleTag')
    domCode.innerHTML = prefix || ''
    let id =setInterval(function () {
        n+=1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0,n), Prism.languages.css,'css')
        styleTag.innerHTML = prefix + code.substring(0,n)
        domCode.scrollTop = domCode.scrollHeight
        if(n>=code.length){
            clearInterval(id)
            fn && fn.call()
        }
    },50)
}

function createPaper(fn) {
    let paper = document.createElement('pre')
    let paperContent = document.createElement('pre')
    paper.id = 'paper'
    paperContent.id = 'paperContent'
    paper.appendChild(paperContent)
    document.body.appendChild(paper)
    fn && fn.call()
}


function writeMarkdown(content,fn) {
    let n = 0
    let paperContent = document.querySelector('#paperContent')
    let id =setInterval(function () {
        n+=1
        paperContent.innerHTML = content.substring(0,n)
        paperContent.scrollTop = paperContent.scrollHeight
        if(n>=content.length){
            clearInterval(id)
            fn && fn.call()
        }
    },50)
}

function markdownToHtml(fn) {
    let paperContent = document.querySelector('#paperContent')
    let div = document.createElement('div')
    div.innerHTML = marked(md)
    paperContent.replaceWith(div)
    fn && fn.call()
}