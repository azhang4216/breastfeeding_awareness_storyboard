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
    },
    {
        prompt: "You are 3-weeks postpartum and you have to decide when you will return to work…",
        selections: [
            {
                choice: "After a paid 12-week maternity leave",
                available: ["A"]
            },
            {
                choice: "Return to work after 2 more weeks of paid leave",
                available: ["A", "C"]
            },
            {
                choice: "Go back to work immediately after a short unpaid maternity leave",
                available: ["B", "D"]
            }
        ],
    },
    {
        prompt: "Back at work, you feel your breasts getting full while on the clock, so you…",
        selections: [
            {
                choice: "Ignore it and go back to work",
                available: ["A", "B", "C", "D"]
            },
            {
                choice: "Find an isolated place to pump",
                available: ["A"]
            },
            {
                choice: "Leave work during break to feed your baby without pumping",
                available: ["A", "C"]
            }
        ],
    },
    {
        prompt: "You need someone to watch your baby when you’re at work, so you ask…",
        selections: [
            {
                choice: "Your partner",
                available: ["A", "C", "D"]
            },
            {
                choice: "A professional nanny",
                available: ["A"]
            },
            {
                choice: "Your mother",
                available: ["B"]
            },
            {
                choice: "Your eldest child",
                available: ["C"]
            }
        ],
    },
    {
        prompt: "On your trip to the grocery store, your most expensive purchase is…",
        selections: [
            {
                choice: "Formula",
                available: ["B", "D"]
            },
            {
                choice: "A nice cut of steak",
                available: ["A", "C"]
            }
        ],
    },
    {
        prompt: "At home, you come to realize that your biggest critic of your breastfeeding habits is your…",
        selections: [
            {
                choice: "Husband",
                available: ["A", "C", "D"]
            },
            {
                choice: "Mother",
                available: ["B"]
            }
        ],
    }
];

const motherList = [
    {
        id: "A", 
        name: "Lorraine", 
        budget: "140k", 
        maritalStatus: "Married",
        numChildren: "1",
        occupation: "Coporate",
        education: "College",
        parentsLoc: "Out-of-state"
    },
    {
        id: "B", 
        name: "Ashley", 
        budget: "30k", 
        maritalStatus: "Single",
        numChildren: "1",
        occupation: "Receptionist",
        education: "High School",
        parentsLoc: "Out-of-state"
    },
    {
        id: "C", 
        name: "Riley", 
        budget: "85k", 
        maritalStatus: "Married",
        numChildren: "3",
        occupation: "Ph. Therapist",
        education: "College",
        parentsLoc: "Out-of-state"
    },
    {
        id: "D", 
        name: "Catherine", 
        budget: "15k", 
        maritalStatus: "Married",
        numChildren: "1",
        occupation: "Cashier",
        education: "Middle School",
        parentsLoc: "Out-of-state"
    },
];

class Mom { // constructor for selecting moms
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
};

let selectedMom; // global selected mom

app.get("/", (_req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (_req, res) => {
    res.redirect("/character-page");
});

app.get("/character-page", (_req, res) => {
    res.render("characterPage", {momList: motherList});
});

app.post("/selectMom", (req, res) => {
    var selectedMomInfo = [];
    selectedMomInfo = req.body.selectedMom.split('-');
    selectedMom = new Mom(selectedMomInfo[0], selectedMomInfo[1])

    res.redirect("/choose-your-own-adventure-1");
});

app.get("/choose-your-own-adventure-:questionNumber", (req, res) => {
    const questionNumber = req.params.questionNumber;
    const maxQuestionNumber = storyboard.length;

    if (!questionNumber || questionNumber > maxQuestionNumber + 1 || 
        questionNumber < 1 || questionNumber === parseInt(questionNumber, 10)) { // invalid entries; go to 404 page
        res.render("error");
    } else if (!selectedMom) { // mom character has yet to be selected; unable to continue / start game
        res.redirect("/character-page");
    } else if (parseInt(questionNumber) === maxQuestionNumber + 1) { // end of the game, should move to closing page
        res.redirect("/ending");
    } else {
        const currentStory = storyboard[questionNumber - 1];
        res.render("game", { // proceed to appropriate game question
            selectedMom: selectedMom,
            prompt: currentStory.prompt,
            selections: currentStory.selections,
            questionNumber: questionNumber
        });
    }
});

app.post("/advance-question", (req, res) => {
    const questionNumber = req.body.questionNumber;
    const nextQuestion = parseInt(questionNumber) + 1;

    res.redirect("/choose-your-own-adventure-" + nextQuestion.toString());
});

app.post("/back-question", (req, res) => {
    const questionNumber = req.body.questionNumber;
    const prevQuestion = parseInt(questionNumber) - 1;

    if (prevQuestion === 0) {
        res.redirect("/character-page");
    } else {
        res.redirect("/choose-your-own-adventure-" + prevQuestion.toString());
    }
});

app.post("/play-again", (_req, res) => {
    res.redirect("/character-page");
});

app.get("/ending", (req, res) => {
    res.sendFile(__dirname + "/end.html");
})

app.get('*', (_req, res) => {
    res.render("error");
});

app.listen(3000, () => {
    console.log("Server has started successfully.");
});