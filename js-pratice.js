/*
* 考察this三板斧
*/
function show () {
	console.log('this:', this);
}
var obj = {
	show: show
};
obj.show();
// obj

function show () {
	console.log('this:', this);
}
var obj = {
	show: function () {
		show();
	}
};
obj.show();
// window

var obj = {
	show: function () {
		console.log('this:', this);
	}
};
(0, obj.show)();
// window 

var obj = {
	sub: {
		show: function () {
			console.log('this:', this);
		}
	}
};
obj.sub.show()
//obj.sub 

var obj = {
	show: function () {
		console.log('this:', this);
	}
};
var newobj = new obj.show();
// newObj

var obj = {
	show: function () {
		console.log('this:', this);
	}
};
var newobj = new (obj.show.bind(obj))();
// newobj

var obj = {
	show: function () {
		console.log('this:', this);
	}
};
var newobj = new (obj.show.bind(obj))();
// newobj

var obj = {
	show: function () {
		console.log('this:', this);
	}
};
var elem = document.getElementById('book-search-results');
elem.addEventListener('click', obj.show);
elem.addEventListener('click', obj.show.bind(obj));
elem.addEventListener('click', function () {
	obj.show();
});

// elem
// obj
// obj

/*
* 作⽤域
*/
var person = 1;
function showPerson() {
	var person = 2;
	console.log(person);
}
showPerson();
// 2

var person = 1;
function showPerson() {
	console.log(person);
	var person = 2;
}
showPerson();
// undefined

var person = 1;
function showPerson() {
	console.log(person)
	var person = 2;
	function person () {}
}
showPerson()
// fn person

var person = 1;
function showPerson() {
	console.log(person)
	function person() {}
	var person = 2;
}
showPerson()
// fn person

for(var i = 0; i < 10; i++) {
	console.log(i);
} 
// 0,1,2,3,4,5,6,7,8,9

for(var i = 0; i < 10; i++) {
	setTimeout(function() {
		console.log(i)
	})
}
// 10, 10, 10, 10, 10, 10, 10, 10, 10, 10

for(var i = 0; i < 10; i++) {
	(function(i) {
		setTimeout(function() {
			console.log(i)
		}, 0)
	})(i)
}
// 0,1,2,3,4,5,6,7,8,9

for(let i = 0; i < 10; i++) {
	console.log(i)
}
// 0,1,2,3,4,5,6,7,8,9

/*
* ⾯向对象
*/
function Person() {
	this.name = 1;
	return {};
}
var person = new Person();
console.log('name:', person.name);
// name: undefined  ==> return 会覆盖属性

function Person() {
	this.name = 1;
}
Person.prototype = {
	show: function () {
		console.log('name is:', this.name);
	}
};
var person = new Person();
person.show();
// name is: 1

function Person() {
	this.name = 1;
}
Person.prototype = {
	name: 2,
	show: function () {
		console.log('name is:', this.name);
	}
};
var person = new Person();
Person.prototype.show = function () {
	console.log('new show');
};
person.show();
// new show ==> Person原型上的show被改写，如果没有被改写，那么将输出1

function Person() {
	this.name = 1;
}
Person.prototype = {
	name: 2,
	show: function () {
		console.log('name is:', this.name);
	}
};
var person = new Person();
var person2 = new Person();
person.show = function () {
	console.log('new show');
};
person2.show(); 
person.show(); 
// name is 1
// new show

function Person() {
	this.name = 1;
}
Person.prototype = {
	name: 2,
	show: function () {
		console.log('name is:', this.name);
	}
};
Person.prototype.show();
(new Person()).show();
// name is:2
// name is:1