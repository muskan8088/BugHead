const { Schema, model, Types } = require('../connection');

const websiteSchema = new Schema({
    name: String,
    owner: { type: Types.ObjectId, ref: "Users", required: true },
    repository: { type: String, required: true },
    website: { type: String },
    createdAt: { type: Date, default: Date.now }
})

module.exports = model('websites', websiteSchema);