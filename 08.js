function keyBy(array, key) {
  var result = {}
  array.forEach((ary) => (result[ary[key]] = key))
  return result
}

function groupBy(array, prop) {
  var result = {}
  array.forEach((ary) => {
    var key = ary[prop]
    if (!(key in result)) {
      result[key] = []
    }

    result[key].push(ary)
  })
  return result
}
// console.log(grouped);
function groupBy3(ary, by) {
  var f = by
  if (typeof by == 'string') {
    f = (item) => item[by]
  }
  var result = {}
  ary.forEach((item) => {
    var key = f(item)

    if (!(key in result)) {
      result[key] = []
    }
    result[key].push(item)
  })
  return result
}

function bind(f, ...fixedArgs) {
  return function (...args) {
    return f(...fixedArgs, ...args)
  }
}

function bind(f) {
  var fixedArgs = Array.from(arguments).slice(1)
  return function () {
    var args = Array.from(arguments)
    return f.apply(null, fixedArgs.concat(args))
  }
}
function add(a, b, c) {
  return a + b + c
}
f2 = bind(add, 1)

function map(ary, mapper) {
  //reduce实现map
  return ary.reduce((acc, cur) => {
    acc.push(mapper(cur))
    return acc
  }, [])
}

function filter(ary, test) {
  return ary.reduce((acc, cur, idx, ary) => {
    if (test(cur, idx, ary)) {
      acc.push(cur)
    }
    return acc
  }, [])
}

function forEach(ary, action) {
  ary.reduce((_, cur, idx, ary) => action(cur, idx, ary))
}

//数组降维
function flatten(ary) {
  return ary.reduce((acc, cur) => acc.concat(cur), [])
}

//reduce 实现groupby
function groupby(ary, prec) {}

//every,测试是否每一项都满足条件,像&&；
//一旦一个为假，返回false，提前结束，不一定需要处理所有元素
FIXME: function every(array, test) {
  for (let i = 0; i < array.length; i++) {
    if (!test(array(i))) {
      return false
    }
  }
  return true
}

function every(array, con) {
  array.reduce((acc, cur, idx, array) => {
    return acc && con(cur, idx, ary) //也是短路特性
  }, true)
}
//some,测试是否至少有一项满足条件
//一旦一个为真，返回true，提前结束，不需要处理所有元素

function every(array, test) {
  return some(array, test)
}
//every与some互相实现

function bind(f, ...fixedArgs) {
  //null表示跳过,[1,null,2,null,3]
  return function (...args) {
    var temp = fixedArgs.slice()
    let j = 0
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] === null) {
        temp[i] = args[j++]
      }
    }
    while (j < args.length) {
      temp.push(args[j++])
    }

    return f(...temp)
  }
}

function curry(func, n) {
  return function (...args) {
    if (args.length < n) {
      return curry(func, n - args.length)
    }
    return func.bind(null, args)
  }
}

function identity(...args) {
  return args[0]
}

function createTreeNode(val) {
  //创建一个值为val的节点
  return {
    val: val,
    left: null,
    right: null,
  }
}

function array2Tree(ary, i = 0) {
  //将用数组表示的二叉树转换为链式表达的二叉树
  //将数组中根节点为 i 位置的树转换为链式表达
  // if(i >= ary.length){
  //   return null
  // }
  if (ary[i] == null) {
    return null
  }
  var root = createTreeNode(ary[i])
  root.left = array2Tree(ary, 2 * i + 1)
  root.right = array2Tree(ary, 2 * i + 2)
  return root
}

function tree2Arraytest(root, array = [], idx = 0) {
  //链式表达二叉树转换为数组表达
  //FIXME:
  if (root == null) {
    return array
  }
  array.push(root.val)
  var left = root.left
  var right = root.right
  left = tree2Array(left)
  right = tree2Array(right)
  array.push(left)
  array.push(right)
  return array
}

function tree2Array(root, ary = [], idx = 0) {
  if (root == null) {
    return
  }
  ary[idx] = root.val
  tree2Array(root.left, ary, idx * 2 + 1)
  tree2Array(root.right, ary, idx * 2 + 2)
  return ary
}

function tree2CondArray(root) {
  //将二叉树转换为紧凑型表示的数组
  //不理解哇
  if (!root) {
    return []
  }
  var res = []
  var nodes = [root]
  var nextRow = []
  while (nodes.length) {
    for (let i = 0; i < nodes.length; i++) {
      var node = nodes[i]
      if (node == null) {
        res.push(null)
      } else {
        res.push(node.val)
        nextRow.push(node.left)
        nextRow.push(node.right)
      }
    }
    nodes = nextRow
    nextRow = []
  }

  return res
}

