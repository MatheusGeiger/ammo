const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    price: { type: Number, required: true },
    percentageDiscount: { type: Number, required: true },
    category: { type: String, required: true },
    photos: { type: Array, required: true },
    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false }
});

module.exports = mongoose.model('Product', productSchema);