const express = require ("express");
const app = express();

app.use(express.json());

const cors = require("cors");
const corsOption = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOption));

const { initialisedatabase } = require("./db/db.connect");
const CommentData = require ("./models/comment.model");

initialisedatabase();

async function createCommentData(newData) {
    try {
        const comment = new CommentData(newData);
        const saveComment = await comment.save();
        return saveComment;
    } catch (error) {
        throw error;
    }
};

app.get("/", (req, res) => {
    res.send("Welcome to comment express server");
});

//for sending new data to DB ----------------------------------
app.post("/comment", async(req, res) => {
    try {
        const newData = createCommentData(req.body);
        res.status(201).json({message: "Data added successfully", data: newData})
    } catch (error) {
        res.status(500).json({error: "Failed to add data into database"})
    }
});

//for fetching all data from DB --------------------------------
async function getAllComment(){
    try {
        const allComments = await CommentData.find();
        return allComments;
    } catch (error) {
        throw error;
    }
};

app.get("/comment", async(req, res) => {
    try {
        const allData = await getAllComment();
        if(allData.length != 0){
            res.json(allData);
        } else {
            res.status(404).json({message: "No comments found"});
        }
    } catch (error) {
        res.status(500).json({error: "Failed to get data"});
    }
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});