"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const shirtSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
        trim: true
    },
    number: {
        type: Number,
        required: false,
    },
    description: {
        type: String,
        required: false
    },
    size: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    team: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'team'
    },
    league: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'league'
    }
});
exports.default = (0, mongoose_1.model)('Shirt', shirtSchema);
