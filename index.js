const express = require('express');
const cors = require('cors');
const ejs = require('ejs');
const multer = require('multer');
const upload = multer({ dest : './static/'})
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/FileUploads', {useNewUrlParser: true, useUnifiedTopology: true});

//express
const app = express();
const port = 3012 ;

//templating engine ejs
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(cors())

//get schema from models
const File = require('./models/File');

app.use('/static',express.static('./static'));

app.get('/', (req, res) => {
    res.send('hello ugly people with beautiful hearts')
});



app.get('/upload', (req, res) => {
    res.render('upload')
});

app.post('/upload', upload.single('pic'), async (req, res) => {
    console.log('file >>>>>>>>>>>>>>',req.file);
    let newFile ;
    const {file} = req;
    newFile = await File.create({
        fileNameOriginal : file.originalname ,
        fileNameInDB: file.filename ,
        mimeType : file.mimetype ,
        filePath : file.path,
        fileSize : file.size ,
    })

    res.redirect('/files')
});


app.get('/files', async (req, res) => {

    const fileArray = await File.find()
    console.log('=-=-=-==-=-=-=-=-=-=-=-=-==-=--=-=-=-=--=-=-=-=-=-==-',fileArray);

    res.render('files' , {fileArray} )
});

app.get('/allfiles', async (req, res) => {
    const allfiles = await File.find();
    res.json(allfiles);
});

app.listen(port ,() => {
    console.log(`app listening at http://localhost:${port}`);
});