function tree2CondArray1(root) {
  //将二叉树转换为紧凑型表示的数组
  if (!root) {
    return []
  }
  var res = []
  var nodes = [root]
  var i = 0
  while (i < nodes.length) {
    var node = nodes[i++]
    if (node == null) {
      res.push(null)
    } else {
      res.push(node.val)
      nodes.push(node.left)
      nodes.push(node.right)
    }
  }

  return res
}

function tree2CondArray2(root) {
  //将二叉树转换为紧凑型表示的数组
  if (!root) {
    return []
  }
  var res = []
  var nodes = [root]

  while (nodes.length) {
    var node = nodes.shift()
    if (node == null) {
      res.push(null)
    } else {
      res.push(node.val)
      nodes.push(node.left)
      nodes.push(node.right)
    }
  }

  return res
}

function tree2CondArray3(root) {
  //层次遍历
  FIXME: if (!root) {
    return []
  }
  var res = [root.val]
  var nodes = [root]

  while (nodes.length) {
    var node = nodes.shift()
    if (node == null) {
      res.push(null)
    } else {
      res.push(node.val)
      nodes.push(node.left)
      nodes.push(node.right)
    }
  }

  return res
}

function conArray2Tree(array) {
  //紧凑型数组二叉树转化为链式结构
  if (array.length == 0) {
    return null
  }
  var root = createTreeNode(ary[0])
  var queue = [root]
  for (let i = 0; i < array.length; i++) {
    var node = queue.shift()
    if (array[i] !== null) {
      node.left = createTreeNode(array[i])
      queue.push(node.left)
    }
    i++
    if (i > array.length) {
      break
    }
    if (array[i] !== null) {
      node.right = createTreeNode(array[i])
      queue.push(node.right)
    }
  }

  return root
}
var a = array2Tree([0, 1, 2, 3, 4, 5, 6, undefined, 9, 8, undefined])
var b = {
  val: 0,
  left: {
    val: 1,
    left: { val: 3, left: null, right: { val: 9, left: null, right: null } },
    right: { val: 4, left: { val: 8, left: null, right: null }, right: null },
  },
  right: {
    val: 2,
    left: { val: 5, left: 7, right: null },
    right: { val: 6, left: null, right: null },
  },
}

//断点
function preorderTraverseLoop(root, action = console.log) {
  //循环实现前序遍历
  //空间复杂度：树的深度
  var stack = []
  while (true) {
    if (root) {
      action(root.val)
      stack.push(root)
      root = root.left
    } else if (stack.length) {
      root = stack.pop()
      root = root.right
    } else {
      break
    }
  }
}

//TODO:不使用栈，如何实现一个前序遍历，通过一个指针
function inorderTraversal(root) {
  var stack = []
  while (true) {
    if (root) {
      stack.push(root)
      root = root.left
    } else if (stack.length) {
      root = stack.pop()
      console.log(root.val)
      root = root.right
    } else {
      break
    }
  }
}

function inorder(tree) {
  //①：先沿左侧全部入栈；root定位到最左侧的小树，pop->res,
  //②：root变为栈里面pop的右子树(左边第一颗小树的right)，right存在，right进栈；重复①
  //③：重复②
  var res = []
  var stack = []
  var node = tree
  while (node) {
    stack.push(node)
    node = node.left
  }
  while (stack.length > 0) {
    var spop = stack.pop()
    res.push(spop.val)

    node = spop.right //向右移一个node

    while (node) {
      stack.push(node)
      node = node.left
    }
  }
  return res
}

function postorderTraversal(root) {}

function insertIntoBST(bst, val) {
  //向BST插入值val,并返回bst
  if (bst == null) {
    return createTreeNode(val)
  }
  if (val > bst.val) {
    bst.right = insertIntoBST(bst.right, val)
  } else {
    bst.left = insertIntoBST(bst.left, val)
  }
  return bst
}
function insertIntoBST2(bst, val) {
  //不使用递归
  if (bst == null) {
    return createTreeNode(val)
  }
  var p = bst
  while (true) {
    if (val < p.val) {
      if (p.left) {
        p = p.left
      } else {
        p.left = createTreeNode(val)
        break
      }
    }

    if (val > p.val) {
      if (p.right) {
        p = p.right
      } else {
        p.right = createTreeNode(val)
        break
      }
    }
  }
  return bst
}
function bstSort(ary) {
  //乱序数组，用BST排序
  //时间复杂度：n*log(n)
  //空间复杂度：n(构造出来的BST占用的空间)
  var tree = null
  for (let i = 0; i < ary.length; i++) {
    tree = insertIntoBST(tree, ary[i])
  }

  return inorderTraverse(tree)
}

