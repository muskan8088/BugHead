const { Schema, model, Types } = require('../connection');

const websiteSchema = new Schema({
    name: { type: String, required: true },
    owner: { type: Types.ObjectId, ref: "Users", required: true },
    repository: { type: String, required: true },
    website: { type: String, required: true },  // ✅ ADD THIS
    github: { type: String, required: true },
    githubOwner: { type: String, required: true },
    githubRepo: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('websites', websiteSchema);
