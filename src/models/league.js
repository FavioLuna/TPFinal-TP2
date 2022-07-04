"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leagueSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: false,
        trim: true
    },

});
exports.default = (0, mongoose_1.model)('League', leagueSchema);
