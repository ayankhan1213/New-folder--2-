let currentItems = localStorage.getItem("currentUser");
let currUsers = JSON.parse(currentItems);

if (!currUsers) {
    window.location.href = "../Login/login.html";
}

// welcome user
document.querySelector(".welcome").textContent = currUsers.email;

// logout
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "../Login/login.html";
}

let editIndex = null;

// submit post
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    let postTitle = document.getElementById("postTitle").value;
    let postContent = document.getElementById("postContent").value;

    let allPosts = JSON.parse(localStorage.getItem("posts")) || [];

    let newPost = {
        title: postTitle,
        content: postContent,
        time: new Date().getTime(),
        createdBy: currUsers.email,
        likes: [],
    };

    if (editIndex !== null) {
        allPosts.splice(editIndex, 1);
        editIndex = null;
    }

    allPosts.unshift(newPost);

    localStorage.setItem("posts", JSON.stringify(allPosts));

    renderPosts();
});

// Like / Unlike
function likePost(index) {
    let allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    let currentPost = allPosts[index];

    let userEmail = currentPost.likes.find(email => email === currUsers.email);

    if (userEmail) {
        // Unlike
        currentPost.likes = currentPost.likes.filter(email => email !== currUsers.email);
    } else {
        // Like
        currentPost.likes.push(currUsers.email);
    }

    allPosts[index] = currentPost;
    localStorage.setItem("posts", JSON.stringify(allPosts));

    renderPosts();
}

// Delete post
function deletePost(index) {
    let allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    allPosts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(allPosts));
    renderPosts();
}

// Edit post
function editPost(index) {
    let allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    let post = allPosts[index];

    document.getElementById("postTitle").value = post.title;
    document.getElementById("postContent").value = post.content;
    document.getElementById("postTitle").focus();
    document.querySelector("form button").textContent = "Update Post";
    editIndex = index;
}

// Render posts
function renderPosts() {
    let allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    let output = document.querySelector(".output");
    output.innerHTML = "";

    allPosts.forEach((post, postIndex) => {

        let userLiked = post.likes.find(email => email === currUsers.email);

        output.innerHTML += `
        <div class="singlePost">

            <h2>${post.title}</h2>
            <h4>${post.createdBy}</h4>
            <p>${post.content}</p>
            <h4 class="time">${moment(post.time).fromNow()}</h4>

            <div class="buttonContainer">

                <button class="${userLiked ? "liked" : "unliked"}"
                onclick="likePost(${postIndex})">
                <i class="bi ${userLiked ? "bi-hand-thumbs-up-fill" : "bi-hand-thumbs-up"}"></i>
                Like (${post.likes.length})
                </button>

                ${post.createdBy === currUsers.email ? `
                <button onclick="editPost(${postIndex})"><i class="bi bi-pencil-square"></i> Edit</button>
                <button onclick="deletePost(${postIndex})"><i class="bi bi-trash"></i> Delete</button>
                ` : ``}

            </div>

        </div>
        `;
    });

    document.querySelector("form button").textContent = "Post Now";
    document.querySelector("form").reset();
}

// Initial render
renderPosts();