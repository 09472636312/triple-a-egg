// =========================
// ADMIN ACCESS PROTECTION
// =========================

const currentUser =
JSON.parse(
localStorage.getItem(
"currentUser"
)
);

if(
!currentUser ||
currentUser.role !== "admin"
){

alert(
"Access Denied"
);

window.location.href =
"dashboard.html";

}

// =========================
// DARK MODE
// =========================

function toggleDarkMode(){

document.body.classList.toggle(
"dark-mode"
);

localStorage.setItem(
"darkMode",
document.body.classList.contains(
"dark-mode"
)
);

}

if(
localStorage.getItem(
"darkMode"
) === "true"
){

document.body.classList.add(
"dark-mode"
);

}

// =========================
// CHANGE PASSWORD
// =========================

function changePassword(){

const password =
document.getElementById(
"newPassword"
).value;

if(password.length < 4){

alert(
"Password must be at least 4 characters."
);

return;

}

let users =
JSON.parse(
localStorage.getItem(
"users"
)
);

const admin =
users.find(
u =>
u.username ===
currentUser.username
);

admin.password =
password;

localStorage.setItem(
"users",
JSON.stringify(users)
);

alert(
"Password Updated Successfully"
);

addTransaction(
"Password Changed",
`${currentUser.username} updated account password`
);

}

// =========================
// BACKUP DATA
// =========================

function backupData(){

const backup = {

users:
JSON.parse(localStorage.getItem("users")),

inventory:
JSON.parse(localStorage.getItem("inventory")),

orders:
JSON.parse(localStorage.getItem("orders")),

customers:
JSON.parse(localStorage.getItem("customers")),

transactions:
JSON.parse(localStorage.getItem("transactions"))

};

const blob =
new Blob(
[
JSON.stringify(
backup,
null,
2
)
],
{
type:
"application/json"
}
);

const link =
document.createElement(
"a"
);

link.href =
URL.createObjectURL(
blob
);

link.download =
"TripleA_Backup.json";

link.click();

}

// =========================
// RESTORE DATA
// =========================

function restoreData(){

const file =
document.getElementById(
"restoreFile"
).files[0];

if(!file){

alert(
"Select backup file first."
);

return;

}

const reader =
new FileReader();

reader.onload =
function(event){

const data =
JSON.parse(
event.target.result
);

localStorage.setItem(
"users",
JSON.stringify(
data.users
)
);

localStorage.setItem(
"inventory",
JSON.stringify(
data.inventory
)
);

localStorage.setItem(
"orders",
JSON.stringify(
data.orders
)
);

localStorage.setItem(
"customers",
JSON.stringify(
data.customers
)
);

localStorage.setItem(
"transactions",
JSON.stringify(
data.transactions
)
);

alert(
"Backup Restored Successfully"
);

};

reader.readAsText(file);

}

// =========================
// LOGOUT
// =========================

function logout(){

localStorage.removeItem(
"currentUser"
);

window.location.href =
"index.html";

}

// =========================
// TRANSACTION LOGGER
// =========================

function addTransaction(
action,
details=""
){

let transactions =
JSON.parse(
localStorage.getItem(
"transactions"
)
) || [];

transactions.push({

action,

details,

user:
currentUser.username,

date:
new Date()
.toLocaleString(),

rawDate:
new Date()
.toISOString()
.split("T")[0]

});

localStorage.setItem(
"transactions",
JSON.stringify(
transactions
)
);

}