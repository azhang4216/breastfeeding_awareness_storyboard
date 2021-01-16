const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (_req, res) => {
    res.render("selection", {dummyVariable: "bababuba"});
})

app.post("/", (req, _res) => {
    console.log(req.body.someVariable);
})

app.listen(3000, () => {
    console.log("Server has started successfully.")
})