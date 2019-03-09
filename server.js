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
};

//push the reservation into reservationsList or waitingList
const reservationsList = [];
const waitingList = [];

// app.get("/", function (req, res) {
//     res.sendFile(path.join(__dirname, "view.html"));
// });

// app.get("/add", function (req, res) {
//     res.sendFile(path.join(__dirname, "add.html"));
// });

// app.get("/api/characters", function (req, res) {
//     return res.json(characters);
// });

// app.get("/api/characters/:character", function (req, res) {
//     var chosen = req.params.character;

//     console.log(chosen);

//     for (var i = 0; i < characters.length; i++) {
//         if (chosen === characters[i].routeName) {
//             return res.json(characters[i]);
//         }
//     }

//     return res.json(false);
// });

app.post("/", function (req, res) {
    
   // console.log(req.body);
    // req.body hosts is equal to the JSON post sent from the user
    var reqbody = req.body;
 
    reservation = new Reservation(reqbody.name,reqbody.phone,reqbody.email,reqbody.uniqueID);
    if (reservationsList.length < 5) {
        reservationsList.push(reservation);
        
        var feedback="You are on the reservation list";
        reservationsList.push(feedback);
        console.log(reservationsList);
    } else {
        waitingList.push(reservation);
        var feedback="You are on the waiting list";
    }
    res.json(reservation);
    

});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});