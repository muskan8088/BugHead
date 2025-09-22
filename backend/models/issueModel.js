const { Schema, model, Types } = require('../connection');

const issueSchema = new Schema({
    ownerID: { type: Types.ObjectId, ref: "websites" },
    title: String,
    issueDescription: String,
    os: String,
    category: String,
    website: String,
    browser: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('issue', issueSchema);