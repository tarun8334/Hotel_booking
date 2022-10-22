var express = require("express");
var router = express.Router();

const hotel = require("../models/hotel");

router.get("/", function (req, res) {
	hotel.find(function (err, users) {
		if (err) {
		} else {
			res.json(users);
		}
	})
});

router.post("/hotelname", (req, res) => {
	const _id = req.body.id;
	hotel.findOne({ _id }).then(user => {
		res.send(user);
	})
});

router.post("/updateroom", (req, res) => {
	const id = req.body.id;
	const rooms = req.body.rooms;
	hotel.findOneAndUpdate({ _id: id },
		{ room_count: rooms }, null, function (err, docs) {
			if (err) {
				res.send(err);
			}
			else {
				res.send(docs);
			}
		});
});


module.exports = router;