function add(a, b) {
  console.log(a + b);
  g = a + b;
}

var obj = {
  inc: function () {
    this.add(1);
  },
  dec: function () {
    add(1, 2);
  },
  add: function (i) {
    g += i;
  },
};

var g;
add(10, 1);
console.log('1=', g);
obj.inc();
console.log('2=', g);
obj.dec();
console.log('3=', g);

// 11
// 1= 11
// 2= 12
// 3
// 3= 3
