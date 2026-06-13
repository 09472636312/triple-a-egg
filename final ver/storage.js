if(!localStorage.getItem("users")){

const users = [

{
username:"admin",
password:"admin123",
role:"admin"
},
{
username:"staff",
password:"staff123",
role:"staff"
}
];

localStorage.setItem(
"users",
JSON.stringify(users)
);

}