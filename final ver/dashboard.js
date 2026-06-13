const inventory =
JSON.parse(localStorage.getItem("inventory")) || [];

const orders =
JSON.parse(localStorage.getItem("orders")) || [];

const transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

let revenue = 0;

orders.forEach(order => {
revenue += Number(order.total);
});

let trays = 0;

inventory.forEach(item => {
trays += Number(item.trays);
});

let lowStock = 0;

inventory.forEach(item => {

if(item.trays <= 10){
lowStock++;
}

});

document.getElementById(
"totalRevenue"
).textContent = "₱" + revenue.toLocaleString();

document.getElementById(
"totalOrders"
).textContent = orders.length;

document.getElementById(
"totalTrays"
).textContent = trays;

document.getElementById(
"lowStock"
).textContent = lowStock;

const recentContainer =
document.getElementById(
"recentTransactions"
);

const latest =
transactions.slice(-5).reverse();

latest.forEach(item=>{

recentContainer.innerHTML += `
<div class="transaction-item">

<strong>${item.action}</strong><br>

${item.date}

</div>
`;

});

const ctx =
document.getElementById(
"salesChart"
);

new Chart(ctx,{

type:"bar",

data:{

labels:[
"Orders",
"Revenue"
],

datasets:[{

label:"Statistics",

data:[
orders.length,
revenue
]

}]

}

});

function logout(){

localStorage.removeItem(
"currentUser"
);

window.location.href =
"index.html";

}