//Chapter 666666
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
    //画出一行,中间用空格连接
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

  return rows.map(drawRow).join('\n') //把所有行用换行符连到一起
}

function repeat(string, times) {
  var result = ''
  for (var i = 0; i < times; i++) result += string
  return result
}

function TextCell(text) {
  this.text = text.split('\n') //文本分成每一行
}
TextCell.prototype.minWidth = function () {
  return this.text.reduce(function (width, line) {
    return Math.max(width, line.length)
  }, 0) //字符串最大宽度
}
TextCell.prototype.minHeight = function () {
  return this.text.length
}
TextCell.prototype.draw = function (width, height) {
  //向每行文本填充空格
  var result = []
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || ''
    result.push(line + repeat(' ', width - line.length))
  }
  return result
}

var rows = []
for (var i = 0; i < 5; i++) {
  var row = []
  for (var j = 0; j < 5; j++) {
    if ((j + i) % 2) {
      row.push(new TextCell('##'))
    } else {
      row.push(new TextCell('  '))
    }
  }
  rows.push(row)
}

function UnderlinedCell(inner) {
  //首行添加下划线单元格
  this.inner = inner
}
UnderlinedCell.prototype.minWidth = function () {
  return this.inner.minWidth() //组合
}
UnderlinedCell.prototype.minHeight = function () {
  return this.inner.minHeight() + 1
}
UnderlinedCell.prototype.draw = function (width, height) {
  return this.inner.draw(width, height - 1).concat([repeat('-', width)])
}

function RTextCell(text) {
  //纯数字单元格,右对齐
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

//console.log(drawTable(dataTable(MOUNTAINS)));
//画出了首行下划线,字符左对齐,数字右对齐的表

function Instance(val, Cont) {
  if (val) {
    if (typeof val != 'object') {
      return false
    }
    if (val.__proto__ === Cont.prototype) {
      return true
    }
    Instance(val.__proto__, Cont)
  }
  return false
}

function New(F, ...args) {
  var obj = Object.create(F.prototype) //添加原型
  var fReturn = F.call(obj, ...args) //绑定this
  if (fReturn && typeof fReturn === 'object') {
    //如果F显式指定了返回值,返回这个
    return fReturn
  } else {
    return obj //返回这个新创建的对象
  }
}

//二维向量
function Vector(x, y) {
  this.x = x
  this.y = y
}
Vector.prototype.plus = function (other) {
  var res = new Vector(this.x + other.x, this.y + other.y)
  return res
}
Vector.prototype.minus = function (other) {
  var res = new Vector(this.x - other.x, this.y - other.y)
  return res
}
var v1 = new Vector(4, 0)
var v2 = new Vector(2, 2)
//console.log(v1.minus(v2))
Object.defineProperty(Vector.prototype, 'length', {
  get: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  },
})

//console.log(v1.length);

//StretchCell,把单元格放大
function StretchCell(inner, width, height) {
  this.inner = inner
  this.width = width
  this.height = height
}
StretchCell.prototype.minWidth = function () {
  return Math.max(this.width, this.inner.minWidth())
}
StretchCell.prototype.minHeight = function () {
  return Math.max(this.height, this.inner.minHeight())
}

StretchCell.prototype.draw = function (width, height) {
  return this.inner.draw(width, height)
}

var sc = new StretchCell(new TextCell('abc'), 1, 2)
//复数
function Complex(real, img) {
  this.real = real
  this.img = img
}

Complex.prototype.plus = function (c) {
  return new Complex(this.real + c.real, this.img + c.img)
}
Complex.prototype.minus = function (c) {
  return new Complex(this.real - c.real, this.img - c.img)
}
Complex.prototype.multiple = function (c) {
  return new Complex(
    this.real * c.real - this.img * c.img,
    this.img * c.real + this.real * c.img
  )
}
Complex.prototype.division = function (c) {
  var helper = new Complex(c.real, 0 - c.img)
  var down = c.multiple(helper)
  var up = this.multiple(helper)
  return new Complex(up.real / down.real, up.img / down.real)
}
Complex.fromString = function (string) {}
var c1 = new Complex(3, 7)

var c2 = new Complex(2, 5)
c2.division(c1)

//集合 MySet
function MySet(ary = []) {
  this.eles = []
  for (let a of ary) {
    this.add(a)
  }
  return this
}

