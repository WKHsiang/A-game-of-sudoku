// 初始化九宫格

function init() {

    var boxArr = []
    var $d = document.getElementsByClassName("game-wrap")[0]

    // 构造九宫格框架参数函数
    function Sudoku(width, height, rows, cols) {
        this.width = width
        this.height = height
        this.rows = rows
        this.cols = cols
    }
    // 构造内部盒子函数
    function Box(width, height, x, y) {
        this.width = width
        this.height = height
        this.left = x * width
        this.top = y * height
        this.backgroundLeft = this.left
        this.backgroundTop = this.top
    }

    var sudoku = new Sudoku(800, 800, 4, 4)

    // 设置九宫格框架样式
    function setWrapStyle() {
        $d.style.position = 'relative'
        $d.style.margin = '50px auto 0'
        $d.style.width = sudoku.width + 'px'
        $d.style.height = sudoku.height + 'px'
        $d.style.border = '3px solid #999'
    }

    // 设置内部九个盒子
    function setInnerBoxes() {
        for (var i = 0; i < sudoku.rows; i++) {
            for (var j = 0; j < sudoku.cols; j++) {
                var box = new Box(sudoku.width / sudoku.cols, sudoku.height / sudoku.rows, j, i)
                boxArr.push(box)
            }
        }
    }

    // 创建盒子div并将其属性赋予boxArr内的数据
    function createBoxDiv() {
        boxArr.forEach(function (item, index) {
            var div = document.createElement('div')
            var divAttr = document.createAttribute('class')
            divAttr.value = 'box'
            div.setAttributeNode(divAttr)
            div.style.position = 'absolute'
            div.style.left = item.left + 'px'
            div.style.top = item.top + 'px'
            div.style.width = item.width + 'px'
            div.style.height = item.height + 'px'
            div.style.border = '1px solid #fff'
            div.style.boxSizing = 'border-box'
            div.style.background = `url('img/bg.jpg') ${-item.backgroundLeft}px ${-item.backgroundTop}px`
            div.style.cursor = 'pointer'
            if (index == boxArr.length - 1) {
                div.style.display = 'none'
            }
            $d.appendChild(div)
        })
    }

    // 随机内部盒子位置
    function randomBoxes() {
        // 将数组顺序打乱
        randomBoxArr()
        // 按顺序设置arr的left、top值
        setLeftAndTop()
    }

    // 打乱数组顺序
    function randomBoxArr() {
        boxArr.sort(function (a, b) {
            return Math.random() - 0.5
        })
    }

    // 设置left & top
    function setLeftAndTop() {
        let cIndex = 0
        for (var i = 0; i < sudoku.rows; i++) {
            for (var j = 0; j < sudoku.cols; j++) {
                boxArr[cIndex].left = sudoku.width / sudoku.cols * j
                boxArr[cIndex].top = sudoku.height / sudoku.rows * i
                cIndex++
            }
        }
    }

    // 设置容器样式
    setWrapStyle()
    // 设置内部盒子
    setInnerBoxes()
    // 打乱盒子顺序
    randomBoxes()
    // 将盒子渲染
    createBoxDiv()
}

init()