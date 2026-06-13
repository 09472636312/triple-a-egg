let transactions =
JSON.parse(
localStorage.getItem("transactions")
) || [];

function renderTransactions(){

const body =
document.getElementById(
"transactionBody"
);

const keyword =
document.getElementById(
"searchTransaction"
).value.toLowerCase();

const selectedDate =
document.getElementById(
"filterDate"
).value;

body.innerHTML = "";

transactions
.filter(transaction => {

const actionMatch =
transaction.action
.toLowerCase()
.includes(keyword);

let dateMatch = true;

if(selectedDate){

dateMatch =
transaction.rawDate ===
selectedDate;

}

return actionMatch &&
dateMatch;

})

.reverse()

.forEach(transaction => {

body.innerHTML += `

<tr>

<td>${transaction.date}</td>

<td>${transaction.action}</td>

<td>${transaction.user}</td>

<td>${transaction.details}</td>

</tr>

`;

});

}

// =========================
// ADD THIS FUNCTION HERE
// =========================

function addTransaction(
action,
details = ""
){

const currentUser =
JSON.parse(
localStorage.getItem(
"currentUser"
)
);

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
currentUser
? currentUser.username
: "System",

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

// =========================
// ADD THIS FUNCTION BELOW
// =========================

function exportCSV(){

let csv =
"Date,Action,User,Details\n";

transactions.forEach(t => {

csv +=
`${t.date},
${t.action},
${t.user},
${t.details}\n`;

});

const blob =
new Blob([csv],{
type:"text/csv"
});

const link =
document.createElement("a");

link.href =
URL.createObjectURL(blob);

link.download =
"transactions.csv";

link.click();

}

// Load transactions when page opens
renderTransactions();