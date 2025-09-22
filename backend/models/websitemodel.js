const { Schema, model, Types } = require('../connection');

const websiteSchema = new Schema({
    name: String,
    owner: { type: Types.ObjectId, ref: "Users", required: true },
    repository: { type: String, required: true },
    github: { type: String, required: true },
    githubOwner: { type: String, required: true }, // Add this
    githubRepo: { type: String, required: true }, // Add this
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('websites', websiteSchema);