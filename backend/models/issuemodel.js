const { Schema, model } = require('../connection');

const issueSchema = new Schema({
    issueDescription: {String},
    Os: { type: String},
    category: { type: String},
    browser: { type: String},
    Website: {type:string},
    createdAt: { type: Date, default: Date.now }
})

module.exports = model('issue', issueSchema);