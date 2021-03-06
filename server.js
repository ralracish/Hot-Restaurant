var express = require('express');
var path = require('path');

var app = express();
var PORT = 3005;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//take data and make reservation with this constructor
const Reservation = function (name, email, phone, uniqueID) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.uniqueID = uniqueID;
    this.reservationID = new Date().getTime();
    this.status = () => {
        if (reservationsList.length < 5) {
            this.feedback = "reserved";
            this.position = (reservationsList.length) + 1;
        } else {
            this.feedback = "waiting";
            this.position = (waitingList.length) + 1;
        };
    };
    this.status();
};

//push the reservation into reservationsList or waitingList
const reservationsList = [];
const waitingList = [];

reservationsList.push({ "name": "Desmond", "email": "dm@bootcamp.com", "phone": "919-260-8858", "uniqueID": "5200", "feedback": "reservation", "position": 1 })
reservationsList.push({ "name": "Marcia", "email": "mm@bootcamp.com", "phone": "919-555-5555", "uniqueID": "5300", "feedback": "reservation", "position": 2 })
waitingList.push({ "name": "Tim", "email": "dm@bootcamp.com", "phone": "919-260-8858", "uniqueID": "5200", "feedback": "waiting", "position": 1 })
waitingList.push({ "name": "Carlar", "email": "mm@bootcamp.com", "phone": "919-555-5555", "uniqueID": "5300", "feedback": "waiting", "position": 2 })

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/reservations", function (req, res) {
    return res.json(reservationsList);
});

app.get("/api/waiting", function (req, res) {
    return res.json(waitingList);
});

app.post("/", function (req, res) {
    var reqbody = req.body;
    reservation = new Reservation(reqbody.name, reqbody.email, reqbody.phone, reqbody.uniqueID);
    if (reservationsList.length < 5) {
        reservationsList.push(reservation);
        console.log(reservationsList);
    } else {
        waitingList.push(reservation);
        console.log(waitingList);
    }
    res.json(reservation);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});