////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///JSON
console.log("_____________________________________________");

let myJSONObjectFromServer ='{"UserName" :"mohammed" ,"Number" : 5 , "Age" : 23}';
console.log(typeof myJSONObjectFromServer);
console.log(myJSONObjectFromServer);

let myJSObject = JSON.parse(myJSONObjectFromServer);
console.log(typeof myJSObject);
console.log(myJSObject);

myJSObject["UserName"] = "Ali";
myJSObject["Age"] = 24;

let myJSONObjectToServer = JSON.stringify(myJSObject);
console.log(typeof myJSONObjectToServer);
console.log(myJSONObjectToServer);

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///API Request
console.log("_____________________________________________");

let MyRequest = new XMLHttpRequest();
MyRequest.open("GET","http://localhost:8080/subject/getOneSubject/2");
MyRequest.send();
console.log(MyRequest);

MyRequest.onreadystatechange = function(){
	console.log(MyRequest.readyState); //Request is finished and response is ready
	console.log(MyRequest.status);	   //response is successful

if(MyRequest.readyState===4 && MyRequest.status===200){
	//console.log(this.responseText);
	let JsonData = JSON.parse(this.responseText);
	console.log(JsonData);
	console.log(JsonData["finalQuestionAnswer"].length);
	
}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///promise
console.log("_____________________________________________");

const mypromise = new Promise(function (resolvefunction,rejectFunction){
	let connect = true;
	if(connect){
		resolvefunction("Connection Established");
	}else{
		rejectFunction(Error("Connection failed"));
	}
});

console.log(mypromise);

mypromise.then(
	(resolveValue) => console.log(`Good 1 ${resolveValue}`),
	(rejectValue)  => console.log(`Bad 1 ${rejectValue}`)
);

mypromise.then(
	(resolveValue) => console.log(`Good 2 ${resolveValue}`),
	(rejectValue)  => console.log(`Bad 2 ${rejectValue}`)
);


mypromise.then(
	(resolveValue) => console.log(`Good 3 ${resolveValue}`),
	(rejectValue)  => console.log(`Bad 3 ${rejectValue}`)
);

//////

const mypromise2 = new Promise((resolvefunction,rejectFunction) =>{ 
	let Employee = ["mohammed","Ali","Ahmed","gg"];
	if(Employee.length===4){
		resolvefunction(Employee);
	}else{
		rejectFunction("didnt find 4 Employee")
	}
});

mypromise2.then((resolveValue) => {
	resolveValue.length=2;
	return resolveValue;
	
}).then((resolveValue) => {
	resolveValue.length=1;
	return resolveValue;
	
}).then((resolveValue)=>{
	console.log(`the chossen Employee is ${resolveValue}`);
})
.catch((rejectReason) => console.log(rejectReason))
.finally(() => console.log("the Opretion is done"));


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///promise and XHR(XMLHttpRequest)
console.log("_____________________________________________");

const getData = (APILink)=>{
	return new Promise ((resolve,reject) => {
		
	let MyRequest2 = new XMLHttpRequest();
	MyRequest2.onload = function (){
	console.log("_____________________________________________");
	if(this.readyState===4 && this.status===200){
		resolve(JSON.parse(this.responseText));
	}else{
		reject("gg my nega");
	}
};
MyRequest2.open("GET",APILink);
MyRequest2.send();
});
};

getData("http://localhost:8080/subject/getOneSubject/2").then((result)=>{
	return result.title;
})
.then((result) => console.log(result))
.catch((rej) => console.log(rej));

*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///fetch API
console.log("_____________________________________________");

fetch("http://localhost:8080/subject/getOneSubject/2").then((result)=>{
	console.log(result);
	let myData = result.json();
	console.log(myData);
	return myData;
}).then((result)=>{
	console.log(result.title);
})

////

const myFirstPromise = new Promise((res,rej)=>{
	setTimeout(()=>{
		res("this is my first promise");
	},5000);
});
const mySecondPromise = new Promise((res,rej)=>{
	setTimeout(()=>{
		res("this is my Second promise");
	},5000);
});
const myThridPromise = new Promise((res,rej)=>{
	setTimeout(()=>{
		rej("this is my Thrid promise");
	},5000);
});
Promise.all([myFirstPromise,mySecondPromise,myThridPromise]).then(  // All of the promises must resolved
	(resolveValue) => console.log(resolveValue),
	(rejectedValue)=> console.log(`rejected ${rejectedValue}`)
);

Promise.allSettled([myFirstPromise,mySecondPromise,myThridPromise]).then(  // get All promises(resolved or rejected)
	(resolveValue) => console.log(resolveValue),
	(rejectedValue)=> console.log(`rejected ${rejectedValue}`)
);
Promise.race([myFirstPromise,mySecondPromise,myThridPromise]).then(  // get first one (resolved or rejected)
	(resolveValue) => console.log(resolveValue),
	(rejectedValue)=> console.log(`rejected ${rejectedValue}`)
);

//////

function getPromiseData1 (){
	return new Promise((res,rej)=>{
		let name=["mohammed"];
		if(name.length>0){
			res("User Found");
		}else{
			rej("User Not Found");
		}
	});
}

//////

function getPromiseData2 (){
	
		let name=["mohammed"];
		if(name.length>0){
			return Promise.resolve("User Found");
		}else{
			return Promise.reject("User Not Found");
		}
}

//////

async function getPromiseData3 (){
	
		let name=["mohammed"];
		if(name.length>0){
			return "User Found";
		}else{
			return "User Not Found";
		}
}

getPromiseData1().then(
	(resValue) => console.log(resValue),
	(rejValue) => console.log(rejValue)
);

getPromiseData2().then(
	(resValue) => console.log(resValue),
	(rejValue) => console.log(rejValue)
);

console.log(getPromiseData3 ());


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///AWait
/*
console.log("_____________________________________________");


// AWait works only inside async functions

const mypromise = new Promise((resolve,reject)=>{
	setTimeout(()=>{
		resolve("i am the Good promise")
	},2000)
});

async function readData(){
	console.log("Before Promise");
	console.log(await mypromise);  // await make javaScript wait for the promise method
	//console.log(await mypromise.catch((err)=>(err)));
	console.log("After Promise");
}

readData();


//////


const mypromise = new Promise((resolve,reject)=>{
	setTimeout(()=>{
		resolve("i am the Good promise")
	},6000)
});

async function readData(){
	console.log("Before Promise");
	
	try{
	console.log(await mypromise);  
	}catch (reason){
	console.log(`Reason : ${reason}`);  
	}finally{
	console.log("After Promise");
	}
}

readData();

*/
/////


const mypromise = new Promise((resolve,reject)=>{
	setTimeout(()=>{
		resolve("i am the Good promise")
	},6000)
});

async function fetchData(){
	console.log("Before Fetch");
	
	try{
		let myData =await fetch("http://localhost:8080/subject/getOneSubject/2");
		console.log(await myData.json());  
	}catch (reason){
		console.log(`Reason : ${reason}`);  
	}finally{
		console.log("After Promise");
	}
}
fetchData();












