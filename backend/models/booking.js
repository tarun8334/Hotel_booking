const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    hotel_id: {
        type: String,
    },
    hotel_name:{
        type: String,
    },
    tourist_id: {
        type: String,
    },
    check_in: {
        type: String,
    },
    check_out: {
        type: String,
    },
    no_of_room: {
        type: String,
    }
});

module.exports = booking = mongoose.model("booking", UserSchema);
