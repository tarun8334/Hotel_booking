const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
    },
    room_count: {
        type: String,
    },
    detail: {
        type: String,
    },
    location: {
        lat: {
            type: String,
        },
        long: {
            type: String,
        },
    }
});

module.exports = hotel = mongoose.model("hotel", UserSchema);
