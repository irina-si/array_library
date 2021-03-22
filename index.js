function take(arr, n) {
  var newArr = [];
  var amount = n;
  if (n > arr.length) {
    amount = arr.length;
  }
  for (var i = 0; i < amount; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
}


function skip(arr, n) {
  var newArr = [];
  if (n > arr.length) {
    return newArr;
  }
  for (var i = n; i < arr.length; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
}

function map(arr, callback) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    newArr.push(callback(arr[i], i, arr));
  }
  return newArr;
}

function reduce(arr, callback, initialValue) {
  var initial = initialValue;
  var i = 0;
  if (!initial) {
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
  var newArr = new Array();
  for (var i = 0; i < arr.length; i++) {
    var boolean = callback(arr[i], i, arr);
    if (boolean) {
      newArr.push(arr[i]);
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
  let wrappedObj = new _(obj);
  wrappedObj._chain = true;
  return wrappedObj;
}


var methods = {
  take: take,
  skip: skip,
  map: map,
  reduce: reduce,
  filter: filter,
  foreach: foreach
};

// try to create chain method

let _  = function(obj) {
  this.take = take;
  this.skip = skip;
  this.map = map;
  this.reduce = reduce;
  this.filter = filter;
  this.foreach = foreach;
  this.chain = chain;
  if (obj instanceof _) return obj;
  if (!(this instanceof _)) return new _(obj);
  this._wrapped = obj;
};

let arrLib = _();
console.log(arrLib);
console.log(arrLib.chain([1, 2, 3]))