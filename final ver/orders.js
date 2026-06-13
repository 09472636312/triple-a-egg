const currentUser =
JSON.parse(
localStorage.getItem(
"currentUser"
)
);

if(!currentUser){

window.location.href =
"index.html";

}

let inventory =
JSON.parse(
localStorage.getItem("inventory")
) || [];

let orders =
JSON.parse(
localStorage.getItem("orders")
) || [];

let customers =
JSON.parse(
localStorage.getItem("customers")
) || [];

const categorySelect =
document.getElementById(
"eggCategory"
);

// Load Egg Categories
inventory.forEach(item=>{

categorySelect.innerHTML +=
`<option value="${item.id}">
${item.category}
</option>`;

});

// Auto Calculate Total
function calculateTotal(){

const categoryId =
parseInt(
document.getElementById(
"eggCategory"
).value
);

const trays =
parseInt(
document.getElementById(
"trayCount"
).value
) || 0;

const item =
inventory.find(
i => i.id === categoryId
);

if(!item) return;

document.getElementById(
"pricePerTray"
).value =
"₱" + item.pricePerTray;

document.getElementById(
"totalAmount"
).value =
"₱" +
(item.pricePerTray * trays);

}

// Create Order
function createOrder(){

const customer =
document.getElementById(
"customerName"
).value.trim();

const contact =
document.getElementById(
"customerContact"
).value.trim();

const address =
document.getElementById(
"customerAddress"
).value.trim();

const categoryId =
parseInt(
document.getElementById(
"eggCategory"
).value
);

const trays =
parseInt(
document.getElementById(
"trayCount"
).value
);

if(
!customer ||
!contact ||
!address ||
!trays
){

alert(
"Complete all fields."
);

return;

}

const item =
inventory.find(
i => i.id === categoryId
);

if(!item){

alert(
"Category not found."
);

return;

}

if(item.trays < trays){

alert(
"Not enough trays available."
);

return;

}

const total =
item.pricePerTray * trays;

// Deduct inventory
item.trays -= trays;

const order = {

id: Date.now(),

customer: customer,

contact: contact,

address: address,

category: item.category,

trays: trays,

pricePerTray:
item.pricePerTray,

total: total,

status: "Pending",

date:
new Date()
.toLocaleString()

};

orders.push(order);

customers.push({

name: customer,

contact: contact,

address: address

});

localStorage.setItem(
"orders",
JSON.stringify(orders)
);

localStorage.setItem(
"customers",
JSON.stringify(customers)
);

localStorage.setItem(
"inventory",
JSON.stringify(inventory)
);

addTransaction(
"Order Created",
`${customer} ordered ${trays} trays of ${item.category}`
);

renderOrders();

clearForm();

alert(
"Order Created Successfully"
);

}

// Clear Form
function clearForm(){

document.getElementById(
"customerName"
).value = "";

document.getElementById(
"customerContact"
).value = "";

document.getElementById(
"customerAddress"
).value = "";

document.getElementById(
"trayCount"
).value = "";

document.getElementById(
"pricePerTray"
).value = "";

document.getElementById(
"totalAmount"
).value = "";

}

// Update Status using Dropdown
function updateStatus(
id,
newStatus
){

const order =
orders.find(
o => o.id === id
);

if(!order) return;

order.status =
newStatus;

localStorage.setItem(
"orders",
JSON.stringify(orders)
);

addTransaction(
"Order Status Updated",
`${order.customer} changed to ${newStatus}`
);

renderOrders();

}

// View Order Details
function viewOrder(id){

const order =
orders.find(
o => o.id === id
);

if(!order) return;

alert(

`Customer: ${order.customer}

Contact: ${order.contact}

Address: ${order.address}

Category: ${order.category}

Trays: ${order.trays}

Price Per Tray: ₱${order.pricePerTray}

Total: ₱${order.total}

Status: ${order.status}

Date: ${order.date}`

);

}

// Render Orders
function renderOrders(){

const body =
document.getElementById(
"ordersBody"
);

body.innerHTML = "";

orders
.slice()
.reverse()
.forEach(order=>{

body.innerHTML += `

<tr>

<td>${order.customer}</td>

<td>${order.category}</td>

<td>${order.trays}</td>

<td>₱${order.total}</td>

<td>

<select
onchange="updateStatus(${order.id}, this.value)"
class="${order.status.toLowerCase()}">

<option value="Pending"
${order.status === "Pending" ? "selected" : ""}>
Pending
</option>

<option value="Processing"
${order.status === "Processing" ? "selected" : ""}>
Processing
</option>

<option value="Delivered"
${order.status === "Delivered" ? "selected" : ""}>
Delivered
</option>

<option value="Cancelled"
${order.status === "Cancelled" ? "selected" : ""}>
Cancelled
</option>

</select>

</td>

<td>

<button
onclick="viewOrder(${order.id})">

View

</button>

</td>

</tr>

`;

});

}

// Transaction Logger
function addTransaction(
action,
details = ""
){

let transactions =
JSON.parse(
localStorage.getItem(
"transactions"
)
) || [];

transactions.push({

action: action,

details: details,

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
JSON.stringify(transactions)
);

}

// Initial Load
renderOrders();