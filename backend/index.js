require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose = require('mongoose');
const passport = require('passport')
const { errors } = require('celebrate');
const indexRouter = require('./routes/indexRouter');
const multipart = require('connect-multiparty');
const MultipartMiddleWare = multipart({uploadDir:'./storage/posts'});

const { PORT = 3000 } = process.env;
const app = express();

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 400,
// });

mongoose.connect('mongodb://localhost:27017/moodboostdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});



// app.use(limiter);
app.use('/storage/posts', express.static('storage/posts'))
app.use('/storage/posts/june2021', express.static('storage/posts/June2021'))
app.use('/storage/posts/July2021', express.static('storage/posts/July2021'))
app.use('/storage/posts/May2021', express.static('storage/posts/May2021'))

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/upload',MultipartMiddleWare,(req,res) => {
  let tempFile = req.files.upload;
    let path = tempFile.path;
    res.status(200).json({
        uploaded: true,
        url: `http://localhost:3000/${path}`
    })
})


app.use(indexRouter);



app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен');
});