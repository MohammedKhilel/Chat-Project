

fetch('http://localhost:8080/test/String').then((res) => res.text())
.then((result)=>{
	console.log(result);
})


fetch('http://localhost:8080/user/getuserbyphone',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/text'
    },
    body:'01203966669'
})
.then(res => res.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