MySet.prototype = {
  add(val) {
    if (!this.has(val)) {
      this.eles.push(val)
    }
    return this
  },
  delete(val) {
    if (this.has(val)) {
      for (var i = 0; i < this.eles, length; i++) {
        if (val === this.eles[i]) {
          this.eles.splice(i, 1)
          break
        }
      }
    }
    return this
  },
  get size() {
    return this.ele.length
  },
  has(val) {
    var eles = this.eles
    if (val !== val) {
      for (var i = 0; i < eles.length; i++) {
        if (eles[i] !== eles[i]) {
          return true
        }
      }
      return false
    } else {
      for (var i = 0; i < eles.length; i++) {
        if (val === eles[i]) {
          return true
        }
      }
      return false
    }
  },

  clear() {
    this.eles.length = 0
    return this
  },
}

// set.add(3) //{3}
// set.add(5) //{3,5}
// set.add(true) //{3,5,true}
// //不能重复添加相同的元素,去重
// set.size // 3
// set.has(3)
// set.delete(5)
// set.clear()
// new MySet([3, 56, 2]) //可以传递数组,注意去重
//映射 Map
function Mmp(init = '') {
  // m = new Mmp([[2, 3], [[1, 2, 3], 'bar'], ['gdf'], {}])
  this._keys = []
  this._values = []
  if (init.length == 2) {
    this.set(init)
  }
  if (Array.isArray(init)) {
    for (let i = 0; i < init.length; i++) {
      this.set(init[i][0], init[i][1])
    }
  }
}
Mmp.prototype = {
  _indexOfKey(k) {
    //返回下标,能处理nan
    if (k !== k) {
      for (let i = 0; i < this._keys.length; i++) {
        if (this._keys[i] !== this._keys[i]) {
          return i
        }
      }
    } else {
      for (let i = 0; i < this._keys.length; i++) {
        if (k === this._keys[i]) {
          return i
        }
      }
    }
    return -1
  },
  set(k, v) {
    if (!this.has(k)) {
      this._keys.push(k)
      this._values.push(v)
    } else {
      this._values[this._indexOfKey(k)] = v
    }

    return this
  },
  get(k) {
    return this._values[this._indexOfKey(k)]
  },
  delete(k) {
    var idx = this._indexOfKey(k)
    if (idx >= 0) {
      this._keys.splice(idx, 1)
      this._values.splice(idx, 1)
    }
    return this
  },
  has(k) {
    var idx = this._indexOfKey(k)
    return idx >= 0 ? true : false
  },
  clear() {
    this._keys.length = this._values.length = 0
  },
  get size() {
    return this._keys.length
  },
}

// m = new Mmp()
// m.set(2, 'bar') //{1 => "foo", 2 => "bar"}
// //数字,字符串,对象 => 字符串,数组,对象,任何值都可以映射,包括nan
// m.get(2) //"bar"
//m = new Mmp([  [2, 3],  [[1, 2, 3], 'bar'],  ['gdf', {}],])

//Bst 排序二叉树
function createTreeNode(val) {
  //创建一个值为val的节点
  return {
    val: val,
    left: null,
    right: null,
  }
}

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

function Bst(val = null) {
  if (val == null) {
    this.root = null
    return this.root
  }
  this.root = {}
  this.root.val = val
  this.root.left = null
  this.root.right = null
}

Bst.prototype.insert = function (val) {
  if (this.root == null) {
    return new Bst(val)
  }
  var node = this.root

  if (val > node.val) {
    node.right ? node.right.insert(val) : (node.right = new Bst(val))
  } else {
    node.left ? node.left.insert(val) : (node.left = new Bst(val))
  }
  return this
  // while (true) {
  //   if (val < node.val) {
  //     if (node.left) {
  //       node = node.left
  //     } else {
  //       node.left = new Bst(val)
  //       break
  //     }
  //   }

  //   if (val > node.val) {
  //     if (node.right) {
  //       node = node.right
  //     } else {
  //       node.right = new Bst(val)
  //       break
  //     }
  //   }
  // }
}

Bst.prototype.remove = function (target) {
  //先实现删除叶子节点
  var node = this
  node.left && node.left.remove(target)
  node.right && node.right.remove(target)
  return node.left === node.right && node.val === target ? null : node //是叶子节点把它变成null
}

var b = new Bst()
b.insert(2)
b.remove(3) //

