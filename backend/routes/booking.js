var express = require("express");
var router = express.Router();

const booking = require("../models/booking");

router.get("/", function(req, res) {
    booking.find(function(err, users) {
		if (err) {
		} else {
			res.json(users);
		}
	})
});

router.post("/book", (req, res) => {
    const newUser = new booking({
        hotel_id: req.body.hotel_id,
        tourist_id: req.body.tourist_id,
        check_in: req.body.check_in,
        check_out: req.body.check_out,
        no_of_room: req.body.no_of_room,
        hotel_name: req.body.hotel_name,
    });
    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/cancel", (req, res) => {
    const newUser = new booking({
        _id: req.body.id,
    });
    newUser.deleteOne({ _id: newUser._id })
    .then(function () {
        res.send("Document deleted");
    })
    .catch(function (error) {
        res.send("Error");
    });
    
});



module.exports = router;