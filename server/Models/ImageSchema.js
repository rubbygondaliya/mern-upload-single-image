const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    name :{
        type : String,
        required : true,
        default:'none'
    },
    imageName :{
        type : String,
        required : true,
        default:'none'
    },
    imageData : {
        type:String,
        require:true
    }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;