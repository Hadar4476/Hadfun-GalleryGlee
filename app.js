const auth = require('./routes/auth');
const users = require('./routes/users');
const arts = require('./routes/arts');
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const path = require('path');

mongoose
    .connect(
        process.env.MONGODB_URI ||
        'mongodb+srv://hadrame:hadar123456@hadfun-galleryglee.iszom.mongodb.net/gallery-glee?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }
    )
    .then(() => {
        console.log('Connected to mongodb database: gallery-glee, successfully.');
    })
    .catch((error) => console.log(error));

app.use(express.json());
app.use(cors());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/arts', arts);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 3005;

http.listen(PORT, () => {
    console.log(`NodeJS server started at port ${PORT}.`);
});

// https://hadfun-galleryglee.herokuapp.com/api
// http://localhost:3005/api

// git remote add origin https://github.com/Hadar4476/Hadfun-GalleryGlee.git