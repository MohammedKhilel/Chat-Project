
/*
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
*/




///////////////////////////////////////////////////////////////////////////////////////////////////
//sign form
    var loginModal = document.getElementById("loginModal");
    var btn = document.getElementById("loginBtn");
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the modal
    btn.onclick = function() {
        loginModal.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        loginModal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        }
        if (event.target == signModal) {
                    signModal.style.display = "none";
                }
       if (event.target == aboutModal) {
                   aboutModal.style.display = "none";
               }
    }
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

     let number = document.getElementById("phoneNumber").value;
     let password = document.getElementById("password").value;

    fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // Correct Content-Type for JSON
        },
        body: JSON.stringify({
            "phoneNumber": number,
            "password": password
        })
    })
    .then(response => response.ok ? response.text() : Promise.reject("login failed"))
    .then(token => {
        localStorage.setItem("token", token);
        localStorage.setItem("phoneNumber", number);
        location.href="conversations.html";
    })
    .catch(error => {
        console.error('Error:', error);  // Catch and log any error
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////
//sign form
    const signModal = document.getElementById("signModal");
    const signBtn = document.getElementById("signBtn");
    const signSpan = document.getElementsByClassName("close")[1];

    // Open modal
    signBtn.onclick = () => signModal.style.display = "block";

    // Close modal
    signSpan.onclick = () => signModal.style.display = "none";

    // Function to handle sign-up logic
    const handleSignUp = (event) => {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById("name").value;
        const phoneNumber = document.getElementById("newPhoneNumber").value;
        const password = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("ConfirmPassword").value;

        if (password !== confirmPassword) {
            console.error("Passwords do not match");
            return;
        }

        const requestBody = JSON.stringify({ name, phoneNumber, password });

        fetch('http://localhost:8080/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: requestBody
        })
        .then(response => response.ok ? response.text() : Promise.reject("Sign-up failed"))
        .then(token => {
            localStorage.setItem("token", token);
            localStorage.setItem("phoneNumber", phoneNumber);
            location.href="conversations.html";
        })
        .catch(error => console.error('Error:', error));
    };

    // Attach sign-up logic to form submission
    document.getElementById("signModal").addEventListener("submit", handleSignUp);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//about us
    var aboutModal = document.getElementById("aboutModal");
    var aboutBtn = document.getElementById("aboutBtn");
    var aboutSpan = document.getElementsByClassName("close")[2];
    // When the user clicks the button, open the modal
    aboutBtn.onclick = function() {
        aboutModal.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
    aboutSpan.onclick = function() {
        aboutModal.style.display = "none";
    }