function bstSort2(ary) {
  //乱序数组，构建BST
  //简化 reduce
  var tree = ary.reduce((tree, val) => {
    return insertIntoBST(tree, val)
  }, null)
  return inorderTraverse(tree)
}

function swap(ary, i, j) {
  if (i !== j) {
    var temp = ary[i]
    ary[i] = ary[j]
    ary[j] = temp
  }
}
function qsort(ary, start = 0, end = ary.length - 1) {
  var pivotindex = Math.floor((end - start + 1) * Math.random()) + start
  var pivot = ary[pivotindex]
  swap(ary, pivotindex, end)
  var i = start - 1

  for (var j = start; j < end; j++) {
    if (ary[j] < pivot) {
      i++
      swap(ary, i, j)
    }
  }
}

//bst改成接函数排序

//6666666-----------------------
var MOUNTAINS = [
  { name: 'Kilimanjaro', height: 5895, country: 'Tanzania' },
  { name: 'Everest', height: 8848, country: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, country: 'Japan' },
  { name: 'Mont Blanc', height: 4808, country: 'Italy/France' },
  { name: 'Vaalserberg', height: 323, country: 'Netherlands' },
  { name: 'Denali', height: 6168, country: 'United States' },
  { name: 'Popocatepetl', height: 5465, country: 'Mexico' },
]

if (typeof module != 'undefined' && module.exports) module.exports = MOUNTAINS


var map = {}
function storePhi(event, phi) {
  map[event] = phi
}

storePhi('pizza', 0.069)
storePhi('touched tree', -0.081)

function rowHeights(rows) {
  //最小行高的最大值
  return rows.map(function (row) {
    return row.reduce(function (max, cell) {
      return Math.max(max, cell.minHeight())
    }, 0)
  })
}

function colWidths(rows) {
  //每列最小宽度的最大值
  return rows[0].map(function (_, i) {
    return rows.reduce(function (max, row) {
      return Math.max(max, row[i].minWidth())
    }, 0)
  })
}

function drawTable(rows) {
  var heights = rowHeights(rows)
  var widths = colWidths(rows)
//这个宽和高刚刚包裹好所有内容
  function drawLine(blocks, lineNo) {
    return blocks
      .map(function (block) {
        return block[lineNo]
      })
      .join(' ')
  }

  function drawRow(row, rowNum) {
    var blocks = row.map(function (cell, colNum) {
      return cell.draw(widths[colNum], heights[rowNum])
    })
    return blocks[0]
      .map(function (_, lineNo) {
        return drawLine(blocks, lineNo)
      })
      .join('\n')
  }

  return rows.map(drawRow).join('\n')
}

function repeat(string, times) {
  var result = ''
  for (var i = 0; i < times; i++) result += string
  return result
}

function TextCell(text) {
  this.text = text.split('\n')
}
TextCell.prototype.minWidth = function () {
  return this.text.reduce(function (width, line) {
    return Math.max(width, line.length)
  }, 0)
}
TextCell.prototype.minHeight = function () {
  return this.text.length
}
TextCell.prototype.draw = function (width, height) {
  var result = []
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || ''
    result.push(line + repeat(' ', width - line.length))
  }
  return result
}

function UnderlinedCell(inner) {
  this.inner = inner
}
UnderlinedCell.prototype.minWidth = function () {
  return this.inner.minWidth()
}
UnderlinedCell.prototype.minHeight = function () {
  return this.inner.minHeight() + 1
}
UnderlinedCell.prototype.draw = function (width, height) {
  return this.inner.draw(width, height - 1).concat([repeat('-', width)])
}

function RTextCell(text) {
  TextCell.call(this, text)
}
RTextCell.prototype = Object.create(TextCell.prototype)
RTextCell.prototype.draw = function (width, height) {
  var result = []
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || ''
    result.push(repeat(' ', width - line.length) + line)
  }
  return result
}

function dataTable(data) {
  var keys = Object.keys(data[0])
  var headers = keys.map(function (name) {
    return new UnderlinedCell(new TextCell(name))
  })
  var body = data.map(function (row) {
    return keys.map(function (name) {
      var value = row[name]
      // This was changed:
      if (typeof value == 'number') return new RTextCell(String(value))
      else return new TextCell(String(value))
    })
  })
  return [headers].concat(body)
}

function Instance(obj, Cont) {
  var buffer = obj.__proto__
  while (buffer.constructor !== Count) {
    buffer = buffer.__proto__
  }
  return true
}
function New(Cont, ...args) {
  var obj = Object.create(Cont.prototype)
  var ret = Cont.call(obj, ...args)
  if (ret && typeof ret === 'object') {
    return ret
  } else {
    return obj
  }
}

function Vector(x, y) {}
