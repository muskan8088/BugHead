const { Schema, model, Types } = require('../connection');

const issueSchema = new Schema({
    issueDescription: String,
    os: String,
    category: String,
    website: { type: Types.ObjectId, ref: Types.ObjectId },
    browser: String,
    createdAt: { type: Date, default: Date.now }
})

module.exports = model('issue', issueSchema);