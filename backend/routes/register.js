var express = require("express");
var router = express.Router();

const User = require("../models/tourist");

router.post("/", (req, res) => {
    const email = req.body.email;
    const newUser = new User({
        name: req.body.name,
        email: req.body.email
    });

    User.findOne({ email }).then(user => {
        if (user) {
            res.send("Email already exists");
        }
        else {
            newUser.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
    });
});

router.post("/login", (req, res) => {
	const email = req.body.email;
	User.findOne({ email }).then(user => {
		if (!user) {
			return res.status(400).json({
				error: "Email not found",
			});
        }
        else{
            res.send(user);
        }
	});
});

module.exports = router;