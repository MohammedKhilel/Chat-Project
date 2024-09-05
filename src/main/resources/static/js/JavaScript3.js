
//OOP

//constrastor function

function user(id,name,salary){
	this.id=id;
	this.name=name;
	this.salary=salary + 500;	
}

let userOne = new user(1,"mohammed",5000);

console.log(userOne.id);
console.log(userOne.name);
console.log(userOne.salary);

///constrastor function(new synta)
console.log("_____________________________________________");
//super class
class User {
	#e; //private atrepute
	constructor(id ,name , salary){
		//properties
		this.id = id;
		this.name = name || "unknowen";
		this.#e = salary + 500;	
		this.msg = function (){
			return `hello ${this.name} your salary is ${this.salary}`;
		}
		User.count++;
	}
	
	//class method
	
	getSalary(){
		return parseInt(this.#e);
	}
	
	writeMessge(){
		return `hello ${this.name} your salary is ${this.salary}`;
	}
	
	//stitac properties and method
	static count =0;
	
	static sayHello (){
		return "hello Amgo"
	}
	
	static contMembers (){
		return `${this.count} count Members`;
	}
	
}
let UserTwo = new User(2,"Ali","6000 geneh");

console.log(UserTwo.id);
console.log(UserTwo.name);
console.log(UserTwo.getSalary());
console.log(UserTwo.msg());

console.log(UserTwo instanceof User);
console.log(UserTwo.constructor === User);

console.log(UserTwo.count);
console.log(User.count);
console.log(User.sayHello());
console.log(User.contMembers());


///inheritance
console.log("_____________________________________________");


//Derived class
class Admin extends User {
	constructor (id, name, salary, department){
		super(id,name,salary);
		this.department = department;
	}
}

let foodPart = new Admin(3,"Omar",30000,"food");

console.log(foodPart.name);
console.log(foodPart.department);
console.log(foodPart.getSalary());
console.log(foodPart.writeMessge());


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///prototype
console.log("_____________________________________________");


class phone {
	constructor(number,name){
		this.number = number;
		this.name   = name;
	}
	sayHello (){
		return `hello i am ${this.name} phone number : ${this.number}`
	}
}

let Iphone6 = new phone(1,"IPHONE 6 pro max");
console.log(Iphone6.sayHello());
console.log(phone.prototype);

phone.prototype.sayWellcome = function(){
	return `WellCome to ${this.name}`
}
console.log(Iphone6.sayWellcome());

////

Object.prototype.love="my love i coming for you"
console.log(Iphone6.love);

String.prototype.addDotAfter = function (val){
	return `${this}.`;
}
let Name = "mohammed";
console.log(Name.addDotAfter());


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Object Meta Data And Descriptor
console.log("_____________________________________________");

const myObject = {
	a:1,
	b:2
};
Object.defineProperty(myObject,"c",{
	writable : false,    //can be overwrited or not
	enumerable:false,    //no looping
	configurable:false,  //cant be deleted and cant be redefine
	value:3
});
myObject.c=100;   // cant overwrite

console.log(myObject);

for(let key in myObject){
	console.log(key,myObject[key]);
}

console.log(delete myObject.c);
console.log(myObject);

Object.defineProperties(myObject,{
	d:{
		configurable : true,
		value:4
	},
	e:{
		configurable : true,
		value:5
	},
	f:{
		configurable : true,
		value:6
	}
});
console.log(myObject);

console.log(Object.getOwnPropertyDescriptor(myObject,"d"));
console.log(Object.getOwnPropertyDescriptors(myObject));


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Date and Time
console.log("_____________________________________________");


let DateNow = new Date();
console.log(DateNow);

console.log(Date.now());
console.log(`number of seconds is ${Date.now()/1000}`);
console.log(`number of minutes is ${Date.now()/(1000*60)}`);
console.log(`number of hours is ${Date.now()/(1000*60*60)}`);
console.log(`number of days is ${Date.now()/(1000*60*60*24)}`);
console.log(`number of years is ${Date.now()/(1000*60*60*24*365)}`);

///

let dateNow = new Date();
let brithday= new Date("october 10 , 2001")
let dateDiff= dateNow - brithday;

console.log(dateDiff);
console.log(dateDiff/1000/60/60/24/365);

console.log(dateNow);
console.log(dateNow.getTime()); 	 //mile seconds
console.log(dateNow.getDate());		 //day in the month
console.log(dateNow.getFullYear());  //this year
console.log(dateNow.getMonth());     //get index om month (zero index)
console.log(dateNow.getDay());       //day in the weak (zero index)
console.log(dateNow.getHours());

dateNow.setTime(0);  //time from 1970
console.log(dateNow);

dateNow = new Date();
dateNow.setDate(1); //day number in the month if it more than 30(or31) => go to next month
console.log(dateNow);

dateNow = new Date();
dateNow.setFullYear(2020); // setFullYear(year,month=>optional [0-11],day=>optional [1-31])
console.log(dateNow);

console.log(Date.parse("october 10 , 2001"));
dateNow.setTime(1002664800000);
console.log(dateNow);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Generator
console.log("_____________________________________________");

function* generateNumber (){   		/// Generator function Run it's code when Required
	yield 1;						
	console.log("i want to sleep"); 
	yield 2;
	yield 3;
	yield 4;
}

let generator = generateNumber ();  
console.log(typeof generator);		/// Generator function return special Object [Generator Object]
console.log(generator);   			/// Generators are iterable 

console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());

////
console.log("_____________________________________________");

function* generateNums (){
	yield 1;	
	yield 2;
	yield 3;
}
function* generateLetters (){
	yield "A";	
	yield "B";
	yield "C";
}
function* generateAlls (){
	yield* generateNums();	
	yield* generateLetters();
	yield* [4,5,6,7,8];
}

let generateAll = generateAlls ();  

console.log(generateAll.next());
console.log(generateAll.next());
console.log(generateAll.next());
console.log(generateAll.next());
console.log(generateAll.next());
console.log(generateAll.next());
console.log(generateAll.next());
console.log(generateAll.next());
console.log(generateAll.next());
console.log(generateAll.return("gg")); //no more generate
console.log(generateAll.next());
console.log(generateAll.next());

///
console.log("_____________________________________________");

function* generateInfintyNums(){
	let index = 0;
	while(true){
		yield index++;
	}
}
let generateInfintyNum = generateInfintyNums ();
console.log(generateInfintyNum.next());
console.log(generateInfintyNum.next());
console.log(generateInfintyNum.next());
console.log(generateInfintyNum.next());




