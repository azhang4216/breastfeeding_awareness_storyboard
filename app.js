const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const storyboard = [
    {
        prompt: "After giving birth to a healthy baby, you have to decide on how to feed your baby. You decide to…",
        selections: [
            {
                choice: "Exclusively breastfeed/pump",
                available: ["A", "C"]
            },
            {
                choice: "Use formula",
                available: ["A", "B", "C", "D"]
            }
        ],
    }
];

let selectedMom = { // TODO: implement Vi's selection logic
    name: "Ashley",
    id: "B"
}; 

app.get("/", (_req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (_req, res) => {
    res.redirect("/choose-your-own-adventure-1");
})

app.get("/choose-your-own-adventure-:questionNumber", (req, res) => {
    const questionNumber = req.params.questionNumber;
    const currentStory = storyboard[questionNumber - 1];

    res.render("game", {
        selectedMom: selectedMom,
        prompt: currentStory.prompt,
        selections: currentStory.selections,
        questionNumber: questionNumber
    });
})

app.post("/advanceQuestion", (req, res) => {
    const questionNumber = req.body.questionNumber;
    const nextQuestion = parseInt(questionNumber) + 1;

    res.redirect("/choose-your-own-adventure-" + nextQuestion.toString());
})

app.listen(3000, () => {
    console.log("Server has started successfully.")
})