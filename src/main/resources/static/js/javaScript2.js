//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//BOM(Browser Object Model)

let counter = setTimeout(sayHello,5000,"mohammed",4);

function sayHello(user,number){
	console.log(`hello mstr ${user} we are happy to see you ${number}`);
}

let btn1 = document.getElementById("btn1");
btn1.onclick = function(){
	clearTimeout(counter);
}

let P1 = document.getElementById("P1");
function countDown(){
	P1.innerHTML -=1;
	if(P1.innerHTML === "0"){
		clearInterval(counter2);
	}
}

let counter2 =setInterval(countDown,1000);

//location object

console.log(location);
console.log(location.href);

//location.href="https://google.com" //go to spicific web
//location.href="https://developer.mozilla.org/en-US/docs/Web/JavaScript#reference"//go to spicific section in spicific web
//location.replace() = "https://translate.google.com" // //go to spicific web with remove the current web in hestory
console.log(location.host);
console.log(location.hostname);

///window open , window features
let btn2 = document.getElementById("btn2");
btn2.onclick=function(){
setTimeout(function (){
	window.open("https://google.com","_blank","width=500,height=600,left=200,top=50");
},1000);
};
//history

console.log(history.length);//number of pages in the history
/*
history.back();
history.forward();
*/
history.go(1);// one forward
history.go(-2); // two back

window.scrollTo(200,100);//scroll from (0,0) in the page (x,y)
window.scrollBy(200,100);//scroll from state that you in now in the page by (x,y)

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//local Storage

let inpute1 = document.getElementById("input1");
localStorage.setItem("input1","defult value");
console.log(window.localStorage);

let btn3 = document.getElementById("btn3");

btn3.onclick = function(){
	localStorage.setItem("input1",inpute1.value);
	localStorage.color = "red"
	localStorage["fontsize"]="20px";
	console.log(window.localStorage);
	console.log(window.localStorage.key(1));
}
document.write(localStorage.getItem("input1"));
console.log(localStorage.input1);
console.log(localStorage["input1"]);
localStorage.removeItem("color");
/*
localStorage.clear();
*/
let divScreen = document.getElementById("divScreen");
if(localStorage.getItem("divScreenColor")){
	divScreen.style.backgroundColor = localStorage.divScreenColor;
}

let blueBtn=document.getElementById("blue");
let greenBtn=document.getElementById("green");
let yellowBtn=document.getElementById("yellow");
let redBtn=document.getElementById("red");

blueBtn.onclick=function(){
divScreen.style.backgroundColor="blue";
localStorage.setItem("divScreenColor","blue");
}
greenBtn.onclick=function(){
divScreen.style.backgroundColor="green";
localStorage.setItem("divScreenColor","green");
}
yellowBtn.onclick=function(){
divScreen.style.backgroundColor="yellow";
localStorage.setItem("divScreenColor","yellow");
}
redBtn.onclick=function(){
divScreen.style.backgroundColor="red";
localStorage.setItem("divScreenColor","red");
}

///session storge

sessionStorage.setItem("divScreenColor","red");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Destructuring

let a=1;
let b=2;
let c=3;
let d=4;

let myFrinds=["mohammed","Ahmed","Ali","Omar"];

[a,b,c,d,e,f="gg"] = myFrinds;

console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log(e);
console.log(f);

let [x,y,,z] = myFrinds;

console.log(x);
console.log(y);
console.log(z);

let myBestFrinds=["mohammed","Ahmed","Ali","Omar",["osama","shady",["gamal","sayed"]]];

let[,,,,[g,,[,h]]]=myBestFrinds;

console.log(g);//osama
console.log(h);//sayed

let book = "video";
let video= "book";

[book,video] = [video,book];

console.log(book);
console.log(video);

let user= {
	name :"mohammed",
	Age : 23,
	job : "Devaloper",
	contry:"Cairo",
	skills:{
		html:70,
		css:80
	}
}

let {name:n , Age:A , contry="unknown",skills:{html,css:cs}} =user;

console.log(n);
console.log(A);
console.log(contry);
console.log(html);
console.log(cs);

