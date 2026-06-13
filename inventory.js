let inventory =
JSON.parse(
localStorage.getItem("inventory")
) || [];

function saveInventory(){

const category =
document.getElementById("category").value;

const trays =
parseInt(
document.getElementById("trays").value
);

const price =
parseFloat(
document.getElementById("pricePerTray").value
);

if(
!category ||
!trays ||
!price
){

alert(
"Please complete all fields."
);

return;
}

const existing =
inventory.find(
item =>
item.category === category
);

if(existing){

existing.trays += trays;
existing.pricePerTray = price;

}else{

inventory.push({

id: Date.now(),

category: category,

trays: trays,

pricePerTray: price,

updatedAt:
new Date().toLocaleDateString()

});

}

localStorage.setItem(
"inventory",
JSON.stringify(inventory)
);

addTransaction(
"Inventory Updated"
);

document.getElementById("trays").value="";
document.getElementById("pricePerTray").value="";

renderInventory();
}

function renderInventory(){

const body =
document.getElementById(
"inventoryBody"
);

const search =
document.getElementById(
"searchInventory"
).value.toLowerCase();

body.innerHTML = "";

inventory
.filter(item =>
item.category
.toLowerCase()
.includes(search)
)
.forEach(item=>{

body.innerHTML += `

<tr>

<td>${item.category}</td>

<td>${item.trays}</td>

<td>₱${item.pricePerTray}</td>

<td>

${
item.trays <= 10

?

'<span class="low-stock">Low Stock</span>'

:

'Available'

}

</td>

<td>

<button
class="action-btn edit-btn"
onclick="editInventory(${item.id})">

Edit

</button>

<button
class="action-btn delete-btn"
onclick="deleteInventory(${item.id})">

Delete

</button>

</td>

</tr>

`;

});

}

function editInventory(id){

const item =
inventory.find(
i => i.id === id
);

const newTrays =
prompt(
"New Tray Quantity",
item.trays
);

const newPrice =
prompt(
"New Price Per Tray",
item.pricePerTray
);

if(newTrays !== null){

item.trays =
parseInt(newTrays);

}

if(newPrice !== null){

item.pricePerTray =
parseFloat(newPrice);

}

localStorage.setItem(
"inventory",
JSON.stringify(inventory)
);

addTransaction(
"Inventory Edited"
);

renderInventory();

}

function deleteInventory(id){

if(
confirm(
"Delete this inventory?"
)
){

inventory =
inventory.filter(
item =>
item.id !== id
);

localStorage.setItem(
"inventory",
JSON.stringify(inventory)
);

addTransaction(
"Inventory Deleted"
);

renderInventory();

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

renderInventory();