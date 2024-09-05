
window.onload = function (){
document.querySelector("h1").style.color = "Blue";
};
        
//window.alert("hello there :-)");
	        
        
document.write("<h1> hello there <span>    Amego</span> </h1>");



console.log("this is a secrat don't tell any one :-)");
console.log("this is a secrat don't \"tell\" any one :-)");
console.log("this is a \
secrat don't \
tell any one :-)");
console.log("this is a \nsecrat don't tell any one \n:-)");

console.table(["Ali , 23","ahmed , 54","mohammed , 65","soso , 34"]);

console.log("hello %cmy %cfriend","color:red ; font-size:40px","color:blue ; font-size:40px");

var a ={name:"ali",age:63,type:"old man"};
console.log(a.name);

var b = "i love you";


document.getElementById("b").innerHTML=b;


let mark = `

<h1>gg My niga</h1>
<h2>gg My niga</h2>
<h3>${b}</h3>

`;
document.write(mark);
console.log(mark);

document.write("?//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////\n");

var LessonTitle = "hero" ,LessonDicraption = "fucking good Lesson" ,LessonDate = "10/10";

var mark2 = `
<div>
<h3>${LessonTitle}</h3>
<p>${LessonDicraption}</p>
<span>${LessonDate}</span>

</div>
`;
document.write(mark2);

console.log(+"100");//covert to number
console.log(Number("100"));
console.log(1_000_000);
console.log(100..toString);//100.5.toString
console.log(100.5555.toFixed(2));//100.56
console.log(parseInt("100.500 ALi"));//100
console.log(parseFloat("100.500 ALi"));//100.5
console.log(Math.round(99.2));//99

let theName = "Mohammed";

console.log(theName[8]);


var b = "i love you so much so much";
console.log(b.indexOf("so"));
console.log(b.lastIndexOf("so"));
console.log(b.slice(0,6));
console.log(b.repeat(2));
console.log(b.split(" "));
console.log(b.split("",5));

console.log(10 ==="10");//codetion value and data type


var gender = "Male";

gender === "Male"? console.log("MR") : console.log("MRS");

var theCondition = gender === "Male" ? "Mr" : "MRS";

console.log(theCondition);

let theAge = 44 ;

theAge < 20 ? console.log(" < 20 ") : theAge < 40 ? console.log("< 40") : console.log("greater tan 45");

let price=0 ; // price = "" , = 0 , = null

console.log(`the price is ${price||200}`);//null,undefind flasey value
console.log(`the price is ${price??200}`);//null,undefind 


