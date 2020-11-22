const { constants } = require('crypto');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
    fileNameOriginal : String ,
    fileNameInDB: String ,
    mimeType : String ,
    filePath : String ,
    fileSize : Number ,
})

const model = mongoose.model('File' ,fileSchema);
module.exports = model ;

