// 全局定义数组删除
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
Array.prototype.lastObject = function () {
  if (this.length > 0) {
    return this[this.length - 1];
  } else {
    return null;
  }
};

// 添加数组
Array.prototype.addArray = function (val) {
  val.forEach((e) => {
    this.push(e);
  });
};

// 替换数组内所有元素
Array.prototype.relaceAll = function (val) {
  this.splice(0, this.length);
  val.forEach((e) => {
    this.push(e);
  });
};
