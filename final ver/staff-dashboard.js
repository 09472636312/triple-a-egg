// =========================
// STAFF ACCESS ONLY
// =========================

const currentUser =
JSON.parse(
localStorage.getItem(
"currentUser"
)
);

if(
!currentUser ||
currentUser.role !== "staff"
){

alert(
"Access Denied"
);

window.location.href =
"index.html";

}

// =========================
// LOAD DATA
// =========================

const orders =
JSON.parse(
localStorage.getItem(
"orders"
)
) || [];

const transactions =
JSON.parse(
localStorage.getItem(
"transactions"
)
) || [];

// =========================
// TODAY'S ORDERS
// =========================

const today =
new Date()
.toISOString()
.split("T")[0];

const todayOrders =
orders.filter(order => {

const orderDate =
new Date(order.date)
.toISOString()
.split("T")[0];

return orderDate === today;

});

document.getElementById(
"todayOrders"
).textContent =
todayOrders.length;

// =========================
// PENDING
// =========================

const pendingOrders =
orders.filter(
o => o.status === "Pending"
);

document.getElementById(
"pendingOrders"
).textContent =
pendingOrders.length;

// =========================
// DELIVERED
// =========================

const deliveredOrders =
orders.filter(
o => o.status === "Delivered"
);

document.getElementById(
"deliveredOrders"
).textContent =
deliveredOrders.length;

// =========================
// TRANSACTIONS
// =========================

document.getElementById(
"totalTransactions"
).textContent =
transactions.length;

// =========================
// RECENT ORDERS
// =========================

const recentOrders =
document.getElementById(
"recentOrders"
);

orders
.slice(-10)
.reverse()
.forEach(order=>{

recentOrders.innerHTML += `

<tr>

<td>${order.customer}</td>

<td>${order.category}</td>

<td>${order.trays}</td>

<td>${order.status}</td>

</tr>

`;

});

// =========================
// CHART
// =========================

const chart =
document.getElementById(
"orderChart"
);

new Chart(chart,{

type:"doughnut",

data:{

labels:[
"Pending",
"Delivered"
],

datasets:[{

data:[
pendingOrders.length,
deliveredOrders.length
]

}]

}

});

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