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
let customers =
JSON.parse(
localStorage.getItem("customers")
) || [];

let orders =
JSON.parse(
localStorage.getItem("orders")
) || [];

function renderCustomers(){

const body =
document.getElementById(
"customerBody"
);

const keyword =
document.getElementById(
"searchCustomer"
).value.toLowerCase();

body.innerHTML = "";

customers
.filter(customer =>
customer.name
.toLowerCase()
.includes(keyword)
)
.forEach(customer=>{

const customerOrders =
orders.filter(
o =>
o.customer === customer.name
);

const totalRevenue =
customerOrders.reduce(
(sum,order)=>
sum + Number(order.total),
0
);

body.innerHTML += `

<tr>

<td>${customer.name}</td>

<td>${customer.contact}</td>

<td>${customer.address}</td>

<td>${customerOrders.length}</td>

<td>₱${totalRevenue.toLocaleString()}</td>

<td>

<button
onclick="viewHistory('${customer.name}')">

History

</button>

<button
onclick="editCustomer('${customer.name}')">

Edit

</button>

<button
onclick="deleteCustomer('${customer.name}')">

Delete

</button>

</td>

</tr>

`;

});

}

function viewHistory(name){

const customerOrders =
orders.filter(
o =>
o.customer === name
);

let historyText =
"Purchase History\n\n";

customerOrders.forEach(order=>{

historyText +=
`
Date: ${order.date}
Category: ${order.category}
Trays: ${order.trays}
Total: ₱${order.total}

`;

});

alert(historyText);

}

function editCustomer(name){

const customer =
customers.find(
c => c.name === name
);

const newName =
prompt(
"Customer Name",
customer.name
);

const newContact =
prompt(
"Contact Number",
customer.contact
);

const newAddress =
prompt(
"Address",
customer.address
);

if(newName){

customer.name = newName;

}

if(newContact){

customer.contact =
newContact;

}

if(newAddress){

customer.address =
newAddress;

}

localStorage.setItem(
"customers",
JSON.stringify(customers)
);

addTransaction(
"Customer Updated"
);

renderCustomers();

}

function deleteCustomer(name){

if(
confirm(
"Delete Customer?"
)
){

customers =
customers.filter(
c =>
c.name !== name
);

localStorage.setItem(
"customers",
JSON.stringify(customers)
);

addTransaction(
"Customer Deleted"
);

renderCustomers();

}

}

function addTransaction(action){

let transactions =
JSON.parse(
localStorage.getItem(
"transactions"
)
) || [];

transactions.push({

action: action,

date:
new Date()
.toLocaleString()

});

localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);

}

renderCustomers();