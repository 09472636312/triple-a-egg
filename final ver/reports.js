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
// LOAD DATA
// =========================

const orders =
JSON.parse(
localStorage.getItem(
"orders"
)
) || [];

let totalRevenue = 0;

let categorySales = {};

// =========================
// PROCESS DATA
// =========================

orders.forEach(order=>{

totalRevenue +=
Number(order.total);

if(
!categorySales[
order.category
]
){

categorySales[
order.category
] = 0;

}

categorySales[
order.category
] += order.trays;

});

// =========================
// TOTAL ORDERS
// =========================

document.getElementById(
"totalOrders"
).textContent =
orders.length;

// =========================
// TOTAL REVENUE
// =========================

document.getElementById(
"totalRevenue"
).textContent =
"₱" +
totalRevenue.toLocaleString();

// =========================
// AVERAGE ORDER
// =========================

const averageOrder =

orders.length > 0

?

(
totalRevenue /
orders.length
).toFixed(2)

:

0;

document.getElementById(
"averageOrder"
).textContent =
"₱" +
Number(
averageOrder
).toLocaleString();

// =========================
// TOP CATEGORY
// =========================

let topCategory = "-";

let highest = 0;

for(
let category
in categorySales
){

if(
categorySales[
category
] > highest
){

highest =
categorySales[
category
];

topCategory =
category;

}

}

document.getElementById(
"topCategory"
).textContent =
topCategory;

// =========================
// SALES CHART
// =========================

const salesCtx =
document.getElementById(
"salesChart"
);

new Chart(
salesCtx,
{

type:"bar",

data:{

labels:[
"Orders",
"Revenue"
],

datasets:[{

label:"Business Analytics",

data:[
orders.length,
totalRevenue
]

}]

}

}
);

// =========================
// CATEGORY CHART
// =========================

const categoryCtx =
document.getElementById(
"categoryChart"
);

new Chart(
categoryCtx,
{

type:"pie",

data:{

labels:
Object.keys(
categorySales
),

datasets:[{

data:
Object.values(
categorySales
)

}]

}

}
);

// =========================
// CSV EXPORT
// =========================

function exportReportCSV(){

let csv =

"Customer,Category,Trays,Total,Status\n";

orders.forEach(order=>{

csv +=

`${order.customer},
${order.category},
${order.trays},
${order.total},
${order.status}\n`;

});

const blob =
new Blob(
[csv],
{
type:"text/csv"
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
"revenue-report.csv";

link.click();

}