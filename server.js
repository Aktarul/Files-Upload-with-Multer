var express = require('express');
var multer = require('multer');
var app = express();
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/uploads');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "-" + file.originalname);
    }
});

var upload = multer({ storage : storage}).single('userPhoto');

app.get('/', (req, res) => {
    res.sendFile( __dirname + "/views/index.html");
});

app.post('/api/photo', upload, (req, res) => {
    upload(req, res, err =>{
        if(err) {
            res.end("Error uploading file");
        }
        res.end("File is uploaded\n\nImage informations: \n" + JSON.stringify(req.file));
    });
});

app.listen(8000, () => console.log("Visit localhost:8000"));