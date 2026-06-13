function login(){

const username =
document.getElementById("username").value.trim();

const password =
document.getElementById("password").value;

const users =
JSON.parse(
localStorage.getItem("users")
) || [];

const user =
users.find(u =>
u.username === username &&
u.password === password
);

if(!user){

alert("Invalid Username or Password");
return;

}

localStorage.setItem(
"currentUser",
JSON.stringify(user)
);

if(user.role === "admin"){

window.location.href =
"dashboard.html";

}else if(user.role === "staff"){

window.location.href =
"staff-dashboard.html";

}

}