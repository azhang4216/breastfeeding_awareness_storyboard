const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (_req, res) => {
    res.render("selection", {dummyVariable: "diff"});
})

let motherList = [
    {name:"Lorraine", budget:"140k", maritalStatus:"Married",numChildren:"1",occupation:"Coporate",education:"College",parentsLoc:"Out-of-state"},
    {name:"Riley", budget:"85k", maritalStatus:"Married",numChildren:"3",occupation:"Ph. Therapist",education:"College",parentsLoc:"Close by"},
    {name:"Ashley", budget:"30k", maritalStatus:"Single",numChildren:"1",occupation:"Receptionist",education:"High School",parentsLoc:"Out-of-state"},
    {name:"Catherine", budget:"15k", maritalStatus:"Married",numChildren:"1",occupation:"Cashier",education:"Middle School",parentsLoc:"Out-of-state"},
]
app.get("/characterPage", (_req, res) => {
    res.render("characterPage", {momList: motherList});
})

app.post("/", (req, _res) => {
    console.log(req.body.someVariable);
})

app.listen(3000, () => {
    console.log("Server has started successfully.")
})