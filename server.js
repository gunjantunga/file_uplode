const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, __dirname + "/public/pics");
    },
    filename: function (req, file, cb) {
        const arr = file.originalname.split(".");
        const ext = arr[arr.length - 1];

        cb(null, Date.now() + "." + ext);
    }
});




const upload = multer({ storage });


const app = express();

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));


const studentList = [];


app.set("view engine", "jade");
app.set("views", "views");

app.get("/", function (req, res) {
    res.render("home.jade");
});

app.get("/about", function (req, res) {
    res.render("about.jade");
});

app.get("/create-todo", function (req, res) {
    res.render("create-todo.jade");
});

app.get("/show-todos", function (req, res) {
    res.render("show-todos.jade", { allTodos });
});

app.get("/student-detail", function (req, res) {
    res.render("studentDetails.jade");
});

app.post("/student-detail", upload.single("studentImage"), function (req, res) {
    const student = req.body;
    student.pic = req.file.filename;
    studentList.push(student);

    res.render("studentDetails.jade", { sMsg: `${student.firstName} ${student.lastName} data saved successfulluy` });

});

app.get("/student-list", function (req, res) {
    res.render("student-list", { studentList });
});

const allTodos = [];
app.post("/create-todo", function (req, res) {
    console.log(req.body);
    if (req.body.todoText && req.body.todoTiming) {
        allTodos.push(req.body);
        res.render("create-todo.jade", { sMsg: "Todo create successfully" });
    } else {
        res.render("create-todo.jade", { eMsg: "Please enter todoText and todoTiming" });
    }
});

app.listen(3000, function () {
    console.log("Server started at port 3000");
});

