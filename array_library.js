function take(arr, n) {
  var newArr = [];
  var amount = n;
  if (n > arr.length) {
    amount = arr.length;
  }
  for (var i = 0; i < amount; i++) {
    newArr[i] = arr[i];
  }
  return newArr;
}


function skip(arr, n) {
  var newArr = [];
  if (n > arr.length) {
    return newArr;
  }
  for (var i = n, j = 0; i < arr.length; i++, j++) {
    newArr[j] = arr[i];
  }
  return newArr;
}

function map(arr, callback) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    newArr[i] = callback(arr[i], i, arr);
  }
  return newArr;
}

function reduce(arr, callback, initialValue) {
  var initial = initialValue;
  var i = 0;
  if (typeof initial === 'undefined') {
    initial = arr[0];
    i = 1;
  }
  for (i; i < arr.length; i++) {
    var current = arr[i];
    initial = callback(initial, current);
  }
  return initial;
}

function filter(arr, callback) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    var boolean = callback(arr[i], i, arr);
    if (boolean) {
      newArr[newArr.length] = arr[i];
    }
  }
  return newArr;
}

function foreach(arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    if (arr.hasOwnProperty(i)) {
      callback(arr[i], i, arr);
    }
  }
}

function chain(obj) {
  var wrappedObj = new ArrayLib(obj);
  wrappedObj._isChainable = true;
  return wrappedObj;
}

function value() {
  return this._currentValue;
}

function createMethod(method) {
  return function() {
    var firstArgument = this._isChainable ? this._currentValue : arguments[0];
    var secondArgument = this._isChainable ? arguments[0] : arguments[1];
    var thirdArgument = this._isChainable ? arguments[1] : arguments[2];
    var result =  method.call(this, firstArgument, secondArgument, thirdArgument);
    if (this._isChainable && result) {
      this._currentValue = result;
    }
    return this._isChainable ? this : result;
  };
}

var ArrayLib  = function(currentValue) {
  this.take = createMethod(take);
  this.skip = createMethod(skip);
  this.map = createMethod(map);
  this.reduce = createMethod(reduce);
  this.filter = createMethod(filter);
  this.foreach = createMethod(foreach);
  this.chain = chain;
  this.value = value;
  this._isChainable = false;
  this._currentValue = currentValue;
  return this;
};

var arrLib = new ArrayLib();

