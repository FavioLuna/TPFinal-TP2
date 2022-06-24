"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leagueSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
        trim: true
    },
    teams: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'team'
        }]
});
exports.default = (0, mongoose_1.model)('Team', leagueSchema);