let {html:skillOne , css:SkillTwo} =user.skills;

console.log(skillOne);
console.log(SkillTwo);


function printObject ({name:n , Age , skills:{css}}=user){
	console.log(n);
	console.log(Age);
	console.log(css);
}
printObject(user);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Set data type


let myData = [1,1,1,2,3];
let myUniqueData = new Set([1,1,1,2,3]);
myUniqueData.add(4).add(5).add("A");
console.log(myData);
console.log(myUniqueData);

myUniqueData.delete(2);
console.log(myUniqueData);

console.log(myUniqueData.has("A"));

let myItretor = myUniqueData.keys();
console.log(myItretor);
console.log(myItretor.next());
console.log(myItretor.next());
console.log(myItretor.next());
console.log(myItretor.next().value);
console.log(myItretor.next().value);
console.log(myItretor.next());

myUniqueData.clear();
console.log(myUniqueData);

let myWS = new WeakSet([{a:10,b:15},{c:20,d:5},{e:34,f:9}]);
console.log(myWS);


//Map data type


let myMap = new Map([
	[9,"number"],
	["hello","String"]
]);
myMap.set(10,"number");
myMap.set("10","String");
myMap.set(true,"boolean");
myMap.set({a:10,b:20},"object");
myMap.set(function doAny (){},"function");

console.log(myMap.get(10));
console.log(myMap.get("10"));
console.log(myMap);
console.log(myMap.size);

console.log(myMap.has(function doAny(){})); /// ??

console.log(myMap.delete(10));
console.log(myMap.size);

myMap.clear();
console.log(myMap.size);


let myObject = {name:"mohammed"};
let myWeekMap= new WeakMap();
myWeekMap.set(myObject,"Week map Object");
console.log(myWeekMap);
myObject = null;
console.log(myWeekMap);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Array From

console.log(Array.from("mohammed"));

console.log(
		Array.from("12345",function (n){
			return +n + +n ;
		}));

console.log(Array.from("12345",(n) =>+n + +n ));

let myArray = [1,1,1,2,3,4];
let mySet = new Set(myArray);
console.log(Array.from(mySet)); //method 1

console.log([...new Set(myArray)]);//method 2

function af(){
	return Array.from(arguments);
}
console.log(af("mohammed","Ali","Omar",1,2,3));

let myArray2 = [10,20,30,40,50,"A","B"];

myArray2.copyWithin(3);//the target index 3 / no start point
//the result
//[10, 20, 30, 10, 20, 30, 40]
console.log(myArray2);

myArray2 = [10,20,30,40,50,"A","B"];
myArray2.copyWithin(4,6);//the target index 3 /start point 6
//the result
//[10, 20, 30, 40, 'B', 'A', 'B']
console.log(myArray2);

myArray2 = [10,20,30,40,50,"A","B"];
myArray2.copyWithin(1,-2);//the target start from index 1 /start point size-2
//the result
//[10, 'A', 'B', 40, 50, 'A', 'B']
console.log(myArray2);

myArray2 = [10,20,30,40,50,"A","B"];
myArray2.copyWithin(1,5);//the target start from index 1 /start point 5
//the result
//[10, 'A', 'B', 40, 50, 'A', 'B']
console.log(myArray2);

myArray2 = [10,20,30,40,50,"A","B"];
myArray2.copyWithin(1,-2,-1);//the target start from index 1 /start point size-2 to point size-2 //not Encluding the End
//the result
//[10, 'A', 30, 40, 50, 'A', 'B']
console.log(myArray2);


let num = [1,2,3,4,5,6,7,8,9,10];

console.log(num.some(function(e){
	
	return e>5;
}));

let range = {
	min : 10,
	max : 20
}

let checkNumberInRange = num.some(function (e){
	return e >= this.min && e <= this.max;
},range); // this mean range

console.log(checkNumberInRange);

const myplaces ={
	20:"place1",
	30:"place2",
	50:"place3",
	40:"place4"
}
let locationArray = Object.keys(myplaces);
console.log(locationArray);

let locationArrayNumber = locationArray.map((n) => +n);//change String Array into number Array
console.log(locationArrayNumber);

