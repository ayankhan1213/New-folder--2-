let email = document.getElementById("email");
let password = document.getElementById("password");

let currentItems = localStorage.getItem("currentUser");
let currUsers = JSON.parse(currentItems);

if(currUsers){
    window.location.href = '../post/post.html';
}

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    if(!email.value || !password.value){
        alert("Please fill in all fields.");
        return;
    }

    if(!email.value.includes("@")){
        alert("Please enter a valid email address.");
        return;
    }

    let string = localStorage.getItem("users");
    let all_user = JSON.parse(string) || [];

    let excistingUser = all_user.find(user => user.email.toLowerCase() === email.value.toLowerCase() );
    
    if(!excistingUser){
        alert("Incorrect Email and Password");
        return;
    }

    if(excistingUser.password !== password.value){
        alert(" Password is Incorrect");
        return;
    }
    alert("Login Successful ✅");

    localStorage.setItem("currentUser", JSON.stringify(excistingUser));
    window.location.href = '../post/post.html';

    
});