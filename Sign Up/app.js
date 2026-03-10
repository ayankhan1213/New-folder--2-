let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");
let signUpButton = document.getElementById("sign-up-button");

let currentItems = localStorage.getItem("currentUser");
let currUsers = JSON.parse(currentItems);

if(currUsers){
    window.location.href = '../post/post.html';
}


document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!email.value || !password.value || !confirmPassword.value) {
        alert("Please fill in all fields.");
        return;
    }
    if (!email.value.includes("@")) {
        alert("Please enter a valid email address.");
        return;
    }
    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match.");
        return;
    }
    let allUserString = localStorage.getItem("users");
    let alluser = JSON.parse(allUserString) || [];

    let existingUser = alluser.find(user => user.email.toLowerCase() === email.value.toLowerCase());
    if (existingUser) {
        alert("User with this email already exists.");
        return;
    }

    let newUser = {
        email: email.value.toLowerCase(),
        password: password.value
    }

    let updatedUser = [newUser, ...alluser]

    localStorage.setItem("users", JSON.stringify(updatedUser));
    console.log(`Signup Successfull`);
    document.querySelector("form").reset();

    window.location.href = "../Login/login.html";

})