let mainPlace = 15;

let check = locationArrayNumber.every(function (e){
	return e>this;
},mainPlace);

console.log(check);

//spread Operator

console.log("mohammed");
console.log(..."mohammed");
console.log([..."mohammed"]);

let Array1=[1,2,3];
let Array2=[4,5,6];

let Array3=[...Array1,...Array2];
console.log(Array3);

let Array4=[...Array3];//copy Array
console.log(Array4);

console.log(Math.max(...Array4));
///

let n1 =[10,30,10,20];
let n2 =[30,20,10];

console.log(Math.max(...n2)*[...n2,...n1].length);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Regular Expression

let myString ="hello Amego my name is mohammed amego"

let regex = /amego/ig;//i for case-insensitive g for global

console.log(myString.match(regex));

/////

let tld   = "Com Net Org Info Code Io";
let tldRe = /(org|info|io)/ig;
console.log(tld.match(tldRe));

let nums = "12345678910";
let numRe= /[0-2]/g;
console.log(nums.match(numRe));

let nums1 = "12345678910";
let numRe1= /[^0-2]/g;
console.log(nums1.match(numRe1));

let nums2 = "1!2@3#4$5%6^7&8*9*10";
let numRe2= /[^0-9]/g;
console.log(nums2.match(numRe2));

let nums3 = "os os1 os5s os8 os9s os8os";
let numRe3= /os[5-9]s/g;
console.log(nums3.match(numRe3));

////

let test = "a! A1.@B b@..#2C@e.Com e@e.Net R.Org$...moha@g.Com Ali@y.Netc3%D .d^4..E&.e5*Ff+6";
let testRe=/[a-z]/ig;
console.log(test.match(testRe));

let dot=/./ig;
console.log(test.match(dot));

let word=/\w/ig;
console.log(test.match(word));

let NOTword=/\W/ig;
console.log(test.match(NOTword));

let email1 =/\w@\w.(com|Net)/ig;
console.log(test.match(email1));

////

let names = "span12 rfgspan sp55an mmspanmm Spanseck"
let namesRe = /(\bspan|span\b)/g;
console.log(names.match(namesRe));

console.log(namesRe.test(names));
console.log(/(\bspan|span\b)/g.test("Spanseck"));
console.log(/(\bspan|span\b)/g.test("mohammed"));


//Quantifiers


//+ => one or more

let test1 ="mohammed@gmail.com. .#2C@e.Com esdasd@sadasde.Net R.Org$.moha@gmail.Com Ali@y.Netc3%D";
let test1Re=/\w+@\w+.(com|net)/ig;
console.log(test1.match(test1Re));

//* => zero or more

let test2= "00 0342340 098850 00454 0454 5450";
let test2Re=/0\d*0/g;
console.log(test2.match(test2Re));

//? => zero or one 

let urls = "https://google.com http://www.website.net web.com";
let urlsRe = /(https?:\/\/)?(www.)?\w+.\w+/ig;
console.log(urls.match(urlsRe));

////

let serials = "s100s s1000s s10000s s100000s";

console.log(serials.match(/s\d{3}s/g));    // n{x}   => number of
console.log(serials.match(/s\d{3,5}s/g));  // n{x,y} => Range
console.log(serials.match(/s\d{4,}s/g));   // n{x,}  => At Least x

///

let mystring = "we love programming";
let Names ="1OsamaZ 2AhmedZ 3Mohammed 4MoustafaZ 5GamalZ";

console.log(/ing$/i.test(mystring)); // $  => End with something
console.log(/^we/i.test(mystring));  // ^  => Start with something

console.log(Names.match(/\d\w{5}(?=Z)/ig));  // ?= followed by something
console.log(Names.match(/\d\w{8}(?!Z)/ig));  // ?! Not followed by something

///

let text = "we have programming And @ because @ is Aosom";
console.log(text.replace("@","java"));
console.log(text.replaceAll("@","java"));
console.log(text.replaceAll(/@/ig,"java"));
console.log(text);

let TestRe = /(https?:\/\/)?(www.)?\w{6,}.\w{3,}/ig;


