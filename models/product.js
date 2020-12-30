var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    name: String,
    cellno: String,
    address: String,
    city: String,
    
    
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;