let day = 2 ;
switch (day){
	case 0 :
		console.log("saturday");
		break ; 
	case 1 :
		console.log("sunday");
		break;
	case 2 :
	case 3 :
		console.log("another day");
	break;
	
	default : 
		console.log("un known day");
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let theArray = ["first","second","third"];

console.log(theArray);

theArray.unshift("Zero");//Add element to the first 
console.log(theArray);

theArray.push("fourth");//Add element to the first 
console.log(theArray);

let thefirst = theArray.shift();//remove the first element and return it
console.log( "the first is : "+thefirst);
console.log(theArray);

let thelast = theArray.pop();//remove the last element and return it
console.log( "the last is : "+thelast);
console.log(theArray);

console.log(theArray.includes());//is the value fount or not (true/flase)


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	let array = ["aaa",12,"ghgt",88,76,"dfdr","dsrdf","drd",4]
	let array2 =["111","222","333"];
	
	
	for(let i =0;i<10;i++){
		console.log(i+" ; ")
	}
	
	let t = 0;
	for(;;){
		console.log(t+" ; ")
		t++;
		if(t>=10)break;
	}
	
	for(let i =0;i<array.length;i++){
		if(typeof array[i]=="number"){
		continue;	///skip this loop and continue the rest of the loobs
		}
		console.log(array[i]+" ; ")
	}

mainLoop: for(let i =0;i<array.length;i++){
	console.log(array[i]+" ; ")
	
nestedLoop:	for(let j =0;j<array2.length;j++){
	console.log(array2[j]+" ; ")
	if (array2[j]=="222"){
		break nestedLoop;
	}
}
}

let v=0;
while(true){
	console.log(v+10);
	
	break;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function add(num1,num2){
	
	console.log(num1+num2);
}
add(10,45)

function nospace(statment=""){
	return statment.split(" ");
}


function resultAdd(...number){//take any number of paremeter as array /// only one parmeter
	let result = 0;
	for(let i = 0;i<number.length;i++){
		result +=number[i]
	}
	return result;
}
console.log(resultAdd(10,54,54,2,90));


let adding = function(num1,num2){ //anonynous function //function with no name // it's made for just this task
	console.log(num1+num2);
}

adding(1,1);

document.getElementById("show").onclick = function () {
	console.log("Show");
};

setTimeout(function (){
	console.log("timer is work");//do this
},2000);//after this time


let print = (num) => num; //arrow function
console.log(print(5)); 

let printmany = () => {
	console.log(8); 
	console.log(9); 
	console.log(10); 
}; 
printmany();

function example() {
    let x = 5; // Lexical variable
    // ...
}
let globalVar = 10; // Global variable
function anotherFunction() {
    console.log(globalVar); // Accessible here
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let myArray = [11,22,44];

console.log(myArray);
let ArrayLoob = myArray.map(function (element,index,arr){
	console.log(element);
	console.log(index);
	console.log(arr);
},10);


function addition(ele){
	return ele + ele;
}
let addArray = myArray.map(addition);
console.log(addArray);

/////filter

let frinds = ["Ahmed","Sameh","Sayed","Asmaa","Amgad","Israa"];

let filterFrinds = frinds.filter(function (ele){ // filter will return the element if the condation is true
	return ele.startsWith("A")? true : false;
})

console.log(filterFrinds);


/////reduce

let nums=[10,20,15,30];

let reduceAdd = nums.reduce(function (acc , current , index , array){
	console.log(`acc => ${acc}`);//index 0
	console.log(`current => ${current}`);//curent start from index 1 here it's 20
	console.log(`index => ${index}`);
	console.log(`array => ${array}`);
	return acc + current;//reduce will return one value of the array 
},/*5*/);//or acc will equle this value rether than index 0 and the current will start from 0

console.log(reduceAdd);

let allLis = document.querySelectorAll("li");
let allDiv = document.querySelectorAll("div");

allLis.forEach(function (ele){
	ele.onclick=function(){
	
	//remove Active class from all element
	allLis.forEach(function (ele){
	ele.classList.remove("active");
	});
	//add active class to this element
	this.classList.add("active");
	//hide All div
	allDiv.forEach(function (ele){
		ele.style.display="none";
	});
	};
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let user = {
	//properties
	theName : "mohammed",
	theAge : 23,
	// method
	sayHello : function(){
		return "hello";
	},
	
	country: {
		name:"usa",
		number:12,
	},
	"the email" :"mohammed@gmail.com"
};

console.log(user.theName);
console.log(user.theAge);
console.log(user.sayHello());
console.log(user["the email"]);

//let subject = new Object();
let subject = {};

console.log(subject);

subject.name="math"
subject["number"]= 5;
subject.methode = function (){
	return `sprize mother brather`
}

console.log(subject);
/////

let copysubject = Object.create(subject);

console.log(copysubject);

let margeObjects = Object.assign(subject,user,{someproperty:"some data",anotherProperty : "anothe Data"});
console.log(margeObjects);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DOM (Document Object Model)

let myIdElement = document.getElementById("mydiv");
console.log(myIdElement);


let myTagElement = document.getElementsByTagName("p");
console.log(myTagElement[1]);


let myClassElement = document.getElementsByClassName("myspan");
console.log(myClassElement[1]);


let myqueryClassElemnt = document.querySelector(".selector");//part of class name
console.log(myqueryClassElemnt);


let myqueryIdElemnt = document.querySelector("#mydiv");//id
console.log(myqueryIdElemnt);


let LisElement = document.querySelectorAll("li");
console.log(LisElement);


console.log(document.title);
console.log(document.body);
console.log(document.forms[0].username.value);
console.log(document.links[0].href);


let element = document.querySelector(".js");
console.log(element.innerHTML); //return the html code iside the element 
console.log(element.textContent); 


let mylink = document.querySelector(".link");

console.log(mylink.getAttribute("class"));
console.log(mylink.getAttribute("href"));


mylink.setAttribute("title","gg");//add new atribute

if(mylink.hasAttribute("style")){
	mylink.removeAttribute("style")
}else{
	console.log("NOT Found")
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DOM advaned


let myElement = document.createElement("div");
let myAtt     = document.createAttribute("data-custom");
let myText    = document.createTextNode("product-Node");
let myComment = document.createComment("this is my div")

myElement.className="product";
myElement.setAttributeNode(myAtt);
myElement.setAttribute("data-test" , "Tisting");

myElement.appendChild(myText);
myElement.appendChild(myComment);

document.body.appendChild(myElement);

////
for(let i = 0 ; i<5;i++){

let myProduct      = document.createElement("div");
let myheader       = document.createElement("h2");
let myPragraph     = document.createElement("p");
let myPragraphText = document.createTextNode("product descraption ");
let myheaderText   = document.createTextNode("product header number : "+(i+1));

myProduct.className="myproduct";
myheader.appendChild(myheaderText);
myProduct.appendChild(myheader);
myPragraph.appendChild(myPragraphText);
myProduct.appendChild(myPragraph);

document.body.appendChild(myProduct);
}
////

let myFatherElement = document.querySelector(".child");

console.log(myFatherElement);
console.log(myFatherElement.children);
console.log(myFatherElement.children[0]);
console.log(myFatherElement.childNodes);

let myClickButton = document.getElementById("btn");
myClickButton.onclick=function(){
	console.log("onclick from js page")
};

/////

let userInput = document.querySelector("[name='user']");
let passwordInput = document.querySelector("[name='password']");

document.forms[1].onsubmit=function (e){
	let uservalid = false;
	let passwordvalid = false;
	
	console.log(userInput.value);
	console.log(userInput.value.length);
	if(userInput.value!=="" && userInput.value.length<=10 ){
		uservalid = true ;
	}
	if(passwordInput.value.length>=8 ){
		passwordvalid = true ;
	}
	
	if(uservalid === false || passwordvalid === false){
		e.preventDefault();
	}
};

//Event simulation

window.onload=function(){
	userInput.focus();
};
passwordInput.onblur = function (){
	document.forms[1].submit();
};


let myClassesElement = document.getElementById("myClassesDiv");

console.log(myClassesElement.classList);
console.log(myClassesElement.classList.contains("Ali"));
console.log(myClassesElement.classList.contains("one"));
console.log(myClassesElement.classList.item("2"));

myClassesElement.onclick = function (){
	
	myClassesElement.classList.toggle("show");//if there is a class "show" it will removed else will added
};

///CSS

myClassesElement.style.color="blue";
myClassesElement.style.fontWeight="bold";

myFatherElement.style.cssText = "fontWeight:bold; color:red; opacity:0.9; ";
myFatherElement.style.removeProperty("color");
myFatherElement.style.setProperty("font-size","40px","important");

//before, after, append, prepend, remove

let myDiv3 = document.getElementById("myDiv3");
let createsp= document.createElement("p");
createsp.append("this is will be wroten after the element tag");

myDiv3.before("this is will be wroten befor the element tag");
myDiv3.after(createsp);

myDiv3.append("this will added as a last elemnt in the div");
myDiv3.prepend("this will added as a first elemnt in the div");

createsp.remove();

///traversing

let span = document.querySelector(".spantwo");

console.log(span.nextSibling);//return the next evenif it is a comment or a text
console.log(span.nextElementSibling); //return the next Element

console.log(span.previousSibling);//return the previous even if it is a comment or a text
console.log(span.previousElementSibling); //return the previous Element

console.log(span.parentElement);


span.onclick = function () {
	span.parentElement.style.opacity="0.5";
}


///cloning

let myP    = document.getElementById("my-p").cloneNode(true);//true :take the pragraph with it's atriputes and text ; false : no atriputes and text
let mydiv5 = document.getElementById("myDiv5");

myP.id = `${myP.id}-clone`//change the id of the new coped element 

mydiv5.appendChild(myP);

/// add Event Listener

let myh4 = document.getElementById("h4Listener");


function FOne (){
	console.log("massege from function 1 ");
}
function FTwo (){
	console.log("massege from function 2 ");
}

myh4.addEventListener("click",FOne);
myh4.addEventListener("click",FTwo);

myh4.addEventListener("click",function(){
	console.log("massege from anonemas function");
});



let myh42 = document.getElementById("h4Listener2");

myh42.onclick = function(){
	let newmyh42 = myh42.cloneNode(true);
	newmyh42.className="cloneh42"
	document.body.appendChild(newmyh42);
	
};


document.addEventListener("click",function (e) {
	if(e.target.className === "cloneh42" ){
		console.log("this is copy");
	}
});










